
// import React from "react";
// import JobCard from "../../components/JobCard";
// import Link from "next/link";


// const JobListings = async() => {
  
// const response=await fetch(`${process.env.NEXTAUTH_URL}/api/jobs/get/all`,{cache:"no-store"})
// const jobs=await response.json()

// //   const jobs = [
// //     {
// //       jobTitle: "Technical Support Engineer",
// //       company: "Movate Technologies",
     
// //       experience: "0 Yrs",
// //       salary: "Not disclosed",
// //       location: "Chennai",
// //       description:
// //         "HIRING FOR FRESHERS: Great opportunity for freshers to kickstart their career...",
     
// //       daysAgo: "5",
// //     },
// //     // Add more job objects here
// //   ];

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//     <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//       {/* Left column for job listings */}
//       <div className="col-span-1">
//         <div className="grid grid-cols-1  gap-6">
//           {jobs.map((job: any, index: number) => (
//             <Link key={index} href={`/v2024/Jobs/${job.id}`}>
//               <JobCard key={index} job={job} />
//             </Link>
//           ))}
//         </div>
//       </div>
  
//       {/* Right column (empty) */}
//       <div className="col-span-1 bg-gray-100 rounded-lg shadow-md p-6">
//         {/* <p className="text-gray-500 text-center">No content here yet</p> */}
//       </div>
//     </div>
//   </div>
  
  
//   );
// };

// export default JobListings;
import { authOptions } from "@lib/auth";


import { getServerSession } from "next-auth";
import {  getMainPageContent, getNataCourses } from "../../../sanity/sanity.query";
import { PortableText } from "next-sanity";
import prisma from "prisma/prisma";
import Link from "next/link";
import JobCard from "app/components/JobCard";


//import { getNataCourses } from "sanity/sanity.query";

export default async function  Home() {
  
  const session=await getServerSession(authOptions)
const response=await fetch(`${process.env.NEXTAUTH_URL}/api/jobs/get/all`,{cache:"no-store"})
const jobs=await response.json()
      const user=await prisma.user.findUnique({where: { email:session?.user?.email ||"" },});
console.log("----------------> "+user);

  //const  courses=await getNataCourses()
  const mainContent=await getMainPageContent("Jobs")
  
  
  async function fetchUserWithCourses(email: string) {
    try {
      const response = await fetch(`${process.env.NEXTAUTH_URL}/api/purchased`, {
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
    //  console.log('User with Purchased Courses:', data);
     
      return data;
    }  catch (err) {
     console.log(err);
     
    } finally {
   
    }
  }
  
//   const data=await fetchUserWithCourses(session?.user?.email)
//   const pc=data?.purchasedCourses
//   console.log("pc-->",pc);
//   console.log("courses-->",courses)
//   const list=[]
//   if(data){
// pc.forEach((c:any)=>{
// list.push(c.course.id)
// })


//   }
//   console.log(list);

//   const check=(list:number[],id:string)=>{
//     let flag=false
// list.forEach((l)=>{
//   if(l==parseInt(id)){
//     flag=true
//   }
// })
//     return flag
//   }
  
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
    
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="md:col-span-2">
          {/* Welcome Section */}
          <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold mb-4">Jobs</h1>

    
  </div>
          <div className="bg-white rounded-lg shadow p-6">
            
          <div className="p-2">
            <iframe width="800" height="400"
src={mainContent[0].video}>
</iframe>
</div>
<div className="p-4 m-3">
 
  <h3 className="ext-2xl font-bold mb-4">About</h3>



 


  <PortableText value={mainContent[0].description}/>
</div>
<div className="flex flex-col space-y-2 p-5">





















            </div>
       
          </div>
          <br />
          <h4 className="text-2xl font-semibold mb-4">Job Listings</h4>
          <br />
          <div className="grid grid-cols-1  gap-6">         
  
  {jobs.map((job: any, index: number) => (
          <Link key={index} href={`/v2024/Jobs/${job.id}`}>
            <JobCard key={index} job={job} />
          </Link>
        
        ))}
      </div>
        </div>

        {/* Sidebar Section */}
       <div>
          {/* Welcome Card */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-semibold mb-2">Welcome</h3>
            <p className="text-gray-600">
              Thank you for your interest in sharing your gifts and talents with us. We look forward
              to learning more about you.
            </p>
          </div>

          {/* About Us Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">About Us</h3>
            <img
              src="/logo.jpeg" // Replace with your logo image
              alt="Barry Wehmiller"
              className="w-16 h-16 mb-4"
            />
            <p className="text-gray-600">
              Throughout Barry-Wehmiller, we hold ourselves to a unique measure of success: by the
              way we touch the lives of people.
            </p>
            <a href="#" className="text-blue-500 font-medium mt-2 inline-block">Read More &rarr;</a>
          </div>
          
        </div> 
      </main>
    </div>
  );
}