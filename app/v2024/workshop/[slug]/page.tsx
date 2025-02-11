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


 const session=await getServerSession(authOptions)

      const user=await prisma.user.findUnique({where: { email:session?.user?.email ||"" },});
  
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

 <RegisterButton/>
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