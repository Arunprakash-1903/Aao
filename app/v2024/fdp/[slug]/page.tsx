
import React from 'react';


import Image from 'next/image';


import { authOptions } from '@lib/auth';
import { getServerSession } from 'next-auth';
import prisma from 'prisma/prisma';
import RichTextRenderer from 'app/components/RichTextRenderer';
import RecentPost from 'app/components/RecentPost';


const BlogPage = async ({
  params,
}) => {

  
  const response1=await fetch(`${process.env.NEXTAUTH_URL}/api/fdp/getByslug`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({slug :(await params)?.slug  }),
  })
  const cfdp=await response1.json()
  const res2 = await fetch(`${process.env.NEXTAUTH_URL}/api/fdp/recent`);
  const rfdp=await res2.json() // Recent FDP
 console.log(cfdp);
 
  const session=await getServerSession(authOptions)
  const user=await prisma.user.findUnique({where: { email:session?.user?.email ||"" },});
  
  return (
    <>
     
      <div className="bg-gray-100 py-10">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="w-full lg:w-2/3">
            <div className="mb-8">
              <Image
                src={cfdp[0].image}
                width={1080}
                height={100}
                alt="Blog Post Image"
                className="object-contain rounded-lg shadow-md"
              />
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className='flex justify-between mb-4'>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{cfdp[0].title}</h1>
              {(session && user!=null) ? !user.subcribed? <div className="mr-10 flex items-center gap-2 bg-purple-600 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:bg-purple-700 transition duration-300">
    <a href={`https://buy.stripe.com/test_14k14Z21k1q6au4144?prefilled_email=${session?.user.email}`} target="_blank">
    Subscribe
    </a>
  </div>:<div className='mr-10 flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:bg-blue-700 transition duration-300' >

 {/* <RegisterButton/> */}
 <button>Register</button>
  </div>:<div>signIn to Register</div>}
              </div>
              <article className="prose prose-lg max-w-none text-gray-700">
                {/* <PortableText value={cfdp.  body} /> */}
                <RichTextRenderer content={JSON.parse(cfdp[0].body)}/>
              </article>
  
        </div>
      </div>
      <div className="w-full lg:w-1/3">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent FDPs</h2>
              <ul className="space-y-4">
                {rfdp.data.map((fdp,index:number) => (
                   <RecentPost type="fdp" key={index} title={fdp.title} slug={fdp.slug} image={fdp.image} publishedAt={fdp.publishedAt.substring(0,10)}/>
                ))}
               
              </ul>
            </div>
          </div>
    </div>
  </div>
  
    </>
  );
};

export default BlogPage;
