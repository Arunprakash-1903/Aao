"use client"
import React from 'react'
import { getPost} from '../../../sanity/sanity.query';
import { POST } from '../../../types';
import Card from '../../components/Card';

const  page = async() => {
  const posts:POST[] =await getPost()

  
  return (
    <>
    <main className="grid grid-cols-1 lg:grid-cols-3 p-2 gap-4">
      


   
    
 
    {posts.map(post=>(<Card key={post._id} slug={post.slug}image={post.image}title={post.title} publishedAt={post.publishedAt.substring(0,10)} smallDesc={post.smallDesc} />))}
     
  




 </main>
         {/* <div className="bg-gray-50 p-6 rounded-lg shadow-lg hidden lg:block col-span-1  w-10">
 
         <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Posts</h2>
 
         {rposts.map(post=>(<RecentPost key={post._id} slug={post.slug}image={post.image}title={post.title} publishedAt={post.publishedAt.substring(0,10)}  />))}



</div> */}
</>
  )
}

export default page