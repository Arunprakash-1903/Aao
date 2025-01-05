import Link from "next/link";

export default  function CourseCard({title,image,slug,btn}) {
    return (
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <img
          className="w-full h-48 object-cover rounded-t-lg"
          src={image}
          alt="Course Thumbnail"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          
          <Link href={`/v2024/NataCourse/${slug}`}>
          
         {!btn? <button
            className="mt-4 w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Subscribe Now
          </button>:<button
            className="mt-4 w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Learn
          </button>}
          </Link>
        </div>
      </div>
    );
  }
  