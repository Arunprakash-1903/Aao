'use client';

import { useState } from 'react';
import RichTextEditor from '../../components/RichTextEditor';

export default function NewWorkshopPage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState({});
  const [body, setBody] = useState({});
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data:{title:string,slug:string,description:any,body:any,image:string} = {
      title,
      slug,
      description,
      body,
      image,
    };

    try {
      const res = await fetch('/api/workshop/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
console.log(data);

      if (!res.ok) throw new Error('Failed to create workshop');

      alert('Workshop created successfully!');
    } catch (error) {
      console.error(error);
      alert('Error creating workshop');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create New Workshop</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <RichTextEditor
            value={description}
            onChange={(content) => setDescription(content)} // Save as JSON
          />
        </div>

        {/* Body */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Body</label>
          <RichTextEditor
            value={body}
            onChange={(content) => setBody(content)} // Save as JSON
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/image.png"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
          >
            Create Workshop
          </button>
        </div>
      </form>
    </div>
  );
}