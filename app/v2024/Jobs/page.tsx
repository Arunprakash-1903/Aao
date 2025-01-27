
import React from "react";
import JobCard from "../../components/JobCard";
import Link from "next/link";


const JobListings = async() => {
  
const response=await fetch(`${process.env.NEXTAUTH_URL}/api/jobs/get/all`,{cache:"no-store"})
const jobs=await response.json()

//   const jobs = [
//     {
//       jobTitle: "Technical Support Engineer",
//       company: "Movate Technologies",
     
//       experience: "0 Yrs",
//       salary: "Not disclosed",
//       location: "Chennai",
//       description:
//         "HIRING FOR FRESHERS: Great opportunity for freshers to kickstart their career...",
     
//       daysAgo: "5",
//     },
//     // Add more job objects here
//   ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
    <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left column for job listings */}
      <div className="col-span-1">
        <div className="grid grid-cols-1  gap-6">
          {jobs.map((job: any, index: number) => (
            <Link key={index} href={`/v2024/Jobs/${job.id}`}>
              <JobCard key={index} job={job} />
            </Link>
          ))}
        </div>
      </div>
  
      {/* Right column (empty) */}
      <div className="col-span-1 bg-gray-100 rounded-lg shadow-md p-6">
        {/* <p className="text-gray-500 text-center">No content here yet</p> */}
      </div>
    </div>
  </div>
  
  
  );
};

export default JobListings;
