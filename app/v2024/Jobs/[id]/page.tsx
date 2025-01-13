import React from "react";

const JobCard = () => {
  return (
    <div className="flex flex-col space-y-4 p-3">
    <div className="border rounded-lg p-6 bg-white shadow-md flex flex-col gap-4 ">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Service Desk Analyst
          </h3>
    
        </div>
      
      </div>

      {/* Details */}
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 7.25C6 4.903 7.903 3 10.25 3h3.5C16.097 3 18 4.903 18 7.25v9.5c0 2.347-1.903 4.25-4.25 4.25h-3.5C7.903 21 6 19.097 6 16.75v-9.5zM10.25 4.5h3.5a2.75 2.75 0 0 1 2.75 2.75v9.5a2.75 2.75 0 0 1-2.75 2.75h-3.5A2.75 2.75 0 0 1 7.5 16.75v-9.5A2.75 2.75 0 0 1 10.25 4.5z"
              clipRule="evenodd"
            />
          </svg>
          <span>0 years</span>
        </div>
        <div className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M11.997 3.75a8.247 8.247 0 1 0 8.25 8.247A8.257 8.257 0 0 0 11.997 3.75zm0 15A6.747 6.747 0 1 1 18.744 12 6.755 6.755 0 0 1 11.997 18.75z"
              clipRule="evenodd"
            />
          </svg>
          <span>Not Disclosed</span>
        </div>
        <div className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.75 8A4.25 4.25 0 0 1 8 3.75h8A4.25 4.25 0 0 1 20.25 8v8a4.25 4.25 0 0 1-4.25 4.25H8A4.25 4.25 0 0 1 3.75 16V8zm4.25 1.25a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2H8z"
              clipRule="evenodd"
            />
          </svg>
          <span>Chennai</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center border-t pt-4 text-sm text-gray-500">
        <div>
          <p>Posted: <span className="font-medium text-gray-900">5 days ago</span></p>
         
        </div>
        <div className="flex gap-2">
       
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Apply
          </button>
        </div>
</div>




     

    </div>
    <div className="border-t pt-4 border rounded-lg p-8 bg-white shadow-md ">
    <h4 className="text-md font-semibold text-gray-800 mb-2">Job Description</h4>
    <p className="text-sm text-gray-600">
      The Service Desk Analyst will be responsible for handling customer inquiries
      and providing technical support for a wide range of issues. Key
      responsibilities include troubleshooting, documentation, and escalation as
      needed. This role is ideal for freshers looking to kickstart their career in
      IT support.
    </p>
  </div>

  {/*About company */}
  <div className="border-t pt-4 border rounded-lg p-8 bg-white shadow-md ">
    <h4 className="text-md font-semibold text-gray-800 mb-2">About wipro</h4>
    <p className="text-sm text-gray-600">
      The Service Desk Analyst will be responsible for handling customer inquiries
      and providing technical support for a wide range of issues. Key
      responsibilities include troubleshooting, documentation, and escalation as
      needed. This role is ideal for freshers looking to kickstart their career in
      IT support.
    </p>
  </div>
  </div>
    
  );
};

export default JobCard;
