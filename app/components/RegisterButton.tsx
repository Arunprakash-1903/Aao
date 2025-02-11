"use client"
import React, { useEffect, useState } from 'react'

import { SessionProvider, useSession } from "next-auth/react";
const RegisterButton = () => {
    const [registered,setRegisted]=useState(false)

    const { data: session} = useSession();
    useEffect(()=>{
setRegisted(false)


    },[])
    const handleRegister=async()=>{
     
        
   
        await fetch(`/api/sendEmail`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
             tomail:session.user.email,
             
         }),
       }); 
       alert("Registered successfully")  
       setRegisted(true)
    }
  return (

    <SessionProvider> 
   {!registered? <button className='px-2' onClick={handleRegister}  >
    Register
    </button>:<button >Registered</button>}
    </SessionProvider>
  )

}
export default RegisterButton