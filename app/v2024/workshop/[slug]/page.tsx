import { PortableText } from 'next-sanity'
import React from 'react'
import { getAuthorById, getWorkShopBySlug} from '../../../../sanity/sanity.query'
import { handleOut } from "app/handleOut";
import Image from "next/image"
import { authOptions } from '@lib/auth'
import { getServerSession } from 'next-auth/next'
import Link from 'next/link'
const BlogPage = async({params}) => {
  const cpost=await getWorkShopBySlug(params?.slug)
  const session=await getServerSession(authOptions)
 const cauthor=await getAuthorById(cpost?.author._ref)
  console.log(cauthor);
  
  return (
    <>
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
            
            {!session?<Link href="/Login" className="flex justify-end items-center text-xs"><div >SignIn</div></Link>:<div className="flex justify-end items-center text-xs"><div className=" text-gray-400 font-normal cursor-pointer" onClick={handleOut}>{session.user?.email}</div></div>}
            
            </div>
          <div className="flex space-x-4 items-center text-xs text-black font-bold ">
          <a href="/v2024/NataCourse" className="">NATA course</a>
            <a href="/v2024/Courses" className="">Courses</a>
            <a href="/v2024/workshop" className="">WorkShops</a>
            <a href="/v2024/Jobs" className="">Jobs</a>
   
            
            <a href="/v2024/Jobs" className="">Surveys</a>
          
          
            {/* <div className="text-gray-600">icons.bdc@gmail.com</div> */}
            </div>
            </div>
          
        </div>
      </header>
    <div className="bg-gray-100 py-10">
      <div className='flex flex-col items-center'>
    <div className="container  px-4 lg:px-8 w-[1000px]">
      
    
      <div className="mb-8">
        <Image src={cpost.image} width={1080} height={100} alt="Blog Post Image" className="object-contain rounded-lg shadow-md" />
      </div>
  

      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{cpost.title}</h1>
        

        <article className="prose prose-lg max-w-none text-gray-700">
        <PortableText value={cpost.body}/>  
        </article>
    
      </div>
    </div>
    <div className="mt-8 flex items-center space-x-4">
          <img
            src={cauthor.image} // Replace with author image
            alt={cauthor.name}
            className="w-16 h-16 rounded-full shadow-md"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-800">{cauthor.name}</h3>
           <div className="text-sm text-gray-600">
            <PortableText value={cauthor.bio}/>  
            </div> 
          </div>
        </div>
    </div>
  </div>
         
</>
  )
}

export default BlogPage