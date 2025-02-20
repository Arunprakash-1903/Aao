"use client"
import React from 'react'

import { SessionProvider, useSession } from "next-auth/react";
const RegisterButton = ({userId,workshopId,state}:{userId:any,workshopId:any,state:boolean}) => {
   

    const { data: session} = useSession();
   
 
    const handleRegister=async()=>{
     
      const response = await fetch('/api/purchased', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email :session.user.email}),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }
  
      const data = await response.json();
      console.log("from workshop apply",data);
      
   
        await fetch(`/api/sendEmail`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
             tomail:session.user.email,
             
         }),
       }); 
       fetch("/api/workshop", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId, workshopId}),
   })
       alert("Registered successfully")  
      }
  return (

    <SessionProvider> 
   {!state? <button className='px-2' onClick={handleRegister}  >
    Register
    </button>:<button >Registered</button>}
    </SessionProvider>
  )

}
export default RegisterButton