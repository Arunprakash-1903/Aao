

import { PortableText } from "next-sanity";
import { getFDP, getMainPageContent, getRecentFDP} from "../../../sanity/sanity.query";
import {FDP} from "../../../types";
import Card from "app/components/Card";

import RecentPost from "app/components/RecentPost";


export default async function  Home() {
  const workshops:FDP[] =await getFDP()
  const rfdp:FDP[] =await getRecentFDP()
  const mainContent=await getMainPageContent("FDP")
 
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
          
         
            </div>
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
              <div className="flex flex-col items-center justify-center mt-4">
              <h3 className="ext-2xl font-semibold ">Upcomming Faculty Development Programme</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 p-4 gap-4">
           
               {workshops.map(workshop=>(<Card key={workshop._id} type={workshop._type} slug={workshop.slug}image={workshop.image}title={workshop.title} publishedAt={workshop.publishedAt.substring(0,10)} smallDesc={workshop.description} />))}
              
              </div>
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
             <RecentPost type={fdp._type} key={index} title={fdp.title} slug={fdp.slug} image={fdp.image} publishedAt={fdp.publishedAt.substring(0,10)}/>
          )))}
         
          </div>
        </div>
      </main>
    </div>
    
  );
}