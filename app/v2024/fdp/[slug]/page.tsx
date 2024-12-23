import { PortableText } from 'next-sanity';
import React from 'react';
import { getAuthorById, getFDPBySlug, getRecentFDP } from '../../../../sanity/sanity.query';

import Image from 'next/image';
import { authOptions } from '@lib/auth';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';
import { FDP } from 'types';
import RecentPost from 'app/components/RecentPost';
import Dropdown from 'app/components/dropdown';

const BlogPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  console.log(params);
  
  const cfdp = await getFDPBySlug((await params)?.slug);
  const session = await getServerSession(authOptions);
  const rfdp: FDP[] = await getRecentFDP(); // Recent FDP
  const cauthor = await getAuthorById(cfdp?.author._ref);

  return (
    <>
      <header className="bg-white shadow top-0 sticky z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/v2024">
            <div className="flex items-center justify-center space-x-4">
              <img
                src="/logo.jpeg"
                alt="Barry Wehmiller"
                className="w-10 h-10 object-contain"
              />
              <div className="text-xl font-bold">Aao</div>
            </div>
          </Link>
          <div className="flex flex-col space-y-3">
            <div className="300 w-[400px]">
            {!session?<Link href="/Login" className="flex justify-end items-center text-xs"><div >SignIn</div></Link>: <Dropdown  text={session.user?.email}/>}

            </div>
            <div className="flex space-x-4 items-center text-xs text-black font-bold">
              <a href="/v2024/NataCourse">NATA course</a>
              <a href="/v2024/Courses">Courses</a>
              <a href="/v2024/workshop">WorkShops</a>
              <a href="/v2024/Jobs">Jobs</a>
              <a href="/v2024/fdp">FDP</a>
              <a href="/v2024/Jobs">Surveys</a>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-gray-100 py-10">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="w-full lg:w-2/3">
            <div className="mb-8">
              <Image
                src={cfdp.image}
                width={1080}
                height={100}
                alt="Blog Post Image"
                className="object-contain rounded-lg shadow-md"
              />
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{cfdp.title}</h1>

              <article className="prose prose-lg max-w-none text-gray-700">
                <PortableText value={cfdp.body} />
              </article>
            </div>

            <div className="mt-8 flex items-center space-x-4">
              <img
                src={cauthor.image}
                alt={cauthor.name}
                className="w-16 h-16 rounded-full shadow-md"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-800">{cauthor.name}</h3>
                <div className="text-sm text-gray-600">
                  <PortableText value={cauthor.bio} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent FDPs</h2>
              <ul className="space-y-4">
                {rfdp.map((fdp,index:number) => (
                   <RecentPost key={index} title={fdp.title} slug={fdp.slug} image={fdp.image} publishedAt={fdp.publishedAt.substring(0,10)}/>
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
