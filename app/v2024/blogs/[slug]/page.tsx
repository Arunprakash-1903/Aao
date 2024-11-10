"use client"
import { PortableText } from 'next-sanity'
import React from 'react'
import { getPostBySlug, getRecentPost } from '../../../../sanity/sanity.query'
import RecentPost from '../../../components/RecentPost'
import { POST } from '../../../../types'
import Image from "next/image"
const BlogPage = async({params}) => {
  const cpost=await getPostBySlug(params.slug)
  const rposts:POST[]=await getRecentPost()
  return (
    <>
    <div className="bg-gray-100 py-10">
    <div className="container  px-4 lg:px-8 w-[1000px]">
      
    
      <div className="mb-8">
        <Image src={cpost.image} width={1000} height={80} alt="Blog Post Image" className="w-full h-80 object-cover rounded-lg shadow-md" />
      </div>
  

      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{cpost.title}</h1>
        

        <article className="prose prose-lg max-w-none text-gray-700">
        <PortableText value={cpost.body}/>  
        </article>
      </div>
    </div>
  </div>
          <aside className="bg-gray-50 p-6 rounded-lg shadow-lg hidden lg:block col-span-1 px-10">
 
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Posts</h2>
  
          {rposts.map(rpost=>(<RecentPost key={rpost._id} slug={rpost.slug}image={rpost.image}title={rpost.title} publishedAt={rpost.publishedAt.substring(0,10)}  />))}

</aside>
</>
  )
}

export default BlogPage