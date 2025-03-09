import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import fs from "fs";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import prisma from "../../../prisma/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const auth = await getServerSession(authOptions);

    if (!auth || !auth.user) {
      return NextResponse.json({ status: "fail", error: "Not authenticated" });
    }

    const email = formData.get("email") as string;
    const name = formData.get("firstName") as string;
    const intro = formData.get("intro") as string;
    const contactNumber = formData.get("contactNumber") as string;
    const profileDesignation = formData.get("profileDesignation") as string;
    
    const profilePicture = formData.get("profilePicture") as File | null;
    const profileDocument = formData.get("profileDocument") as File | null;

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ status: "fail", error: "User not found" });
    }

    const userDir = `./app/(uploads)/${email}`;
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }

    let profilePicPath = user.profilePicture;
    let documentPath = user.profileDocument;

    if (profilePicture) {
      const picBuffer = new Uint8Array(await profilePicture.arrayBuffer());
      profilePicPath = `${userDir}/${profilePicture.name}`;
      await writeFile(profilePicPath, picBuffer);
    }

    if (profileDocument) {
      const docBuffer = new Uint8Array(await profileDocument.arrayBuffer());
      documentPath = `${userDir}/${profileDocument.name}`;
      await writeFile(documentPath, docBuffer);
    }

    // Update user in the database
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        name,
        intro,
        contactNumber,
        profileDesignation,
        profilePicture: profilePicPath ? profilePicture?.name: user.profilePicture,
        profileDocument: documentPath ? profileDocument?.name : user.profileDocument,
      },
    });

    revalidatePath("/profile");

    return NextResponse.json({ status: "success", user: updatedUser });
  } catch (e) {
    return NextResponse.json({ status: "fail", error: e.message });
  }
}
