"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCourseBySlug } from "../../../../sanity/sanity.query";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

type Attachment = {
  id: number;
  title: string;
  url: string;
  completed: boolean;
  courseId: number;
};

type CourseDB = {
  id: number;
  title: string;
  description: string | null;
  createdAt: string; // ISO string format for dates
  attachments: Attachment[];
};

type Course = {
  id: string;
  title: string;
  description: any;
  price: string;
  image: string;
};

export default function CoursePage() {
  const [currentVideo, setCurrentVideo] = useState("");
  const [courseDataV, setCourseDataV] = useState<CourseDB>();
  const { id }: { id: string } = useParams();
  const [course, setCourse] = useState<Course>();
  const { width, height } = useWindowSize();
  const [confettiVisible, setConfettiVisible] = useState(false);

  useEffect(() => {
    const getCourseData = async (id: string) => {
      try {
        const response = await fetch("/api/Course/attachment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courseId: parseInt(id) }), // Pass the courseId in the request body
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch course data");
        }

        const courseData = await response.json();
        console.log("Course with attachments:", courseData);
        setCourseDataV(courseData);

        return courseData; // Return the fetched data if needed
      } catch (error) {
        console.error("Error fetching course:", error.message);
        throw error; // Re-throw the error if you need to handle it in the caller
      }
    };

    const fetchData = async () => {
      const data: Course = await getCourseBySlug(id);
      setCourse(data);
      getCourseData(data.id);
    };

    fetchData();
  }, []);

  const markAsCompleted = async (attachmentId: number) => {
    try {
      const response = await fetch(`/api/Course/attachment/${attachmentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Update the state to reflect completion
        setCourseDataV((prev) => {
          if (!prev) return prev;
          const updatedAttachments = prev.attachments.map((attachment) =>
            attachment.id === attachmentId
              ? { ...attachment, completed: true }
              : attachment
          );
          return { ...prev, attachments: updatedAttachments };
        });

        setConfettiVisible(true); // Show confetti
        setTimeout(() => setConfettiVisible(false), 3000); // Hide after 3 seconds
      } else {
        console.error("Failed to mark attachment as completed");
      }
    } catch (error) {
      console.error("Error marking attachment as completed:", error);
    }
  };

  return (
    <>
      {confettiVisible && <Confetti width={width} height={height} />}
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto">
          {/* Video Player */}
          <div className="mb-6">
            <video
              key={currentVideo} // Re-render video on URL change
              controls
              className="w-full rounded-lg shadow-lg"
              src={currentVideo === "" ? null : currentVideo}
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Chapters Table */}
          <div className="bg-white shadow rounded-lg">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="text-left p-4 border border-gray-300">
                    Chapter
                  </th>
                  <th className="text-left p-4 border border-gray-300">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {courseDataV?.attachments.map((v: Attachment) => (
                  <tr
                    key={v.id}
                    className="hover:bg-gray-100 transition duration-200"
                  >
                    <td className="p-4 border border-gray-300">{v.title}</td>
                    <td className="p-4 border border-gray-300 flex gap-4">
                      <button
                        onClick={() => setCurrentVideo(v.url)}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                      >
                        Play
                      </button>
                      <button
                        onClick={() => markAsCompleted(v.id)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg ${
                          v.completed
                            ? "bg-green-500 text-white cursor-not-allowed"
                            : "bg-gray-500 text-white hover:bg-gray-600"
                        }`}
                        disabled={v.completed}
                      >
                        {v.completed ? "Completed" : "Mark as Completed"}
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
