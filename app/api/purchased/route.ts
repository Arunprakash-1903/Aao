
import { NextResponse } from 'next/server';
import prisma from '../../../prisma/prisma'; // Adjust the path to your Prisma client

export  async function POST(req:Request) {
 

  const { email }:{email:string} = await req.json();

  if (!email) {
  //  return res.status(400).json({ message: 'Email is required' });
 return  NextResponse.json({ message: 'Email is required' },{status:400})
  }

  try {
    const userWithCourses = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        purchasedCourses: {
          include: {
            course: true,
          
          },
        },
      },
    });

    if (!userWithCourses) {
      //return res.status(404).json({ message: 'User not found' });
     return  NextResponse.json({ message: 'User not found' },{status:400})
    }

    return NextResponse.json(userWithCourses,{status:200});
  } catch (error) {
    console.error('Error retrieving user with purchased courses:', error);
   // res.status(500).json({ message: 'Internal Server Error' });
    return NextResponse.json({ message: 'Internal Server Error' },{status:500})
  }
}
