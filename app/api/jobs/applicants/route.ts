import prisma from '../../../../prisma/prisma'; // Import your Prisma instance
import { NextResponse } from 'next/server';

export async function POST(req:Request) {

    const { jobid }= await req.json();
    //console.log("--------------------",jobid);
    
    try{

        const job=await prisma.job.findUnique({where:{id:parseInt(jobid)},

        include:{
          apilicants:{
              include:{
                  user:true
              }
          }
        }
      
      }
      
      )
      if (!job) {
        //return res.status(404).json({ message: 'User not found' });
       return  NextResponse.json({ message: 'job not found' },{status:400})
      }
      return NextResponse.json({ message: 'job found' ,job},{status:200})
    }catch(error){
        console.error('Error retrieving job:', error);
    }
  
}