
import prisma from '../../../../prisma/prisma'; // Import your Prisma instance
import { NextResponse } from 'next/server';

export async function POST(req:Request) {

    const { email,jobid }:{email:string,jobid:string}= await req.json();
    console.log("--------------------"+email,jobid);
    
    const user=await prisma.user.findUnique({where: { email:email },});
    const job=await prisma.job.findUnique({where:{id:parseInt(jobid)},})
    const userId=user.id
    const jobId=job.id
    console.log("------------"+userId,jobId);
    
    
//    // console.log(userId,courseId);
//     const user=await prisma.purchase.findUnique({where: { email:email },});
//     console.log(user);
//     // return NextResponse.json(
//     //     { message: 'User already exists.' },
//     //     { status: 200 }
//     //   );
    try {
    //  Check if the purchase already exists
      const existingPurchase = await prisma.applyed.findUnique({
        where: { userId_jobId: { userId, jobId } },
      });

      if (existingPurchase) {
         return NextResponse.json(
        { message: 'User already appiled.' },
        { status: 400 }
   );
      }
     // Create the purchase
      const purchase = await prisma.applyed.create({
        data: {
          userId,
          jobId,
        },
      });
      return NextResponse.json(
        { message: 'job appiled  successfully!.',purchase },
        { status: 200 }
   );
//       //res.status(200).json({ message: 'Course purchased successfully!', purchase });
    } catch (error) {
      console.error('Error appiling the job:', error);
      return NextResponse.json(
        { message: 'Internal Server Error.' },
        { status: 500 }
   );
// //      // res.status(500).json({ error: 'Internal server error.' });
  }
  
// }finally{

// }
   
   
}
