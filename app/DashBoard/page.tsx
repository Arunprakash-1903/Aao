"use client"

import { getNataCourses } from "../../sanity/sanity.query";
import { useEffect, useState } from 'react';




export default function TableDemo() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(null); // State to handle errors
    useEffect(() => {
        // Fetch courses using the `getNataCourses` function
        const fetchCourses = async () => {
          try {
            const data = await getNataCourses();
            setCourses(data); // Set courses data
          } catch (err) {
            setError(err.message || 'Failed to fetch courses'); // Set error message
          } finally {
            setLoading(false); // Stop loading spinner
          }
        };
    
        fetchCourses();
      }, []);
      {   console.log(courses)}
  if (loading) return <div>Loading courses...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Courses</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
              >
                Course
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
              >
                Revenue
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          
            {
         
            
         courses.map((course) => (
                   
                <tr key={course._id}  onClick={()=>{window.location.href=`/DashBoard/${course._id}`}} className="cursor-pointer hover:bg-gray-50">
              
                  <td className="px-6 py-4 text-sm text-gray-900">{course._id}</td>
               
                  
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {course.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{course.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                   -
                  </td>
                </tr>
            
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
