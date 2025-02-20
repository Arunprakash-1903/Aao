import { NextResponse } from 'next/server';
import prisma from '../../../prisma/prisma';
export async function POST(req: Request) {
    try {
        const { userId, workshopId }: { userId: number; workshopId: number } = await req.json();
console.log(userId,workshopId);

        if (!userId || !workshopId) {
            return NextResponse.json(
                { message: "User ID and Workshop ID are required" },
                { status: 400 }
            );
        }

        // Check if the user already applied for the workshop
        const existingApplication = await prisma.workshopapplyed.findUnique({
            where: { userId_workshopId: { userId, workshopId } }, // Unique constraint
        });

        if (existingApplication) {
            return NextResponse.json(
                { message: "User has already applied for this workshop" },
                { status: 400 }
            );
        }

        // Apply user to workshop
        const application = await prisma.workshopapplyed.create({
            data: { userId, workshopId },
        });

        return NextResponse.json(
            { message: "Application successful", application },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error applying for workshop:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}