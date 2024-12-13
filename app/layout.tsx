import type { Metadata } from "next";
import "./globals.css"
import Head from "next/head";

//import NavBar from "./components/NavBar";


export const metadata: Metadata = {
  title: "Aao",
  description: "Aao",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <Head>
        <link rel="icon" href="favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>

        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap"
          rel="stylesheet"
        />
    
<link href="https://fonts.googleapis.com/css2?family=Sour+Gummy:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
      </Head>
      <body className="bg-[#efefef] font-montserrat">
      
        {children}
      </body>
    </html>
  );
}
