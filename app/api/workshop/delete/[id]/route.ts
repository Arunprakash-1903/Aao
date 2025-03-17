import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma/prisma';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.workshop.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json({ message: 'Workshop deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Failed to delete workshop:', error);
    return NextResponse.json(
      { error: 'Failed to delete workshop' },
      { status: 500 }
    );
  }
}
