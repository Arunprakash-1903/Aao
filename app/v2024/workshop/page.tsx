

import RecentPost from "app/components/RecentPost";
import { getRecentWorkShop, getWorkshop } from "../../../sanity/sanity.query";
import {Workshop} from "../../../types";
import Card from "app/components/Card";


export default async function  Home() {

  const workshops:Workshop[] =await getWorkshop()
  const rworkshop:Workshop[]=await getRecentWorkShop()
  //{console.log(workshops);}
  {workshops.map(workshop=>(console.log(workshop.description)))}
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
     
     

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="md:col-span-2">
          {/* Welcome Section */}
          <h1 className="text-2xl font-semibold mb-4">WorkShops</h1>
          <div className="bg-white rounded-lg shadow p-6">
            
           
            <div className="flex flex-col items-center justify-center mt-8">
             
              <h3 className="ext-2xl font-semibold mb-4">Conducted Workshops</h3>
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
            <h3 className="text-lg font-semibold mb-2">Recent WorkShops</h3>
            {rworkshop.map(((fdp,index)=>(
             <RecentPost key={index} type={fdp._type} title={fdp.title} slug={fdp.slug} image={fdp.image} publishedAt={fdp.publishedAt.substring(0,10)}/>
          )))}
          </div>
          
        </div>
      </main>
    </div>
  );
}