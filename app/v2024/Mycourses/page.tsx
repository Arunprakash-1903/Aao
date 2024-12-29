"use client"
import { useSession } from 'next-auth/react';

import React, { useEffect, useState } from 'react'
import { getCourseBySlug } from '../../../sanity/sanity.query';

//import course from 'schemaTypes/course';

const Page = () => {

  const [courses,setCourse]=useState<any>()
  const [loading, setLoading] = useState(true); // State to handle loading
// State to handle loading
  const [error, setError] = useState(null); 
  const [cdata, setCdata] = useState<any[]>([]);
  const { data: session} = useSession();
  useEffect(() => {
    
    async function fetchUserWithCourses(email: string) {
      try {
        const response = await fetch('/api/purchased', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Something went wrong');
        }
    
        const data = await response.json();
        console.log('User with Purchased Courses:', data);
        setCourse(data)
        return data;
      }  catch (err) {
        setError(err.message || 'Failed to fetch courses'); // Set error message
      } finally {
        setLoading(false);// Stop loading spinner
      }
    }
    if(session)
     fetchUserWithCourses(session?.user?.email)
   
  }, [])
  
  useEffect(() => {
    
    const fetchData = async () => {
      const pc = courses?.purchasedCourses;
      if (!pc) return;

      const fetchedData = [];
      for (const c of pc) {
        const slug = c?.course?.title;
        if (slug) {
          const data = await getCourseBySlug(slug);
          fetchedData.push(data);
        }
      }
      setCdata(fetchedData);
      console.log(fetchedData);
      
    };

    fetchData();
 
  }, [courses]);
 
  
  if (loading) return <div>Loading courses...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
   <>
          {/* Header */}
        
          {/* Main Content */}
          <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Page Header */}
              <div className="p-6  text-black text-center">
                <h1 className="text-3xl font-bold">My Courses</h1>
              </div>
    
              {/* Course List */}
              <div className="p-6 space-y-6">
                {cdata? (
                  cdata.map((course:any) => (
                    <div
                      key={course?.id}
                      className="border border-gray-200 rounded-lg shadow-sm overflow-hidden bg-white"
                    >
                      {/* Course Image */}
                      <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                        <img
                          src={course.image || '/default-course.png'}
                          alt={course?.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
    
                      {/* Course Details */}
                      <div className="p-4">
                        <div className='flex items-center justify-between space-x-6'>
                        <h2 className="text-xl font-bold text-gray-800">{course?.title}</h2>
                        <button onClick={()=>{
                      window.location.href=`/v2024/Mycourses/${course.slug}`
                        }} className="w-full sm:w-auto py-3 px-6 bg-indigo-600 text-white text-lg font-semibold rounded-md shadow-md hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Learn
            </button>
            </div>
                        {/* <p className="text-gray-600 mt-2">{course?.description}</p> */}
                        {/* <PortableText value={course?.description}/> */}
                        <div className="mt-4">
                          {/* <p className="text-gray-500 text-sm">
                            Purchased on: {course?.purchasedAt}
                          </p> */}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 text-lg">
                    You have not purchased any courses yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
  )
}

export default Page

// import React from 'react';
// import Link from 'next/link';


// const MyCourses =async () => {
//   // const purchasedCourses = [
//   //   {
//   //     id: 1,
//   //     title: 'React for Beginners',
//   //     description: 'Learn the basics of React and build dynamic web applications.',
//   //     image: '/react-course.jpg',
//   //     purchasedAt: '2024-12-21',
//   //   },
//   //   {
//   //     id: 2,
//   //     title: 'Advanced Tailwind CSS',
//   //     description: 'Master Tailwind CSS and create stunning UI designs.',
//   //     image: '/tailwind-course.jpg',
//   //     purchasedAt: '2024-12-20',
//   //   },
//   // ];
//     async function fetchUserWithCourses(email: string) {
//     try {
//       const response = await fetch('/api/purchased', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

  
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Something went wrong');
//       }
  
//       const data = await response.json();
//       console.log(data);
      
//       console.log('User with Purchased Courses:', data);
//       return data;
//     } catch (error) {
//       console.error('Error fetching user with courses:', error);
//     }
//   }
//   let purchasedCourses = [];
 
//     fetchUserWithCourses('magnumforms_ec@mepcoeng.ac.in');
  
//   const session = {
//     user: {
//       email: 'user@example.com',
//     },
//   };
//   return (
//     <>
//       {/* Header */}
//       <header className="bg-white shadow top-0 sticky z-10">
//         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <Link href="/v2024">
//             <div className="flex items-center justify-center space-x-4">
//               <img
//                 src="/logo.jpeg" // Replace with your logo image
//                 alt="Barry Wehmiller"
//                 className="w-10 h-10 object-contain"
//               />
//               <div className="text-xl font-bold">Aao</div>
//             </div>
//           </Link>

//           <div className="flex flex-col space-y-3">
//             <div className="300 w-[400px]">
//               <div className="flex justify-end items-center text-xs">
//                 {!session ? (
//                   <Link href="/Login" className="flex justify-end items-center text-xs">
//                     <div>SignIn</div>
//                   </Link>
//                 ) : (
//                   <div className="flex justify-end items-center text-xs">
//                     <div className="text-gray-400 font-normal cursor-pointer">
//                       {session.user?.email}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="flex space-x-4 items-center text-xs text-black font-bold">
//               <a href="/v2024/NataCourse" className="">
//                 NATA course
//               </a>
//               <a href="/v2024/Courses" className="">
//                 Courses
//               </a>
//               <a href="/v2024/workshop" className="">
//                 WorkShops
//               </a>
//               <a href="/v2024/Jobs" className="">
//                 Jobs
//               </a>
//               <a href="/v2024/fdp" className="">
//                 FDP
//               </a>
//               <a href="/v2024/Jobs" className="">
//                 Surveys
//               </a>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="p-6 bg-gray-100 min-h-screen">
//         <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
//           {/* Page Header */}
//           <div className="p-6  text-black text-center">
//             <h1 className="text-3xl font-bold">My Courses</h1>
//           </div>

//           {/* Course List */}
//           <div className="p-6 space-y-6">
//             {purchasedCourses?.length > 0 ? (
//               purchasedCourses.map((course) => (
//                 <div
//                   key={course.id}
//                   className="border border-gray-200 rounded-lg shadow-sm overflow-hidden bg-white"
//                 >
//                   {/* Course Image */}
//                   <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
//                     <img
//                       src={course.image || '/default-course.png'}
//                       alt={course.title}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>

//                   {/* Course Details */}
//                   <div className="p-4">
//                     <h2 className="text-xl font-bold text-gray-800">{course.title}</h2>
//                     <p className="text-gray-600 mt-2">{course.description}</p>
//                     <div className="mt-4">
//                       <p className="text-gray-500 text-sm">
//                         Purchased on: {course.purchasedAt}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center text-gray-500 text-lg">
//                 You have not purchased any courses yet.
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MyCourses;
