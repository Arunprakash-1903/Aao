import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/prisma';

export async function POST(req: Request) {
    try {
      const { slug, title, description, body, image } :{ slug:string, title:string, description:any, body:any, image:string }= await req.json();
  
      if (!slug || !title || !image) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }
  console.log({ slug, title, description, body, image });
  
      // Convert Tiptap JSON object to string for Prisma
      const newWorkshop = await prisma.workshop.create({
        data: {
          slug,
          title,
          description: JSON.stringify(description) || '{}', // Convert to string
          body: JSON.stringify(body) || '{}', // Convert to string
          image,
        },
      });
  
      return NextResponse.json(newWorkshop, { status: 201 });
    } catch (error) {
      console.error('Error creating workshop:', error);
      return NextResponse.json({ error: 'Failed to create workshop' }, { status: 500 });
    }
  }