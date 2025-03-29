import RecentPost from "app/components/RecentPost";
import { getMainPageContent } from "../../../sanity/sanity.query";
import Card from "app/components/Card";
import { PortableText } from "next-sanity";

async function fetchWorkshops() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/workshop/get`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Failed to fetch workshops, status: ${res.status}`);
  const data = await res.json();
  return data.data;
}

async function fetchRecentWorkshops() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/workshop/recent`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Failed to fetch recent workshops, status: ${res.status}`);
  const data = await res.json();
  return data.data;
}

export default async function Home() {
  const [workshops, rworkshop, mainContent] = await Promise.all([
    fetchWorkshops(),
    fetchRecentWorkshops(),
    getMainPageContent("Discussions"),
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="md:col-span-2">
          <h1 className="text-2xl font-semibold mb-4">Discussions</h1>
          <div className="bg-white rounded-lg shadow p-6">
            {mainContent.length > 0 && (
              <>
                <div className="p-2">
                  <iframe
                    width="800"
                    height="400"
                    src={mainContent[0]?.video}
                    className="mb-4"
                  />
                </div>
                <div className="p-4 m-3">
                  <h3 className="text-2xl font-bold mb-4">About</h3>
                  <PortableText value={mainContent[0]?.description} />
                </div>
              </>
            )}

            <div className="flex flex-col items-center justify-center mt-4">
              <h3 className="text-2xl font-semibold mb-4">Upcoming Discussions</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 p-4 gap-4">
                {workshops.map((workshop) => (
                  <Card
                    key={workshop.id}
                    type="workshop"
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

        {/* Sidebar Section */}
        <div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Recent Discussions</h3>
            {rworkshop.map((fdp, index) => (
              <RecentPost
                key={index}
                type="workshop"
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
