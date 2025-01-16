import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const formData = await request.formData();

    // Extract fields from the form data
    const jobTitle = formData.get('jobTitle');
    const jobDescription = formData.get('jobDescription');
    const salary = parseFloat(formData.get('salary'));
    
    const jobType = formData.get('jobType');

    // Validate required fields
    if (!jobTitle || !jobDescription || isNaN(salary)  || !jobType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create a new job entry
    const newJob = await prisma.job.create({
      data: { jobTitle, jobDescription, salary, jobType },
    });

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}
