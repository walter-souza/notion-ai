// /api/createNoteBook

import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { generateImage, generateImagePrompt } from "@/lib/openai";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("unauthorised", { status: 401 });
  }

  const body = await req.json();
  const { name } = body;

  const image_description = await generateImagePrompt(name);

  var image_url = "";
  if (image_description) {
    image_url = await generateImage(image_description);
  }

  const notes_ids = await db
    .insert($notes)
    .values({
      userId,
      name,
      imageUrl: image_url,
    })
    .returning({
      insertedID: $notes.id,
    });

  return NextResponse.json({
    note_id: notes_ids[0].insertedID,
  });
}
