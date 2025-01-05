
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import fs from "fs";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import prisma from "../../../prisma/prisma";
export async function POST(req) {
  try {
    const formData = await req.formData();
    const auth = await getServerSession(authOptions);

    if (!auth || !auth.user) {
      console.error("Authentication failed or no user session.");
      return NextResponse.json({ status: "fail", error: "Not authenticated" });
    }

    const ProfilePicture = formData.get("profilePicture");
    const profileDocument = formData.get("profileDocument");
    const email = formData.get("email");
    const Name = formData.get("firstName");
    const intro = formData.get("intro");
    const contactNumber = formData.get("contactNumber");
    const profileDesignation = formData.get("profileDesignation");

    if (!ProfilePicture.name || !profileDocument.name) {
      console.error("Missing required files in formData.");
      return NextResponse.json({ status: "fail", error: "Missing files" });
    }

    // Check if user exists
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (!userExists) {
      console.error("User not found:", email);
      return NextResponse.json({ status: "fail", error: "User not found" });
    }

    const userDir = `./app/(uploads)/${auth.user?.email}`;
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }

    const arrayBuffer1 = await ProfilePicture.arrayBuffer();
    const buffer1 = new Uint8Array(arrayBuffer1);
    const arrayBuffer2 = await profileDocument.arrayBuffer();
    const buffer2 = new Uint8Array(arrayBuffer2);

    await writeFile(`${userDir}/${ProfilePicture.name}`, buffer1);
    await writeFile(`${userDir}/${profileDocument.name}`, buffer2);

    revalidatePath("/");

     await prisma.user.update({
      where: { email, },
      data: {
        intro:intro,
        // Add more validated fields if needed
        name:Name,
        contactNumber,
        profileDesignation,
        profileDocument: profileDocument.name,
        profilePicture: ProfilePicture.name,
      },
    });
  
    return NextResponse.json({ status: "Profile updated" });
  } catch (e) {
    console.error("Error in POST handler:", e.message, e.stack);
    return NextResponse.json({ status: "fail", error: e.message });
  }
}
