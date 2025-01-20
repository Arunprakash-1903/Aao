import { PortableText } from "next-sanity";
import { getMainPageContent } from "../../../sanity/sanity.query";


export default async function  Home() {

 const mainContent=await getMainPageContent('Courses')

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
     

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="md:col-span-2">
          {/* Welcome Section */}
          <h1 className="text-2xl font-semibold mb-4">Courses</h1>
          <div className="bg-white rounded-lg shadow p-6">
            
           
            <div className="flex flex-col items-center justify-center space-y-8 p-2">
            <div className="p-2">
            <iframe width="800" height="400"
src={mainContent[0].video}>
</iframe>
</div>
<div className="p-4">
  <h3 className="ext-2xl font-bold mb-4">About</h3>
  <PortableText value={mainContent[0].description}/>
</div>
            </div>
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