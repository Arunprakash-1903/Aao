import { PortableText } from 'next-sanity'
import React from 'react'
import { getAuthorById, getWorkShopBySlug} from '../../../../sanity/sanity.query'

import Image from "next/image"


const BlogPage = async({params}) => {
  const cpost=await getWorkShopBySlug(params?.slug)

 const cauthor=await getAuthorById(cpost?.author._ref)
  console.log(cauthor);
  
  return (
 
   
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
         

  )
}

export default BlogPage