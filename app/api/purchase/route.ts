
import prisma from '../../../prisma/prisma'; // Import your Prisma instance
import { NextResponse } from 'next/server';

export async function POST(req:Request) {

    const { email,id }:{email:string,id:string} = await req.json();
    const user=await prisma.user.findUnique({where: { email:email },});
    const course=await prisma.course.findUnique({where:{id:parseInt(id)},})
    const userId=user.id
    const courseId=course.id
    
//    // console.log(userId,courseId);
//     const user=await prisma.purchase.findUnique({where: { email:email },});
//     console.log(user);
//     // return NextResponse.json(
//     //     { message: 'User already exists.' },
//     //     { status: 200 }
//     //   );
    try {
      // Check if the purchase already exists
      const existingPurchase = await prisma.purchase.findUnique({
        where: { userId_courseId: { userId, courseId } },
      });

      if (existingPurchase) {
         return NextResponse.json(
        { message: 'Course already exists.' },
        { status: 400 }
   );
      }
     // Create the purchase
      const purchase = await prisma.purchase.create({
        data: {
          userId,
          courseId,
        },
      });
      return NextResponse.json(
        { message: 'Course purchased successfully!.',purchase },
        { status: 200 }
   );
//       //res.status(200).json({ message: 'Course purchased successfully!', purchase });
    } catch (error) {
      console.error('Error purchasing course:', error);
      return NextResponse.json(
        { message: 'Internal Server Error.' },
        { status: 500 }
   );
// //      // res.status(500).json({ error: 'Internal server error.' });
  }
  
// }finally{

// }
   
   
}
