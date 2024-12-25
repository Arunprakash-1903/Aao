

import { getFDP, getRecentFDP} from "../../../sanity/sanity.query";
import {FDP} from "../../../types";
import Card from "app/components/Card";

import RecentPost from "app/components/RecentPost";


export default async function  Home() {
  const workshops:FDP[] =await getFDP()
  const rfdp:FDP[] =await getRecentFDP()
 
  {workshops.map(workshop=>(console.log(workshop.description)))}
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
     
    

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