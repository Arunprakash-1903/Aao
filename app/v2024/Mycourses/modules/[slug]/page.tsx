"use client"

import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {

  const { slug }: { slug: string } = useParams();
  const [currentVideo, setCurrentVideo] = useState("");
  const [courseDataV, setCourseDataV] = useState<any>()



  const { data: session} = useSession();


   useEffect(() => {
    async function fetchUserWithCourses(email: string) {
      try {
        
        const response = await fetch("/api/purchased", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
    
       
    
        const data = await response.json();
      //  console.log('User with Purchased Courses:', data);
      const modules=data.purchasedCourses[0].course.modules;
      setCourseDataV(modules)
      
        return data;
      }  catch (err) {
       console.log(err);
       
      } finally {
     
      }
    }
    
  
     
       // const data: Course = await getCourseBySlug(id);

        fetchUserWithCourses(session?.user?.email);
   
     
    }, [session]);





let i=[];
courseDataV?.forEach((mod:any)=>{
if(mod.title==slug)
    i.push(mod)
})


  return (
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
  {  !(courseDataV?.subscribed==1)?
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
            
            {  i[0]?.attachments?.map((v: any) => (
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
                  {/* <button
                    onClick={() => markAsCompleted(v.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg ${
                      v.completed
                        ? "bg-green-500 text-white cursor-not-allowed"
                        : "bg-gray-500 text-white hover:bg-gray-600"
                    }`}
                    disabled={v.completed}
                  >
                    {v.completed ? "Completed" : "Mark as Completed"}
                  </button> */}
                </td>
              </tr>
            ))} 
          </tbody>
        </table>
:<div> you should subcribe to access this content</div>}
      </div>
    </div>
  </div>
 
  )
}

export default Page