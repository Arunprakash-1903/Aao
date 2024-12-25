

export default async function  Home() {

 

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
     

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="md:col-span-2">
          {/* Welcome Section */}
          <h1 className="text-2xl font-semibold mb-4">Courses</h1>
          <div className="bg-white rounded-lg shadow p-6">
            
           
            <div className="flex flex-col items-center justify-center mt-8">
              <img
                src="/4gwr6brwjhu01.png" // Replace with your mailbox image
                alt="Mailbox"
                className="w-70 h-70"
              />
              <p className="mt-4 text-gray-500">You have no tasks.</p>
            </div>
          </div>
        </div>

        {/* Sidebar Section */}
        <div>
          {/* Welcome Card */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-semibold mb-2">Welcome</h3>
            <p className="text-gray-600">
              Thank you for your interest in sharing your gifts and talents with us. We look forward
              to learning more about you.
            </p>
          </div>

          {/* About Us Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">About Us</h3>
            <img
              src="/logo.jpeg" // Replace with your logo image
              alt="Barry Wehmiller"
              className="w-16 h-16 mb-4"
            />
            <p className="text-gray-600">
              Throughout Barry-Wehmiller, we hold ourselves to a unique measure of success: by the
              way we touch the lives of people.
            </p>
            <a href="#" className="text-blue-500 font-medium mt-2 inline-block">Read More &rarr;</a>
          </div>
          
        </div>
      </main>
    </div>
  );
}