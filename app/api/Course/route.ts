
import prisma from "../../../prisma/prisma" // Make sure to set up Prisma client in lib/prisma.ts
import { NextResponse } from 'next/server';

export  async function POST(req:Request) {
 
const payload=await req.json();



  try {
   
    const course = await prisma.course.create({
      data: {
       
        title:payload?.title,
        
      },
   });
  return NextResponse.json({message: ' created course',course });
 
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: 'Failed to create course' });
  }
}
