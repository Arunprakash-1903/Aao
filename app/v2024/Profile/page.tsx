"use client";

import React, { useEffect, useState, useRef } from "react";
import { Pencil } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";


const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const {data:session}=useSession()

  // 🔥 Fetch user data
  useEffect(() => {
    
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/purchased", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email:session.user.email }), // Replace with dynamic email
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [session]);

  // 🔥 Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];

      if (name === "profilePicture") {
        setProfileFile(file);
        setUser((prev: any) => ({ ...prev, previewUrl: URL.createObjectURL(file) }));
      } else if (name === "profileDocument") {
        setDocumentFile(file);
      }
    }
  };

  // 🔥 Handle Input Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser((prev: any) => ({ ...prev, [name]: value }));
  };

  // 🔥 Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;
  
    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("firstName", user.name || "");
    formData.append("contactNumber", user.contactNumber || "");
    formData.append("profileDesignation", user.profileDesignation || "");
  
    if (profileFile) formData.append("profilePicture", profileFile);
    if (documentFile) formData.append("profileDocument", documentFile);
  
    try {
      const response = await fetch("/api/updateProfile", {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
      if (response.ok) {
        toast.success("Profile updated successfully!");
        
        // 🔥 Ensure profile picture is updated correctly
        setUser((prev: any) => ({
          ...prev,
          profilePicture: result.profilePicture, // Ensure backend returns updated filename
        }));
  
        setIsEditing(false);
      } else {
        toast.error(result.error || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <Toaster />
      {user ? (
        <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg text-center relative">
          {/* 🔥 Edit Button */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
            onClick={() => setIsEditing(true)}
          >
            <Pencil size={24} />
          </button>

          {/* 🔥 Profile Picture */}
          <label className="relative block mx-auto w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200 hover:border-blue-500 transition cursor-pointer">
          <img
  src={
    profileFile
      ? URL.createObjectURL(profileFile) // Show preview if new image is selected
      : user?.profilePicture
      ? `/uploads/${user.email}/${user.profilePicture}` // Use stored image if available
      : "/default-avatar.png" // Fallback
  }
  alt="Profile"
  className="w-full h-full object-cover"
/>
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                name="profilePicture"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            )}
          </label>

          {/* 🔥 Profile Document */}
          {user.profileDocument ? (
            <p className="mt-2 text-sm text-gray-600">
              <strong>Resume/CV:</strong>{" "}
              <a href={`./app/uploads/${user.email}/${user.profileDocument}`} download={`${user.profileDocument}`} className="text-blue-600 font-medium hover:underline">Download</a>
            </p>
          ) : (
            <p className="mt-2 text-sm text-gray-500">No document uploaded</p>
          )}

          {/* 🔥 User Info / Edit Form */}
          {!isEditing ? (
            <>
              <h2 className="text-2xl font-semibold mt-4 text-gray-800">{user.name || "N/A"}</h2>
              <p className="text-gray-500">{user.profileDesignation || "No designation"}</p>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">{user.contactNumber || "No contact"}</p>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <input
                type="text"
                name="name"
                value={user.name || ""}
                onChange={handleInputChange}
                placeholder="Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              />

              {/* 🔥 Dropdown for Designation */}
              <select
                name="profileDesignation"
                value={user.profileDesignation || ""}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring focus:ring-blue-200"
              >
                <option value="" disabled>Select Designation</option>
                <option value="Student">Student</option>
                <option value="Faculty">Faculty</option>
                <option value="Architect">Architect</option>
                <option value="Institution">Institution</option>
                <option value="Architectural Firm">Architectural Firm</option>
              </select>

              <input
                type="text"
                name="contactNumber"
                value={user.contactNumber || ""}
                onChange={handleInputChange}
                placeholder="Contact Number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              />

              {/* 🔥 File Upload for Profile Document */}
              <label className="block w-full p-3 text-center text-blue-600 border border-blue-300 rounded-lg cursor-pointer hover:bg-blue-50 transition">
                Upload Document
                <input
                  type="file"
                  accept=".pdf"
                  ref={docInputRef}
                  name="profileDocument"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="py-2 px-5 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Save
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <p className="text-gray-600">Loading profile...</p>
      )}
    </div>
  );
};

export default ProfilePage;
