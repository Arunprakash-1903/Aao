

import Image from 'next/image'
import Link from 'next/link'


const RecentPost = ({type,title,image,slug,publishedAt}) => {

  
  
  return (
    <>
   
       <ul>
        <Link href={`/v2024/${type}/${slug}`}>
       <li className="mb-10 flex items-center justify-between space-x-4 w-[300px]">
       <Image width={100} height={100} src={image} alt="Blog 1" className=" object-cover rounded-lg" />
       <div className='flex-1'>
         <h3>{title}</h3>
         <p className="text-gray-500 text-sm">{publishedAt}</p>
       </div>
     </li>
     </Link>
     </ul>


   
   
  </>
  )
}

export default RecentPost
