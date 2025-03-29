"use client";

import { useState, useEffect } from "react";
import { PencilIcon, DownloadIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";


export default function ProfileUploadForm() {
  const [userData, setUserData] = useState<any>(null);
  const {data:session}=useSession()

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    contactNumber: "",
    profileDesignation: "",
  });

  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profileDocument, setProfileDocument] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  // 🔥 Fetch user data
  useEffect(() => {
    
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/purchased", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email:session?.user?.email }), // Replace with dynamic email
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [session]);

console.log(userData);

  useEffect(() => {
    setFormData({
      email: session?.user.email,
      name: userData?.name,
      contactNumber: userData?.contactNumber,
      profileDesignation: userData?.profileDesignation,
    });
    setPreviewImage(userData?.profilePicture);
  }, [userData,session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (e.target.name === "profilePicture") {
        setProfilePicture(file);
        setPreviewImage(URL.createObjectURL(file));
      } else {
        setProfileDocument(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (profilePicture) data.append("profilePicture", profilePicture);
    if (profileDocument) data.append("profileDocument", profileDocument);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      if (result.status === "success") {
        setUserData({
          email: result.email,
          name: result.name,
          contactNumber: result.contactNumber,
          profileDesignation: result.profileDesignation,
          profilePicture: result.profilePicture || userData.profilePicture,
          profileDocument: result.profileDocument || userData.profileDocument,
        });
        setMessage("✅ Profile updated successfully!");
        setEditMode(false);
      } else {
        setMessage(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      setMessage("❌ Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-8 mb-[500px]">
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200 ">
      {!editMode ? (
        <><div className="flex-col justify-between items-center w-[500px]">
          <div className="flex justify-between items-center mb-4 ">
            <h2 className="text-2xl font-semibold text-gray-800">Profile Details</h2>
            <button onClick={() => setEditMode(true)}>
              <PencilIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
            </button>
          </div>

         {userData&&( <div className="flex items-center gap-4">
            <img src={userData.profilePicture} alt="Profile" className="h-20 w-20 rounded-full border border-gray-300" />
            <div>
              <p className="text-lg font-semibold">{userData.name}</p>
              <p className="text-gray-600">{userData.contactNumber}</p>
              <p className="text-gray-600">{userData.profileDesignation}</p>
            </div>
          </div>)
      }
          {userData?.profileDocument && (
            <div className="mt-4">
              <a
                href={userData.profileDocument}
               
                className="flex items-center text-blue-500 hover:underline"
              >
                <DownloadIcon className="h-5 w-5 mr-1" />
                Download Profile Document
              </a>
            </div>
          )}
           </div>
        </>
       
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Update Profile</h2>

          {message && (
            <p className={`mb-4 p-3 text-center text-white rounded ${message.includes("✅") ? "bg-green-500" : "bg-red-500"}`}>
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Name"
                className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
                onChange={handleChange}
              />
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                placeholder="Contact Number"
                className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
                onChange={handleChange}
              />
            </div>

            <input
              type="text"
              name="profileDesignation"
              value={formData.profileDesignation}
              placeholder="Profile Designation"
              className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
              onChange={handleChange}
            />

            <div className="space-y-2">
              <label className="block font-medium text-gray-700">Profile Picture</label>
              <input
                type="file"
                name="profilePicture"
                accept="image/*"
                className="w-full p-3 border rounded cursor-pointer hover:bg-gray-50 transition"
                onChange={handleFileChange}
              />
              {previewImage && <img src={previewImage} alt="Preview" className="mt-2 h-24 w-24 object-cover rounded-lg border border-gray-300" />}
            </div>

            <div className="space-y-2">
              <label className="block font-medium text-gray-700">Profile Document</label>
              <input
                type="file"
                name="profileDocument"
                className="w-full p-3 border rounded cursor-pointer hover:bg-gray-50 transition"
                onChange={handleFileChange}
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition flex justify-center items-center"
              >
                {loading ? "Uploading..." : "Update Profile"}
              </button>

              <button
                type="button"
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded hover:bg-gray-400 transition"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </>
      )}
    </div>
    </div>
  );
}
