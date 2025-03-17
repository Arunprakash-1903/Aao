import React from 'react';

import Image from 'next/image';

import { authOptions } from '@lib/auth';
import { getServerSession } from 'next-auth';
import prisma from 'prisma/prisma';
import RegisterButton from '../../../components/RegisterButton';
import RichTextRenderer from 'app/components/RichTextRenderer';
import RecentPost from 'app/components/RecentPost';

const BlogPage = async ({ params }) => {
  const response1 = await fetch(`${process.env.NEXTAUTH_URL}/api/workshop/getByslug`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ slug: (await params)?.slug }),
  });

  const workshop = await response1.json();

  const res2 = await fetch(`${process.env.NEXTAUTH_URL}/api/workshop/recent`);
  const rfdp = await res2.json(); // Recent FDPs

  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email || "" },
  });

  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/purchased`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: session?.user?.email }),
  });

  const data = await response.json();

  const list: number[] = [];
  if (session && user != null) {
    data.workshopapplyed.map((ws: any) => {
      list.push(ws.workshopId);
    });
  }

  const workshopId: any = workshop[0].id;

  return (
    <>
      <div className="bg-gray-100 py-10">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="w-full lg:w-2/3">
            <div className="mb-8">
              <Image
                src={workshop[0].image}
                width={1080}
                height={100}
                alt="Workshop Image"
                className="object-contain rounded-lg shadow-md"
              />
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-800">{workshop[0].title}</h1>
                <div className="w-[175px]">
                  {session && user != null ? (
                    !user.subcribed ? (
                      <div className="flex items-center gap-2 bg-purple-600 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:bg-purple-700 transition duration-300">
                        <a
                          href={`https://buy.stripe.com/test_14k14Z21k1q6au4144?prefilled_email=${session?.user.email}`}
                          target="_blank"
                        >
                          Subscribe
                        </a>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:bg-blue-700 transition duration-300">
                        <RegisterButton
                          userId={user.id}
                          workshopId={parseInt(workshopId)}
                          state={list.includes(parseInt(workshopId))}
                        />
                      </div>
                    )
                  ) : (
                    <div>Sign in to Register</div>
                  )}
                </div>
              </div>

              <article className="prose prose-lg max-w-none text-gray-700">
                <RichTextRenderer content={JSON.parse(workshop[0].body)} />
              </article>
            </div>
          </div>

          {/* Right Column - Recent FDPs */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent workshops</h2>
              <ul className="space-y-4">
                {rfdp.data.map((fdp, index: number) => (
                  <RecentPost
                    type="fdp"
                    key={index}
                    title={fdp.title}
                    slug={fdp.slug}
                    image={fdp.image}
                    publishedAt={fdp.publishedAt.substring(0, 10)}
                  />
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
