"use client";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const CreateCourseForm = () => {
  const [title, setTitle] = useState("");
  const [attachments, setAttachments] = useState([{ title: "", url: "" ,completed:false}]);

  const handleAttachmentChange = (index: number, field: string, value: string) => {
    const updatedAttachments = [...attachments];
    updatedAttachments[index][field] = value;
    setAttachments(updatedAttachments);
  };

  const addAttachment = () => {
    setAttachments([...attachments, { title: "", url: "",completed:false }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || attachments.some((att) => !att.title || !att.url)) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("/api/Course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, attachments }),
      });

      if (!response.ok) {
        throw new Error("Failed to create course");
      }

      toast.success("Course created successfully!");
      setTitle("");
      setAttachments([{ title: "", url: "",completed:false }]);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to create course. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Toaster />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create a New Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Course Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter course title"
            />
          </div>

          <h3 className="text-lg font-bold mb-2">Attachments</h3>
          {attachments.map((attachment, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                value={attachment.title}
                onChange={(e) => handleAttachmentChange(index, "title", e.target.value)}
                className="w-full p-3 mb-2 border border-gray-300 rounded-md focus:outline-none"
                placeholder="Attachment Title"
              />
              <input
                type="url"
                value={attachment.url}
                onChange={(e) => handleAttachmentChange(index, "url", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
                placeholder="Attachment URL"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addAttachment}
            className="w-full bg-gray-500 text-white p-3 rounded-md mb-4 hover:bg-gray-600 focus:outline-none focus:ring-2"
          >
            Add Another Attachment
          </button>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourseForm;
