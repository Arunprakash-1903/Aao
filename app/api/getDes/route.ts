import prisma from '../../../prisma/prisma'; // Ensure correct path
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { email }: { email: string } = await req.json();

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { jd: user.profileDesignation },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
