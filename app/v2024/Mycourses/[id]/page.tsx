"use client";

import { useState } from "react";

const chapters = [
  { id: 1, title: "Introduction", videoUrl: "https://education.architecture-academics.online/wp-content/uploads/2024/12/course1/ImanGadzhiRaw.mp4" },
  { id: 2, title: "Getting Started", videoUrl: "https://education.architecture-academics.online/wp-content/uploads/2024/12/2-Jump-cuts-.mp4" },
  { id: 3, title: "Advanced Concepts", videoUrl: "https://example.com/video3.mp4" },
];

export default function CoursePage() {
  const [currentVideo, setCurrentVideo] = useState(chapters[0].videoUrl);

  return (<>
   
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Video Player */}
        <div className="mb-6">
          <video
            key={currentVideo} // Re-render video on URL change
            controls
            className="w-full rounded-lg shadow-lg"
            src={currentVideo}
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Chapters Table */}
        <div className="bg-white shadow rounded-lg">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left p-4 border border-gray-300">Chapter</th>
                <th className="text-left p-4 border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {chapters.map((chapter) => (
                <tr
                  key={chapter.id}
                  className="hover:bg-gray-100 transition duration-200"
                >
                  <td className="p-4 border border-gray-300">{chapter.title}</td>
                  <td className="p-4 border border-gray-300">
                    <button
                      onClick={() => setCurrentVideo(chapter.videoUrl)}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                      Play
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
}
