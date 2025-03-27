'use client';

import { getNataCourses } from "../../sanity/sanity.query";
import { useEffect, useState } from 'react';

export default function TableDemo() {
  const [courses, setCourses] = useState([]);
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [fdps, setfdps] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch courses and workshops
    const fetchData = async () => {
      try {
        const coursesData = await getNataCourses();
        const workshopsData = await (await fetch("/api/workshop/get")).json();
        const fdpsData = await (await fetch("/api/fdp/get")).json();
        const jobsData = await (await fetch("/api/jobs/get/all")).json();
        //console.log(jobsData);
        
        setJobs(jobsData);
        setCourses(coursesData);
        setWorkshops(workshopsData.data);
        setfdps(fdpsData.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this workshop?')) {
      try {
        const res = await fetch(`/api/workshop/delete/${id}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          setWorkshops(prev => prev.filter(workshop => workshop.id !== id));
          alert('Workshop deleted successfully!');
        } else {
          const data = await res.json();
          alert(data.error || 'Failed to delete workshop');
        }
      } catch (error) {
        console.error('Failed to delete workshop:', error);
        alert('Failed to delete workshop');
      }
    }
  };
  const handleDeleteFdp = async (id: number) => {
    if (confirm('Are you sure you want to delete this workshop?')) {
      try {
        const res = await fetch(`/api/fdp/delete/${id}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          setWorkshops(prev => prev.filter(workshop => workshop.id !== id));
          alert('Workshop deleted successfully!');
        } else {
          const data = await res.json();
          alert(data.error || 'Failed to delete workshop');
        }
      } catch (error) {
        console.error('Failed to delete workshop:', error);
        alert('Failed to delete workshop');
      }
    }
  };
  const handleDeleteJob = async (id: number) => {
    if (confirm('Are you sure you want to delete this workshop?')) {
      try {
        const res = await fetch(`/api/jobs/delete/${id}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          setWorkshops(prev => prev.filter(workshop => workshop.id !== id));
          alert('Workshop deleted successfully!');
        } else {
          const data = await res.json();
          alert(data.error || 'Failed to delete workshop');
        }
      } catch (error) {
        console.error('Failed to delete workshop:', error);
        alert('Failed to delete workshop');
      }
    }
  };


  if (loading) return <div>Loading data...</div>;
  if (error) return <div>Error: {error}</div>;
console.log(jobs);

  return (
    <div className="space-y-8">
      {/* Courses Table */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Courses</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Revenue</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course) => (
                <tr 
                  key={course._id} 
                  onClick={() => window.location.href = `/DashBoard/${course._id}`}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-sm text-gray-900">{course._id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{course.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{course.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">-</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Workshops Table */}
      <div>
        <div className="flex justify-between items-center my-4">
          <h2 className="text-2xl font-bold">Workshops</h2>
          <button 
            onClick={() => window.location.href = '/DashBoard/new-workshop'} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200 ease-in-out"
          >
            + New Workshop
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {workshops.map((workshop) => (
                <tr 
                  key={workshop.id} 
                  onClick={() => window.location.href = `/DashBoard/Workshop/${workshop.id}`}
                  className="cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-sm text-gray-900 border-b">{workshop.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 border-b">{workshop.slug}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 border-b">
                    {workshop.image ? (
                      <img 
                        src={workshop.image} 
                        alt={workshop.title} 
                        className="h-12 w-12 object-cover rounded-lg shadow"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>
                  {/* Actions */}
                  <td className="px-6 py-4 text-sm text-gray-500 border-b space-x-2">
                    {/* Edit Button */}
                 
                    {/* Delete Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(workshop.id);
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center my-4">
          <h2 className="text-2xl font-bold">Faculty Development programs</h2>
          <button 
            onClick={() => window.location.href = '/DashBoard/new-fdp'} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200 ease-in-out"
          >
            + New FDP
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fdps.map((workshop) => (
                <tr 
                  key={workshop.id} 
                  onClick={() => window.location.href = `/DashBoard/Workshop/${workshop.id}`}
                  className="cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-sm text-gray-900 border-b">{workshop.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 border-b">{workshop.slug}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 border-b">
                    {workshop.image ? (
                      <img 
                        src={workshop.image} 
                        alt={workshop.title} 
                        className="h-12 w-12 object-cover rounded-lg shadow"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>
                  {/* Actions */}
                  <td className="px-6 py-4 text-sm text-gray-500 border-b space-x-2">
                    {/* Edit Button */}
                 
                    {/* Delete Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFdp(workshop.id);
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center my-4">
          <h2 className="text-2xl font-bold">Jobs</h2>
          <button 
            onClick={() => window.location.href = '/DashBoard/new-job'} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200 ease-in-out"
          >
            + New JOb
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((workshop) => (
                <tr 
                  key={workshop.id} 
                  onClick={() => window.location.href = `/DashBoard/Workshop/${workshop.id}`}
                  className="cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-sm text-gray-900 border-b">{workshop.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 border-b">{workshop.jobTitle}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 border-b">{workshop.company}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 border-b">{workshop.location}</td>
                  {/* <td className="px-6 py-4 text-sm text-gray-500 border-b">
                    {workshop.image ? (
                      <img 
                        src={workshop.image} 
                        alt={workshop.title} 
                        className="h-12 w-12 object-cover rounded-lg shadow"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td> */}
                  {/* Actions */}
                  <td className="px-6 py-4 text-sm text-gray-500 border-b space-x-2">
                    {/* Edit Button */}
                 
                    {/* Delete Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteJob(workshop.id);
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
