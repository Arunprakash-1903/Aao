import { authOptions } from "@lib/auth";
import { handleOut } from "app/handleOut";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function  Home() {
  const session=await getServerSession(authOptions)
 

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
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
            
            {!session?<Link href="/Login" className="flex justify-end items-center text-xs"><div >SignIn</div></Link>:<div className="flex justify-end items-center text-xs"><div className=" text-gray-400 font-normal cursor-pointer" onClick={handleOut}>{session.user?.email}</div></div>}
            
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="md:col-span-2">
          {/* Welcome Section */}
          <h1 className="text-2xl font-semibold mb-4">Courses</h1>
          <div className="bg-white rounded-lg shadow p-6">
            
           
            <div className="flex flex-col items-center justify-center mt-8">
              <img
                src="/4gwr6brwjhu01.png" // Replace with your mailbox image
                alt="Mailbox"
                className="w-70 h-70"
              />
              <p className="mt-4 text-gray-500">You have no tasks.</p>
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