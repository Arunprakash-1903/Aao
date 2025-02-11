import prisma from '../../../prisma/prisma'; // Import your Prisma instance
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, id }: { email: string; id: string } = await req.json();

  // Find the user by email
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user) {
    return NextResponse.json(
      { message: 'User not found.' },
      { status: 404 }
    );
  }

  // Find the course by ID
  const course = await prisma.course.findUnique({ where: { id: parseInt(id) } });
  if (!course) {
    return NextResponse.json(
      { message: 'Course not found.' },
      { status: 404 }
    );
  }

  const userId = user.id;
  const courseId = course.id;

  try {
    // Check if the purchase exists
    const existingPurchase = await prisma.purchase.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });

    if (!existingPurchase) {
      return NextResponse.json(
        { message: 'No purchase found for this course.' },
        { status: 400 }
      );
    }

    // Delete the purchase record
    await prisma.purchase.delete({
      where: { userId_courseId: { userId, courseId } },
    });

    // Optionally, revoke access to the course here
    // You could update the user's subscription or course access status if necessary

    return NextResponse.json(
      { message: 'Course unpurchased successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error unpurchasing course:', error);
    return NextResponse.json(
      { message: 'Internal Server Error.' },
      { status: 500 }
    );
  }
}
