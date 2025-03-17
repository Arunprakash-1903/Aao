'use client'
import JobCard from "../components/JobCard";
import React, { useEffect, useState } from 'react';

const Refund = () => {
  const [recentJobs, setRecentJobs] = useState<any>([]);

  useEffect(() => {
    // Fetch recent jobs
    const fetchRecentJobs = async () => {
      try {
        const res = await fetch('/api/jobs/get/recent');
        if (!res.ok) throw new Error('Failed to fetch recent jobs');

        const data = await res.json();
        setRecentJobs(data);
      } catch (error) {
        console.error('Error fetching recent jobs:', error);
      }
    };

    fetchRecentJobs();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Refund Policy Section */}
        <div className="bg-white col-span-2 w-full h-full p-12 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800">Return Policy</h1>
          <p className="text-sm text-gray-600 mt-2">Last updated: March 05, 2025</p>

          <h2 className="text-xl font-semibold text-gray-700 mt-8">Refunds</h2>
          <p className="text-gray-600 mt-2">All sales are final and no refund will be issued.</p>

          <h2 className="text-xl font-semibold text-gray-700 mt-8">Questions</h2>
          <p className="text-gray-600 mt-2">
            If you have any questions concerning our return policy, please contact us at:
          </p>
          <p className="mt-2">
            <a href="mailto:admin@architecture-academics.online" className="text-blue-600 font-medium hover:underline">
              admin@architecture-academics.online
            </a>
          </p>
        </div>

        {/* Recent Jobs Section */}
        <div className="bg-white col-span-1 w-full h-full p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Jobs</h2>
          <div className="space-y-4">
            {recentJobs.map((job: any, index: number) => (
              <JobCard key={index} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Refund;
