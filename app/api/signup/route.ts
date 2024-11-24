import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import prisma from "../../../prisma/prisma"

export async function POST(request:Request){
    const {email,password,name}=await request.json()
   // console.log(email,password);
    
    if (!email || !password || !name) {
        return NextResponse.json(
          { message: 'Email and password are required.' },
          { status: 400 }
        );
      }
    
      try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
          return NextResponse.json(
            { message: 'User already exists.' },
            { status: 400 }
          );
        }
    
        // Hash the password
        const hashedPassword = await hash(password, 12);
    
        // Create the user in the database
        const user = await prisma.user.create({
          data: { email, password: hashedPassword ,name},
        });
    
        return NextResponse.json(
          { message: 'User created successfully.', user },
          { status: 201 }
        );
      } catch (error:any) {
        console.error('Signup error:', error);
        return NextResponse.json(
          { message: 'Internal server error.' },
          { status: 500 }
        );
      }
}