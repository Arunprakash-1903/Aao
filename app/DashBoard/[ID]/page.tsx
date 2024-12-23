'use client'

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UploadForm({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { ID } = useParams();
console.log(params);

  const [file, setFile] = useState<File | null>(null);
  const [id, setId] = useState('');
  const [uploadedVideos, setUploadedVideos] = useState<string[]>([]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !id) {
      toast.error('Please fill in all required fields!');
      return;
    }

    try {
      const data = new FormData();
      data.set('file', file);
      data.set('id', id);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      if (!res.ok) throw new Error(await res.text());

      const responseData = await res.json(); // Assuming the response contains the uploaded video URL.
      setUploadedVideos((prev) => [...prev, responseData.videoUrl]);
      setFile(null);
      toast.success('Video uploaded successfully!');
    } catch (e: any) {
      toast.error('Failed to upload the video. Please try again.');
      console.error(e);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Upload Course Video</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="id" className="block text-sm font-medium text-gray-700">
            Course ID
          </label>
          <input
            type="text"
            id="id"
            name="id"
            value={ID}
            onChange={(e) => setId(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter course ID"
            required
          />
        </div>
        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">
            Upload Video
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:text-sm file:font-medium file:bg-gray-100 file:hover:bg-gray-200"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Upload
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Uploaded Videos</h3>
        {uploadedVideos.length > 0 ? (
          <ul className="space-y-2">
            {uploadedVideos.map((video, index) => (
              <li key={index} className="flex items-center space-x-4">
                <video
                  controls
                  className="w-32 h-20 rounded shadow-md"
                  src={video}
                 // alt={`Uploaded video ${index + 1}`}
                ></video>
                <p className="text-sm text-gray-600">{`Video ${index + 1}`}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No videos uploaded yet.</p>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
