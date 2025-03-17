

import RecentPost from "app/components/RecentPost";
import { getMainPageContent} from "../../../sanity/sanity.query";

import Card from "app/components/Card";
import { PortableText } from "next-sanity";


export default async function  Home() {
  const mainContent=await getMainPageContent('WorkShop')
  console.log(mainContent);
  
const res=await fetch(`${process.env.NEXTAUTH_URL}/api/workshop/get`)
  const workshops=await res.json()
  console.log(workshops);
  const res2 = await fetch(`${process.env.NEXTAUTH_URL}/api/workshop/recent`);
  const rworkshop=await res2.json()
  console.log(rworkshop);
  
  //{console.log(workshops);}
  {workshops.data.map(workshop=>(console.log(workshop.description)))}
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
            
           
            <div className="flex flex-col items-center justify-center mt-8 p-2">
            <div className="p-2">
            <iframe width="800" height="400"
src={mainContent[0].video}>
</iframe>
</div>
<div className="p-4 m-3">
  <h3 className="ext-2xl font-bold mb-4">About</h3>
  <PortableText value={mainContent[0].description}/>
</div>
<div className="flex flex-col items-center justify-center mt-4">
              <h3 className="ext-2xl font-semibold mb-4 ">Upcoming Workshops</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 p-4 gap-4">
           
               {workshops.data.map(workshop=>(<Card key={workshop.id} type="workshop" slug={workshop.slug}image={workshop.image}title={workshop.title} publishedAt={workshop.publishedAt.substring(0,10)} smallDesc={workshop.description} />))}
              
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
            <h3 className="text-lg font-semibold mb-2">Recent WorkShops</h3>
            {rworkshop.data.map(((fdp,index)=>(
             <RecentPost key={index} type="workshop" title={fdp.title} slug={fdp.slug} image={fdp.image} publishedAt={fdp.publishedAt.substring(0,10)}/>
          )))}
          </div>
          
        </div>
      </main>
    </div>
  );
}