import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'



const Card = ({title,slug,type,smallDesc,publishedAt,image}) => {
 
  
  return (
    
<div className=" bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 p-5 w-30">

  <Image width={300} height={48} className="w-full h-48 object-cover" src={image}alt="Blog post image" />

  <div className="p-6">
    <p className="text-sm text-gray-500 mb-1">{publishedAt}</p>
    
    <h3 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h3>
    {/* <p className="text-gray-600 mb-4">{body}</p> */}
    <div>
     <div className='text-gray-500'>
    <PortableText  value={smallDesc}/>
    </div>
    </div>
  <Link href={`/v2024/Mycourses/${type}/${slug}`} className="text-blue-500 hover:underline text-sm">Read more</Link>
  </div>
 

  
</div>


  )
}

export default Card