import Link from 'next/link'
import React from 'react'
import { useSession } from 'next-auth/react';
import Dropdown from './dropdown';
const Header = () => {
    const { data: session} = useSession();
  return (
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
        
       {/* {!session?<Link href="/Login" className="flex justify-end items-center text-xs"><div >SignIn</div></Link>:<div className="flex justify-end items-center text-xs"><div className=" text-gray-400 font-normal cursor-pointer" onClick={handleOut}>{session.user?.email}</div></div>} */}
       <div className="flex justify-end items-center text-xs"> 

       {!session?<Link href="/Login" className="flex justify-end items-center text-xs"><div >SignIn</div></Link>: <Dropdown  text={session.user?.email}/>}
        </div>

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
  
  )
}

export default Header