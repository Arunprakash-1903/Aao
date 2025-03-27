import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/prisma';

export async function POST(req: Request) {
    try {
        const { 
            jobTitle, 
            jobDescription, 
            salary, 
            location, 
            experience, 
            company, 
            companyAbout, 
            email, 
            jobType 
        }: { 
            jobTitle: string; 
            jobDescription: string; 
            salary?: number; 
            location?: string; 
            experience?: number; 
            company?: string; 
            companyAbout?: string; 
            email?: string; 
            jobType: string; 
        } = await req.json();

        // Validate required fields
        if (!jobTitle || !jobDescription || !jobType) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Create new job entry
        const newJob = await prisma.job.create({
            data: {
                jobTitle,
                jobDescription,
                salary,
                location,
                experience,
                company,
                companyAbout,
                email,
                jobType,
            },
        });

        return NextResponse.json(newJob, { status: 201 });
    } catch (error) {
        console.error('Error creating job:', error);
        return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
    }
}
