import { authOptions } from "@lib/auth";

import { getServerSession } from "next-auth";
import Link from "next/link";
import { getFDP, getRecentFDP} from "../../../sanity/sanity.query";
import {FDP} from "../../../types";
import Card from "app/components/Card";

import RecentPost from "app/components/RecentPost";
import Dropdown from "app/components/dropdown";

export default async function  Home() {
  const session=await getServerSession(authOptions)
  const workshops:FDP[] =await getFDP()
  const rfdp:FDP[] =await getRecentFDP()
 
  {workshops.map(workshop=>(console.log(workshop.description)))}
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
            
              {!session?<Link href="/Login" className="flex justify-end items-center text-xs"><div >SignIn</div></Link>: <Dropdown  text={session.user?.email}/>}
            
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
          <div className="flex justify-between items-center m-5">
          <h1 className="text-2xl font-semibold mb-4">Faculty Development Programme</h1>
          
          <a className="w-full sm:w-auto py-3 px-6 bg-indigo-600 text-white text-lg font-semibold rounded-md shadow-md hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Register
            </a>
            </div>
          <div className="bg-white rounded-lg shadow p-6">
            
           
            <div className="flex flex-col items-center justify-center mt-8">
             
              <h3 className="ext-2xl font-semibold mb-4">Conducted Faculty Development Programme</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 p-4 gap-4">
           
               {workshops.map(workshop=>(<Card key={workshop._id} type={workshop._type} slug={workshop.slug}image={workshop.image}title={workshop.title} publishedAt={workshop.publishedAt.substring(0,10)} smallDesc={workshop.description} />))}
              
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Section */}
        <div>
          {/* Welcome Card */}
          {/* <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-semibold mb-2">Welcome</h3>
            <p className="text-gray-600">
              Thank you for your interest in sharing your gifts and talents with us. We look forward
              to learning more about you.
            </p>
          </div> */}

          {/* About Us Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Recent FDP</h3>
          {rfdp.map(((fdp,index)=>(
             <RecentPost key={index} title={fdp.title} slug={fdp.slug} image={fdp.image} publishedAt={fdp.publishedAt.substring(0,10)}/>
          )))}
         
          </div>
        </div>
      </main>
    </div>
    
  );
}