
//import NavBar from "./components/NavBar";
import Image from "next/image";


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
    <div className="w-32 h-32 relative">
      <Image
        src="/helmet.png" // Place your image in the "public" folder
        alt="Under Construction"
        width={500}
        height={500}
        
      />
    </div>
    <h1 className="mt-6 text-3xl font-bold text-gray-800">Under Construction</h1>
    <p className="mt-2 text-lg text-gray-600">
      Our website is under construction. We&apos;ll be here soon with our new awesome site.
    </p>
  </div>
  );
}
