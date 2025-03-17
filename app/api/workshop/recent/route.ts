import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/prisma';

export async function GET() {
  try {
    const recentWorkshops = await prisma.workshop.findMany({
      orderBy: {
        publishedAt: 'desc', // Sort by latest published date
      },
      take: 3, // Limit to 5 recent workshops
    });

    return NextResponse.json({ success: true, data: recentWorkshops }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch recent workshops:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch recent workshops' },
      { status: 500 }
    );
  }
}
