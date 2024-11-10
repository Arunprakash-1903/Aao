


import NavBar from "../components/NavBar";

//import "./globals.css";

  export default async function RootLayout({
    children,
  }) {
   
    return (
      <html lang="en">
        <body>
        <NavBar/>
        <div className="flex  justify-between p-2 px-4">
        <aside className="bg-gray-50  py-4 px-10 rounded-lg hidden lg:block  ">
      
      <nav>
        <a href="#" className="block py-2 hover:bg-gray-100 rounded p-2"> About us</a>
        <a href="#" className="block py-2 hover:bg-gray-100 rounded p-2"> NATA course</a>
        <a href="#" className="block py-2 hover:bg-gray-100 rounded p-2">   Courses</a>
        <a href="#" className="block py-2 hover:bg-gray-100 rounded p-2"> Surveys</a>
        <a href="#" className="block py-2 hover:bg-gray-100 rounded p-2"> WorkShops</a>
        <a href="#" className="block py-2 hover:bg-gray-100 rounded p-2"> FDPs</a> 
        <a href="/v2024/blogs" className="block py-2 hover:bg-gray-100 rounded p-2"> Blogs </a> 
      </nav>
    </aside>
  
          {children}
    
  

        </div>
        </body>
      </html>
    );
  }