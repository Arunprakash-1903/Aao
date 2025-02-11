import { authOptions } from '@lib/auth'
//import CourseCard from 'app/components/CourseCard'
import { getServerSession } from 'next-auth'
import React from 'react'
import { getModules } from '../../../../sanity/sanity.query'
import MycourseCard from "app/components/MycourseCard"


const Allmodules =async () => {
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
  
  const session=await getServerSession(authOptions)
  const data=await fetchUserWithCourses(session?.user?.email)

  const modules=await getModules()
console.log("data-->",data);
// const check=(list:number[],id:string)=>{
//   let flag=false
// list.forEach((l)=>{
// if(l==parseInt(id)){
//   flag=true
// }
// })
//   return flag
// }
  return (
 <div className="flex flex-col space-y-2 p-5">
   <h3 className="ext-2xl font-bold ml-1">Modules</h3>
   {data.subcribed?<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-5">
           
            {modules.map((workshop: any)=>(
            //  <CourseCard key={index} title={course.title} image={course.image}  slug={course.slug} btn={true}/>
             < MycourseCard key={workshop._id} type={workshop._type} slug={workshop.slug}image={workshop.image}title={workshop.title} publishedAt={""} smallDesc={workshop.description} />
            ))}
     
           
            
             </div>:<div>
              you should subcribe to access this content
              </div>}
             </div>
             
  )
}

export default Allmodules