import { authOptions } from "@lib/auth";


import { getServerSession } from "next-auth";
import {  getMainPageContent, getNataCourses } from "../../../sanity/sanity.query";
import { PortableText } from "next-sanity";
import prisma from "prisma/prisma";
import SubscriptionButton from "app/components/subcribeButton";

//import { getNataCourses } from "sanity/sanity.query";

export default async function  Home() {
  
  const session=await getServerSession(authOptions)

      const user=await prisma.user.findUnique({where: { email:session?.user?.email ||"" },});
console.log("----------------> "+user);

  const  courses=await getNataCourses()
  const mainContent=await getMainPageContent("NataCourse")
  
  
  async function fetchUserWithCourses(email: string) {
    try {
      const response = await fetch(`${process.env.NEXTAUTH_URL}/api/purchased`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }
  
      const data = await response.json();
    //  console.log('User with Purchased Courses:', data);
     
      return data;
    }  catch (err) {
     console.log(err);
     
    } finally {
   
    }
  }
  
  const data=await fetchUserWithCourses(session?.user?.email)
  const pc=data?.purchasedCourses
  console.log("pc-->",pc);
  console.log("courses-->",courses)
  const list=[]
  if(data){
pc.forEach((c:any)=>{
list.push(c.course.id)
})


  }
  console.log(list);

//   const check=(list:number[],id:string)=>{
//     let flag=false
// list.forEach((l)=>{
//   if(l==parseInt(id)){
//     flag=true
//   }
// })
//     return flag
//   }
  
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
    
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="md:col-span-2">
          {/* Welcome Section */}
          <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold mb-4">Nata Courses</h1>

          {(session && user!=null) ? !user.subcribed? <div >{/* className="mr-10 flex items-center gap-2 bg-purple-600 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:bg-purple-700 transition duration-300"*/}
    {/* <a href={`https://rzp.io/rzp/yBEG9LC`} target="_blank">
    Subscribe
    </a> */}
    <SubscriptionButton/>
  </div>:<button>subcribed</button>:<div>signIn to get Access</div>}
  </div>
          <div className="bg-white rounded-lg shadow p-6">
            
          <div className="p-2">
            <iframe width="800" height="400"
src={mainContent[0].video}>
</iframe>
</div>
<div className="p-4 m-3">
 
  <h3 className="ext-2xl font-bold mb-4">About</h3>



 


  <PortableText value={mainContent[0].description}/>
</div>
<div className="flex flex-col space-y-2 p-5">
  {/* <h3 className="ext-2xl font-bold ml-1">Modules</h3>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-5">
          
           {courses.map((course: any,index:any)=>(
            <CourseCard key={index} title={course.title} image={course.image}  slug={course.slug} btn={check(list,course.id)}/>

           ))}
    
          
           
            </div> */}
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