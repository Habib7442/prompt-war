import { Client, Databases, Storage } from "appwrite";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const postId = searchParams.get("id");
    const client = new Client();
    const storage = new Storage(client);
    client
      .setEndpoint(process.env.APPWRITE_URL)
      .setProject(process.env.APPWRITE_PROJECT_ID);

    const databases = new Databases(client);
    const document = await databases.getDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_PROMPT_FORM_DATA_COLLECTION_ID,
      postId
    );

    const imageUrl = await storage.getFilePreview(
        process.env.APPWRITE_PROMPT_FORM_IMAGES_BUCKET_ID,
        document.image
      );


    return NextResponse.json({...document, imageUrl}, { status: 200 });
  } catch (error) {
    console.error("Error fetching document:", error);
    return new NextResponse("Error fetching document", { status: 500 });
  }
}
