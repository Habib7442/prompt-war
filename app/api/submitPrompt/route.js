import { Client, Databases, ID, Storage } from "appwrite";
import { createReadStream, Readable } from "fs";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const data = await req.json();

  const client = new Client();
  client
    .setEndpoint(process.env.APPWRITE_URL)
    .setProject(process.env.APPWRITE_PROJECT_ID);

  const database = new Databases(client);

  const { name, prompt, email, socialMedia, image } = data;

  try {
    const result = await database.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_PROMPT_FORM_DATA_COLLECTION_ID,
      ID.unique(),
      {
        name,
        prompt,
        email,
        socialMedia,
        image,
        timeStamp: new Date().toISOString(),
      }
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Failed to submit form.", { status: 500 });
  }
}
