import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/prisma'; // Make sure prisma is set up correctly

export async function POST(
  req: Request,

) {
  try {
    const { slug }:{slug:string} = await req.json();
console.log(slug);

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const fdps = await prisma.FDP.findMany({
      where: {
        slug: slug,
      },
      include: {
        fdpapplyed: true, // Include related data if needed
      },
    });

    if (fdps.length === 0) {
      return NextResponse.json({ message: 'No fdps found' }, { status: 404 });
    }

    return NextResponse.json(fdps, { status: 200 });
  } catch (error) {
    console.error('Error fetching fdps:', error);
    return NextResponse.json(
      { error: 'Failed to fetch fdps' },
      { status: 500 }
    );
  }
}
