import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma/prisma';

export async function DELETE(req: Request, { params}:any) {
  try {
    await prisma.job.delete({
      where: { id: Number( params.id) },
    });

    return NextResponse.json({ message: 'job deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Failed to delete job:', error);
    return NextResponse.json(
      { error: 'Failed to delete job' },
      { status: 500 }
    );
  }
}