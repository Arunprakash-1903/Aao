"use client";

import React, { useState } from "react";

type FormData = {
  salutation: string;
  firstName: string;
  surName: string;
  profileDesignation: string;
  institutionName: string;
  registrationNumber: string;
  institutionDetails: string;
  email: string;
  contactNumber: string;
  promotions: string;
  intro: string;
  profilePicture: File | null;
  profileDocument: File | null;
};

const ProfilePage = () => {
  const [formData, setFormData] = useState<FormData>({
    salutation: "",
    firstName: "",
    surName: "",
    profileDesignation: "",
    institutionName: "",
    registrationNumber: "",
    institutionDetails: "",
    email: "",
    contactNumber: "",
    promotions: "",
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
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Add form submission logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-8"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Profile</h2>

        {/* Salutation */}
        <div className="">
          <label htmlFor="salutation" className="block text-sm font-medium text-gray-600">
            Salutation or Title
          </label>
          <select
            id="salutation"
            name="salutation"
            value={formData.salutation}
            onChange={handleInputChange}
            className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="Mr">Mr</option>
            <option value="Ms">Ms</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* First Name */}
        <div className="">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Sur Name */}
        <div>
          <label htmlFor="surName" className="block text-sm font-medium text-gray-600">
            Sur Name
          </label>
          <input
            type="text"
            id="surName"
            name="surName"
            value={formData.surName}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Profile Designation */}
        <div>
          <label
            htmlFor="profileDesignation"
            className="block text-sm font-medium text-gray-600"
          >
            Your Profile Designation
          </label>
          <select
            id="profileDesignation"
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

        {/* Institution Name */}
        <div>
          <label
            htmlFor="institutionName"
            className="block text-sm font-medium text-gray-600"
          >
            Institution Name (For Students)
          </label>
          <input
            type="text"
            id="institutionName"
            name="institutionName"
            value={formData.institutionName}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Registration Number */}
        <div>
          <label
            htmlFor="registrationNumber"
            className="block text-sm font-medium text-gray-600"
          >
            Registration Number (For Architects)
          </label>
          <input
            type="text"
            id="registrationNumber"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Institution Details */}
        <div>
          <label
            htmlFor="institutionDetails"
            className="block text-sm font-medium text-gray-600"
          >
            Institution Details (For Institutions)
          </label>
          <textarea
            id="institutionDetails"
            name="institutionDetails"
            value={formData.institutionDetails}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email Address
          </label>
          <input
            type="email"
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
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Promotions */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Can we contact you for promotions or updates?
          </label>
          <div className="mt-2 space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="promotions"
                value="Yes"
                onChange={handleInputChange}
                className="mr-2 focus:ring-blue-500"
                checked={formData.promotions === "Yes"}
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="promotions"
                value="No"
                onChange={handleInputChange}
                className="mr-2 focus:ring-blue-500"
                checked={formData.promotions === "No"}
              />
              No
            </label>
          </div>
        </div>

        {/* Intro */}
        <div>
          <label htmlFor="intro" className="block font-medium text-gray-700">
            Tell us an intro about yourself
          </label>
          <textarea
            id="intro"
            name="intro"
            value={formData.intro}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Profile Picture */}
        <div>
          <label htmlFor="profilePicture" className="block font-medium text-gray-700">
            Upload your profile picture (optional)
          </label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full"
          />
        </div>

        {/* Profile Document */}
        <div>
          <label htmlFor="profileDocument" className="block font-medium text-gray-700">
            Upload your profile  (optional)
          </label>
          <input
            type="file"
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
