import { PortableText } from 'next-sanity'
import React from 'react'
import {  getWorkShopBySlug} from '../../../../sanity/sanity.query'

import Image from "next/image"
import { getServerSession } from 'next-auth'
import { authOptions } from '@lib/auth'
import prisma from 'prisma/prisma'
import RegisterButton from '../../../components/RegisterButton'



const BlogPage = async({params}) => {
 
  const cpost=await getWorkShopBySlug(params?.slug)
const workshopId:any=cpost.id

 const session=await getServerSession(authOptions)

    const user=await prisma.user.findUnique({where: { email:session?.user?.email?session?.user?.email:"" },});
   
      const response = await fetch(`${process.env.NEXTAUTH_URL}/api/purchased`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email:session?.user?.email }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('User Data:', data.workshopapplyed);
      } else {
        console.log(data.message);
        
      }
  const list:number[]=[]
 {if(session && user!=null)  data.workshopapplyed.map((ws:any)=>{
list.push(ws.workshopId)
  })}
  console.log(list.includes(parseInt(workshopId) ));
  
  return (
 
    <div className="bg-gray-100 py-10">
    <div className="flex flex-col items-end">
      <div className="container px-4 lg:px-8 max-w-[1000px] w-full mr-auto">
        
        <div className="mb-8">
          <Image src={cpost.image} width={1080} height={100} alt="Blog Post Image" className="object-contain rounded-lg shadow-md" />
        </div>
  
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className='flex items-center justify-between mb-4'>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{cpost.title}</h1>
          <div className='w-[175px]'>
          {(session && user!=null) ? !user.subcribed? <div className="mr-10 flex items-center gap-2 bg-purple-600 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:bg-purple-700 transition duration-300">
    <a href={`https://buy.stripe.com/test_14k14Z21k1q6au4144?prefilled_email=${session?.user.email}`} target="_blank">
    Subscribe
    </a>
  </div>:<div className='mr-10 flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:bg-blue-700 transition duration-300' >

 <RegisterButton userId={user.id} workshopId={parseInt(workshopId) } state={list.includes(parseInt(workshopId) )}/>
  </div>:<div>signIn to Register</div>}
  </div>
  </div>
  
          <article className="prose prose-lg max-w-none text-gray-700">
            <PortableText value={cpost.body}/>  
          </article>
  
        </div>
      </div>
    </div>
  </div>
  

  )
}

export default BlogPage