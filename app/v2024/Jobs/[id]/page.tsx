import React from "react";
import { getJobById } from "../../../../sanity/sanity.query";
import { PortableText } from "next-sanity";
import ApplyButton from "app/components/ApplyButton";

//import prisma from "prisma/prisma";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@lib/auth";

const JobCard =async ({
  params,
}: {
  params: Promise<{id: number }>
}) => {
 //const session=await getServerSession(authOptions)
  // const existingUser = await prisma.user.findUnique({ where: { email:session.user.email} });

  // console.log(existingUser.profileDocument);
  function calculateDaysAgo(dateString: string): number {
        const date=dateString.replace("T"," ")
      //  console.log("-------"+date);
        
        const givenDate = new Date(date);
        const today = new Date();
    //  console.log(givenDate)
        // Check for valid date
        if (isNaN(givenDate.getTime())) {
          throw new Error("Invalid date string");
        }
      
        // Calculate the difference in milliseconds
        const differenceInMs = today.getTime() - givenDate.getTime();
      
        // Convert the difference from milliseconds to days
        const daysAgo = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
      
        return daysAgo;
      }
  const iD=(await params)?.id as number
  const response=await fetch(`${process.env.NEXTAUTH_URL}/api/jobs/get?id=${iD}`,{cache:"no-store"})
  const jobs=await response.json()
  const i=parseInt(iD+"")
  const res= await fetch(`${process.env.NEXTAUTH_URL}/api/jobs/applicants`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
       
        jobid:iD as number
    }),
  });
  const data=await getJobById(i)
  const l=await res.json();
  const applicants=l.job.apilicants.length;
  
  
  //sendEmail("arunprakash1141@gmail.com","file1.pdf","app\\(uploads)\\arunprakash2225@gmail.com\\Week3_Slides.pdf")
  return (
    <div className="flex flex-row space-x-4 p-3">
    {/* Left Section: Job Listings */}
    <div className="w-2/3">
      <div className="border rounded-lg p-6 bg-white shadow-md flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {jobs.jobTitle}
            </h3>
          </div>
        </div>
  
        {/* Details */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <div>🕒</div>
            <span>{jobs.Experience} years</span>
          </div>
          <div className="flex items-center gap-1">
            <div>💰</div>
            <span>{jobs.salary}</span>
          </div>
          <div className="flex items-center gap-1">
            <div>📍</div>
            <span>{jobs.location}</span>
          </div>
        </div>
  
        {/* Footer */}
        <div className="flex justify-between items-center border-t pt-4 text-sm text-gray-500">
          <div>
            <p>
              Posted:{" "}
              <span className="font-medium text-gray-900">
                {calculateDaysAgo(jobs.createdAt)} days ago
              </span>
            </p>
          </div>
          <div>
            <p>
              Applicants:{" "}
              <span className="font-medium text-gray-900">{applicants}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <ApplyButton jobId={iD} />
          </div>
        </div>
      </div>
  
      {/* Job Description */}
      <div className="border-t pt-4 border rounded-lg p-8 bg-white shadow-md">
        <h4 className="text-md font-semibold text-gray-800 mb-2">
          Job Description
        </h4>
        <div className="text-sm text-gray-600">
          <PortableText value={data[0].jobd} />
        </div>
      </div>
  
      {/* About Company */}
      <div className="border-t pt-4 border rounded-lg p-8 bg-white shadow-md">
        <h4 className="text-md font-semibold text-gray-800 mb-2">About Wipro</h4>
        <div className="text-sm text-gray-600">
          <PortableText value={data[0].about} />
        </div>
      </div>
    </div>
  
    {/* Right Section: Empty Space */}
    <div className="w-1/3 bg-gray-100 rounded-lg shadow-md p-6">
      {/* Placeholder content */}
      <div className="text-center text-gray-400">
     
      </div>
    </div>
  </div>
  
    
  );
};

export default JobCard;
