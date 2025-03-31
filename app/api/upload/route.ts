import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import prisma from "../../../prisma/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const auth = await getServerSession(authOptions);

    if (!auth || !auth.user) {
      return NextResponse.json({ status: "fail", error: "Not authenticated" });
    }

    const email = formData.get("email")?.toString() || "";
    const name = formData.get("name")?.toString() || "";
    const contactNumber = formData.get("contactNumber")?.toString() || "";
    const profileDesignation = formData.get("profileDesignation")?.toString() || "";

    const profilePicture = formData.get("profilePicture") as Blob | null;
    const profileDocument = formData.get("profileDocument") as Blob | null;

    console.log("✅ Received Data:", { email, name, contactNumber, profileDesignation });

    if (!email) {
      return NextResponse.json({ status: "fail", error: "Email is required" });
    }

    let uploadedProfilePicture = "";
    let uploadedProfileDocument = "";

    // ✅ Upload to Cloudinary
    const uploadToCloudinary = async (file: Blob, folder: string, resourceType: "image" | "raw") => {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return new Promise<string>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder, resource_type: resourceType ,type:"upload"},
            (error, result) => {
              if (error) {
                console.error("❌ Cloudinary Upload Error:", error);
                reject("");
              } else {
                resolve(result?.secure_url || "");
              }
            }
          );
          uploadStream.end(buffer);
        });
      } catch (error) {
        console.error("❌ File conversion failed",error);
        return "";
      }
    };

    if (profilePicture) {
      uploadedProfilePicture = await uploadToCloudinary(profilePicture, `user_profiles/${email}`, "image");
      console.log("✅ Uploaded Profile Picture:", uploadedProfilePicture);
    }

    if (profileDocument) {
      uploadedProfileDocument = await uploadToCloudinary(profileDocument, `user_profiles/${email}`, "raw");
      console.log("✅ Uploaded Profile Document:", uploadedProfileDocument);
    }

    console.log("📂 Final Uploaded Documents:", { uploadedProfilePicture, uploadedProfileDocument });

    // ✅ Update User Profile in Prisma
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        name: name || undefined,
        contactNumber: contactNumber || undefined,
        profileDesignation: profileDesignation || undefined,
        profilePicture: uploadedProfilePicture || undefined,
        profileDocument: uploadedProfileDocument || undefined,
      },
    });

    return NextResponse.json({
      status: "success",
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (e: any) {
    console.error("❌ Error in POST handler:", e.message);
    return NextResponse.json({ status: "fail", error: e.message });
  }
}
