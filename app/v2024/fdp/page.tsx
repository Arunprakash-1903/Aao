'use client';

import { useEffect, useState } from "react";
import { PortableText } from "next-sanity";
import { getMainPageContent } from "../../../sanity/sanity.query";
import Card from "app/components/Card";
import RecentPost from "app/components/RecentPost";

export default function Home() {
  const [workshops, setWorkshops] = useState([]);
  const [rfdp, setRfdp] = useState([]);
  const [mainContent, setMainContent] = useState([]);

  useEffect(() => {
    // Fetch workshops
    const fetchWorkshops = async () => {
      try {
        const res = await fetch('/api/fdp/get');
        if (!res.ok) throw new Error(`Failed to fetch workshops, status: ${res.status}`);
        const data = await res.json();
        setWorkshops(data.data);
      } catch (error) {
        console.error('Error fetching workshops:', error);
      }
    };

    // Fetch recent FDP
    const fetchRecentFdp = async () => {
      try {
        const res2 = await fetch('/api/fdp/recent');
        if (!res2.ok) throw new Error(`Failed to fetch recent FDP, status: ${res2.status}`);
        const data2 = await res2.json();
        setRfdp(data2.data);
      } catch (error) {
        console.error('Error fetching recent FDP:', error);
      }
    };

    // Fetch main content
    const fetchMainContent = async () => {
      try {
        const content = await getMainPageContent("FDP");
        setMainContent(content);
      } catch (error) {
        console.error('Error fetching main content:', error);
      }
    };

    fetchWorkshops();
    fetchRecentFdp();
    fetchMainContent();
  }, []); // Runs only once after component mounts

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="md:col-span-2">
          {/* Welcome Section */}
          <div className="flex justify-between items-center m-5">
            <h1 className="text-2xl font-semibold mb-4">
              Faculty Development Programme
            </h1>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col items-center justify-center space-y-8 p-2">
              {mainContent.length > 0 && (
                <>
                  <div className="p-2">
                    <iframe
                      width="800"
                      height="400"
                      src={mainContent[0]?.video}
                    ></iframe>
                  </div>
                  <div className="p-4">
                    <h3 className="text-2xl font-bold mb-4">About</h3>
                    <PortableText value={mainContent[0]?.description} />
                  </div>
                </>
              )}

              {/* Upcoming Workshops */}
              <div className="flex flex-col items-center justify-center mt-4">
                <h3 className="text-2xl font-semibold">
                  Upcoming Faculty Development Programme
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 p-4 gap-4">
                  {workshops.map((workshop) => (
                    <Card
                      key={workshop._id}
                      type="fdp"
                      slug={workshop.slug}
                      image={workshop.image}
                      title={workshop.title}
                      publishedAt={workshop.publishedAt.substring(0, 10)}
                      smallDesc={workshop.description}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Section */}
        <div>
          {/* Recent FDP */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Recent FDP</h3>
            {rfdp.map((fdp, index) => (
              <RecentPost
                type="fdp"
                key={index}
                title={fdp.title}
                slug={fdp.slug}
                image={fdp.image}
                publishedAt={fdp.publishedAt.substring(0, 10)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
