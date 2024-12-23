"use client"
import { PortableText } from 'next-sanity'
import { useSession } from 'next-auth/react';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getCourseBySlug } from '../../../../sanity/sanity.query';
import Link from 'next/link';
import Dropdown from 'app/components/dropdown';


type Course = {
  id:string,
  title: string;
  description: any;
  price: string;
  image: string;
};

const CourseDescription =  ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
 //const [session,setSession]=useState<any>()
 console.log(params);
 
  const { data: session} = useSession();
  const [course, setCourse] = useState<Course>();
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); 
  const { slug } :{slug:string}= useParams();
  useEffect(() => {
    // Fetch courses using the `getNataCourses` function
   
    const fetchCourses = async () => {
      try {
        //const session=await getServerSession(authOptions)
        //setSession(session)
        const ccourse:Course= await getCourseBySlug(slug)
        setCourse(ccourse); // Set courses data
        //console.log(ccourse);
      }  catch (err) {
        setError(err.message || 'Failed to fetch courses'); // Set error message
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchCourses();
  }, []);


  const handleBuyNow = async () => {
    if(session){
     
        
    }

    try {
      const c:Course=await getCourseBySlug(slug)
      console.log(c.id);
      
      const response = await fetch('/api/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // userId:3,
          // courseId: 1,
          email:session.user?.email,
          id:c.id
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to purchase course.');
      }

      alert('Course purchased successfully!');
    } catch (error: any) {
      console.log(error.message);
    } 
  };

  console.log(course?.price);
  if (loading) return <div>Loading courses...</div>;
  if (error) return <div>Error: {error}</div>;
  return (

    <>


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
        {/* <div className=" flex space-x-28  text-xs text-gray-600 font-bold w-[100%]">
          <div>1</div>
          <div>2</div>
          <div className="ml-3">SignIn</div>
        </div> */}
        <div className="flex flex-col  space-y-3">
          <div className="300 w-[400px]">
        
       {/* {!session?<Link href="/Login" className="flex justify-end items-center text-xs"><div >SignIn</div></Link>:<div className="flex justify-end items-center text-xs"><div className=" text-gray-400 font-normal cursor-pointer" onClick={handleOut}>{session.user?.email}</div></div>} */}
       <div className="flex justify-end items-center text-xs"> 

       {!session?<Link href="/Login" className="flex justify-end items-center text-xs"><div >SignIn</div></Link>: <Dropdown  text={session.user?.email}/>}
        </div>

        </div>
      <div className="flex space-x-4 items-center text-xs text-black font-bold ">
      <a href="/v2024/NataCourse" className="">NATA course</a>
        <a href="/v2024/Courses" className="">Courses</a>
        <a href="/v2024/workshop" className="">WorkShops</a>
        <a href="/v2024/Jobs" className="">Jobs</a>
        <a href="/v2024/fdp" className="">FDP</a>

        
        <a href="/v2024/Jobs" className="">Surveys</a>
      
      
        {/* <div className="text-gray-600">icons.bdc@gmail.com</div> */}
        </div>
        </div>
      
    </div>
  </header>
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Course Image */}
        <div className="w-full">
          <img
            src={course?.image}
            alt={course?.title}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Course Details */}
        <div className="p-6 space-y-6">
          {/* Title and Price */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <h1 className="text-3xl font-bold text-gray-800">{course?.title}</h1>
            <div className="flex justify-between items-center space-x-6">
            <p className="text-2xl font-bold text-indigo-600 sm:mt-0 mt-4">
            ₹ {course?.price}  
            </p>
            <button onClick={handleBuyNow} className="w-full sm:w-auto py-3 px-6 bg-indigo-600 text-white text-lg font-semibold rounded-md shadow-md hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Buy Now
            </button>
            </div>
          </div>

          {/* Description */}
          <div className="text-gray-700 text-lg leading-relaxed">
             <PortableText value={course?.description}/> 
          </div>

          {/* Buy Now Button */}
          <div>
       
          </div>
        </div>
      </div>
    </div>
    </>
   
  );
};

export default CourseDescription;
