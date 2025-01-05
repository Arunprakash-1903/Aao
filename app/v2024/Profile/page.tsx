"use client";

import React, { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type FormData = {

  firstName: string;

  profileDesignation: string;

  email: string;
  contactNumber: string;

  intro: string;
  profilePicture: File | null;
  profileDocument: File | null;
};

const ProfilePage = () => {
  const fileInput1 = useRef<HTMLInputElement>(null);
  const fileInput2 = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<FormData>({
   
    firstName: "",
 
    profileDesignation: "",
   
    
    email: "",
    contactNumber: "",

    intro: "",
    profilePicture: null,
    profileDocument: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      console.log(files);
 
    }
  };

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append("profilePicture", fileInput1.current.files[0]!);
    form.append("profileDocument", fileInput2.current.files[0]!);
    form.append("email",formData.email)
    form.append("contactNumber",formData.contactNumber)
    form.append("firstName",formData.firstName)
    form.append("intro",formData.intro)
    form.append("profileDesignation",formData.profileDesignation)
   /// form.append("")

    // Add form submission logic here
    const response =  await fetch("/api/upload", {
      method: "POST",
      body:form,
    });
   const data=await response.json();
   if(data.status=="fail"){
toast.error(data.error)
   }else{
    toast.success(data.status)
   }
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 py-10 px-4">
      <Toaster/>
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-8"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Profile</h2>

        {/* Salutation */}

        <div>
          <label
            htmlFor="profileDesignation"
            className="block text-sm font-medium text-gray-600"
          >
            Your Profile Designation
          </label>
          <select
            id="profileDesignation"
            required
            name="profileDesignation"
            value={formData.profileDesignation}
            onChange={handleInputChange}
            className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="Student">Student</option>
            <option value="Architect">Architect</option>
            <option value="Institution">Institution</option>
            <option value="Faculty">Faculty</option>
            <option value="Architectural Firm">Architectural Firm</option>
            <option value="Architectural affiliate service provider">
              Architectural affiliate service provider
            </option>
            <option value="Others">Others</option>
          </select>
        </div>
        {/* First Name */}
        <div className="">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
             Name
          </label>
          <input
          
            type="text"
            id="firstName"
            required
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Sur Name */}
      

        {/* Profile Designation */}
   

      

        {/* Email Address */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email Address
          </label>
          <input
            type="email"
            required
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Contact Number */}
        <div>
          <label
            htmlFor="contactNumber"
            className="block text-sm font-medium text-gray-600"
          >
            Contact Number
          </label>
          <input
            type="text"
            required
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Promotions */}
        

        {/* Intro */}
        <div>
          <label htmlFor="intro" className="block font-medium text-gray-700">
            Tell us an intro about yourself
          </label>
          <textarea
            id="intro"
            required
            name="intro"
            value={formData.intro}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Profile Picture */}
        <div>
          <label htmlFor="profilePicture" className="block font-medium text-gray-700">
            Upload your profile picture
          </label>
          <input
            type="file"
            id="profilePicture"
            
            ref={fileInput1}
            name="profilePicture"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full"
          />
        </div>

        {/* Profile Document */}
        <div>
          <label htmlFor="profileDocument" className="block font-medium text-gray-700">
            Upload your profile  
          </label>
          <input
            type="file"
           
            ref={fileInput2}
            id="profileDocument"
            name="profileDocument"
            accept="application/pdf"
            onChange={handleFileChange}
            className="mt-1 block w-full"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
