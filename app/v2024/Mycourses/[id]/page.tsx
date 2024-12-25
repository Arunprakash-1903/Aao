"use client";
import { useSession } from 'next-auth/react';
import { useState } from "react";
import Link from 'next/link';
import Dropdown from 'app/components/dropdown';
const chapters = [
  { id: 1, title: "Introduction", videoUrl: "https://education.architecture-academics.online/wp-content/uploads/2024/12/course1/ImanGadzhiRaw.mp4" },
  { id: 2, title: "Getting Started", videoUrl: "https://education.architecture-academics.online/wp-content/uploads/2024/12/2-Jump-cuts-.mp4" },
  { id: 3, title: "Advanced Concepts", videoUrl: "https://example.com/video3.mp4" },
];

export default function CoursePage() {
  const [currentVideo, setCurrentVideo] = useState(chapters[0].videoUrl);
  const { data: session} = useSession();
  return (<>
    <header className="bg-white shadow top-0 sticky z-10">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <Link href="/v2024">
        <div className="flex items-center justify-center space-x-4">
          <img
            src="/logo.jpeg" // Replace with your logo image
            alt="Barry Wehmiller"
            className="w-10 h-10 object-contain"
          />
          <div className="text-xl font-bold">Aao</div>
       </div>
      </Link>

      <div className="flex flex-col space-y-3">
        <div className="300 w-[400px]">
          <div className="flex justify-end items-center text-xs">
          {!session?<Link href="/Login" className="flex justify-end items-center text-xs"><div >SignIn</div></Link>: <Dropdown  text={session.user?.email}/>}

          </div>
        </div>
        <div className="flex space-x-4 items-center text-xs text-black font-bold">
          <a href="/v2024/NataCourse" className="">
            NATA course
          </a>
          <a href="/v2024/Courses" className="">
            Courses
          </a>
          <a href="/v2024/workshop" className="">
            WorkShops
          </a>
          <a href="/v2024/Jobs" className="">
            Jobs
          </a>
          <a href="/v2024/fdp" className="">
            FDP
          </a>
          <a href="/v2024/Jobs" className="">
            Surveys
          </a>
        </div>
      </div>
    </div>
  </header>
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
