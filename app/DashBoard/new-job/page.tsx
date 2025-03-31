'use client';

import { useState } from 'react';
import RichTextEditor from '../../components/RichTextEditor';

export default function NewJobPage() {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState({});
  const [salary, setSalary] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [company, setCompany] = useState('');
  const [companyAbout, setCompanyAbout] = useState({});
  const [email, setEmail] = useState('');
  const [jobType, setJobType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data :{jobTitle:string,jobDescription:any,salary:string,location:string,experience:string,company:string,companyAbout:any,email:string,jobType:string}= {
      jobTitle,
      jobDescription,
      salary,
      location,
      experience,
      company,
      companyAbout,
      email,
      jobType,
    };

    try {
      const res = await fetch('/api/jobs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to create job listing');

      alert('Job listing created successfully!');
    } catch (error) {
      console.error(error);
      alert('Error creating job listing');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create New Job Listing</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Title</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Job Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Description</label>
          <RichTextEditor value={jobDescription} onChange={setJobDescription} />
        </div>

        {/* Salary */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Salary</label>
          <input
            type="text"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Experience (Years)</label>
          <input
            type="text"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Company</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* About Company */}
        <div>
          <label className="block text-sm font-medium text-gray-700">About Company</label>
          <RichTextEditor value={companyAbout} onChange={setCompanyAbout} />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Type</label>
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Job Type</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
          >
            Create Job Listing
          </button>
        </div>
      </form>
    </div>
  );
}
