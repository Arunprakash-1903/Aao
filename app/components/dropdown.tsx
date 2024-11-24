"use client"
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "./dropdown-menu"
  import {
    Avatar,
    AvatarFallback,
    
  } from "./avatar"
import { signOut } from 'next-auth/react'
//session?.user.name[0]

const Dropdown = ({text}) => {
  return (
    <DropdownMenu>
    <DropdownMenuTrigger>
      
    <Avatar className="cursor-pointer">

<AvatarFallback>{text}</AvatarFallback>
</Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={()=>{signOut()}}>Sign Out</DropdownMenuItem>
     
    </DropdownMenuContent>
  </DropdownMenu>

  )
}

export default Dropdown