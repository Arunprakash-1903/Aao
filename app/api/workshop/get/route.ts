import { NextResponse } from 'next/server';
import prisma from "../../../../prisma/prisma";

export async function GET() {
  try {
    const workshops = await prisma.workshop.findMany();
    return NextResponse.json({ success: true, data: workshops }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch workshops:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch workshops' },
      { status: 500 }
    );
  }
}
