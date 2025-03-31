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
        }:{jobTitle:string,jobDescription:any,salary:string,location:string,experience:string,company:string,companyAbout:any,email:string,jobType:string}
         = await req.json();

        // Validate required fields
        if (!jobTitle || !jobDescription || !jobType) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
        console.log({ 
            jobTitle, 
            jobDescription, 
            salary, 
           location, 
           experience:experience+"", 
            company, 
            companyAbout, 
            email, 
            jobType 
        });
        

        // Create new job entry
        if(   jobTitle&&
            jobDescription&&
            salary&&
           location&&
           experience+""&&
            company&&
            companyAbout&&
            email&&
            jobType )
       await prisma.job.create({
            data: {
                jobTitle,
                jobDescription:JSON.stringify(jobDescription) || '{}',
                salary:salary+"",
                location,
                Experience :experience+"",
                company,
                company_about:JSON.stringify(companyAbout) ||'{}',
                email,
                jobType,
            },
        });

        return NextResponse.json( { status: 201 });
    } catch (error) {
        console.error('Error creating job:', error);
        return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
    }
}
