"use client"
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
 
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "./dropdown-menu"

import { signOut } from 'next-auth/react'
import Link from 'next/link'

//session?.user.name[0]

const Dropdown = ({text}) => {
  return (
    <DropdownMenu>
    <DropdownMenuTrigger>
      
    {/* <Avatar className="cursor-pointer">

<AvatarFallback>{text}</AvatarFallback>
</Avatar> */}
<div className=" text-gray-400 font-normal cursor-pointer" >{text}</div>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
      <DropdownMenuItem >Profile</DropdownMenuItem>
      <DropdownMenuSeparator />
      <Link href="/v2024/Mycourses">
      <DropdownMenuItem >My courses</DropdownMenuItem>
      </Link>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={()=>{signOut()
      
      }}>Sign Out</DropdownMenuItem>
  
     
    </DropdownMenuContent>
  </DropdownMenu>

  )
}

export default Dropdown