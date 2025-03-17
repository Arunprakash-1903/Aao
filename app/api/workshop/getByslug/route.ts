import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/prisma'; // Make sure prisma is set up correctly

export async function POST(
  req: Request,

) {
  try {
    const { slug } :{slug:string}= await req.json();

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const workshops = await prisma.workshop.findMany({
      where: {
        slug: slug,
      },
      include: {
        workshopapplyed: true, // Include related data if needed
      },
    });

    if (workshops.length === 0) {
      return NextResponse.json({ message: 'No workshops found' }, { status: 404 });
    }

    return NextResponse.json(workshops, { status: 200 });
  } catch (error) {
    console.error('Error fetching workshops:', error);
    return NextResponse.json(
      { error: 'Failed to fetch workshops' },
      { status: 500 }
    );
  }
}
