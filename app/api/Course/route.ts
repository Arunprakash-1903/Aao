import prisma from "../../../prisma/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  type Attachment = {
    title: string;
    url: string;

  };
  
  type Payload = {
    title: string;
    attachments: Attachment[];
  };
  try {
 

    const { title, attachments }:Payload =await req.json();;

  console.log(attachments);
  
    const course = await prisma.course.create({
      data: {
        title,
        attachments: {
          create:attachments
        },
      },
    });
    // Create course with attachments
    

    return NextResponse.json({ message: "Course created successfully!",course });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json({ message: "Failed to create course" }, { status: 500 });
  }
}
