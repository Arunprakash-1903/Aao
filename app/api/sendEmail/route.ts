import { sendEmail } from "@lib/mail"
import { NextResponse } from "next/server";
import prisma from "prisma/prisma";
import path from 'path';

import fs from 'fs'
export async function POST(request:Request){
const {tomail}=await request.json()
//sendEmail(tomail,file,path)

const user =await prisma.user.findUnique({
    where: {
      email: tomail,
    },
    include: {
      purchasedCourses: {
        include: {
          course: true,
         
        
        },
      },
      appiledJobs:{
        include:{
        job:true
        }
      }
    },
  });
  const filePath = path.join("app", "(uploads)", tomail, user.profileDocument);
if(fs.existsSync(filePath))
    sendEmail(tomail,user.profileDocument,filePath)
else
    return NextResponse.json({message:"no document found"},{status:200})
return NextResponse.json({message:"sent"})


}
