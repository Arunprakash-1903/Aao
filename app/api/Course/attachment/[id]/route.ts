import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma"; // Adjust the path to your Prisma client as necessary

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const attachmentId = parseInt((await params).id);

  // Validate the attachment ID
  if (isNaN(attachmentId)) {
    return NextResponse.json(
      { message: "Invalid attachment ID" },
      { status: 400 }
    );
  }

  try {
    // Update the attachment to mark it as completed
    const updatedAttachment = await prisma.attachment.update({
      where: { id: attachmentId },
      data: { completed: true },
    });

    // Return the updated attachment
    return NextResponse.json(updatedAttachment, { status: 200 });
  } catch (error) {
    console.error("Error updating attachment:", error);
    return NextResponse.json(
      { message: "Failed to mark attachment as completed" },
      { status: 500 }
    );
  }
}