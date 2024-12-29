// app/api/Course/attachment/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/prisma'; // Ensure you import the Prisma client

export async function POST(req: Request) {
  // Parse the JSON payload from the request
  const payload = await req.json();
  
  const { courseId } = payload;
console.log(courseId);

  // Check if courseId is provided in the request
  if (!courseId) {
    return NextResponse.json({ message: 'Course ID is required' }, { status: 400 });
  }

  try {
    // Fetch the course and include attachments
    const courseWithAttachments = await prisma.course.findUnique({
      where: {
        id: courseId, // Use courseId to find the course
      },
      include: {
        attachments: true, // Include attachments in the response
      },
    });

    // Check if the course is found
    if (!courseWithAttachments) {
      return NextResponse.json({ message: 'Course not found' }, { status: 404 });
    }

    // Return the course with attachments
    return NextResponse.json(courseWithAttachments);
  } catch (error) {
    console.error('Error fetching course with attachments:', error);
    return NextResponse.json({ message: 'Failed to retrieve course data' }, { status: 500 });
  }
}
