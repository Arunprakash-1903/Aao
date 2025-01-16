"use client"

import { sendEmail } from "@lib/mail";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";



 
 
const ApplyButton=({jobId})=>{
  const { data: session} = useSession();
  let list=[]
  const [data,setData]=useState<any>();
    //console.log(session);
     useEffect(()=>{
      async function fetchUserWithCourses(email: string) {
        try {
          const response = await fetch('/api/purchased', {
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
      
          const d = await response.json();
          console.log('User with Purchased Courses:', d);
          setData(d)
         
        }  catch (err) {
         
        } finally {
        
        }
      }
      
      
            fetchUserWithCourses(session?.user.email)
            
     },[session])
   
     if(data){
      const aj=data.appiledJobs
      //console.log(aj);
      
       
       
          aj.forEach((j:any)=>{
            list.push(j.job.id)
            })
        }
       
     //console.log(data);
 




    //  var data=fetchUserWithCourses(session?.user?.email)
    //  if(data){
    //   const aj=adata?.appliedJob;
    //  }
    // const logic=async()=>{
      
    //   const aj=data?.appiledJob
    //   let list=[]
    //   if(data){
    //     aj.forEach((j:any)=>{
    //       list.push(j.job.id)
    //       })
    //   }
    //   return list
    // }
    
    
   const check=(list:number[],id:string)=>{
    let flag=false
list.forEach((l)=>{
  if(l==parseInt(id)){
    flag=true
  }
})
    return flag
  }
  //console.log(list,check(list,jobId));
  
    const haandleApply=async()=>{
     
        
        const response = await fetch(`/api/jobs/apply`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email:session.user.email,
                jobid:jobId
            }),
          });
          if(!response.ok){
            alert("error")
          }else{
            alert("Appiled successfully")
            console.log(response.json);
            
          }
          const res = await fetch(`/api/sendEmail`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tomail:session.user.email,
                
            }),
          });   
        
      }

     // console.log(list);
      

return <SessionProvider> 
  
 {!(list.length!=0&& check(list,jobId))? <button onClick={haandleApply}  className="px-4 py-2 bg-blue-500 text-white rounded-md">
Apply
</button>:<button>
  Appiled
  </button>}
</SessionProvider>
}
export default ApplyButton