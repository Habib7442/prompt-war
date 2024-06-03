import { Client, Databases } from "appwrite";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const data = await req.json();

  const client = new Client();
  client
    .setEndpoint(process.env.APPWRITE_URL)
    .setProject(process.env.APPWRITE_PROJECT_ID);

  const database = new Databases(client);

  const { postId } = data;

  try {
    const currentDocument = await database.getDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_PROMPT_FORM_DATA_COLLECTION_ID,
      postId
    );
    const currentLikes = currentDocument.likes || 0;
    const result = await database.updateDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_PROMPT_FORM_DATA_COLLECTION_ID,
      postId,
      {
        likes: currentLikes + 1,
      }
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Failed to submit form.", { status: 500 });
  }
}
