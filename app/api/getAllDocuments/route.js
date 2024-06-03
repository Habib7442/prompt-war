import { Client, Databases, Storage } from "appwrite";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  const client = new Client();

  client
    .setEndpoint(process.env.APPWRITE_URL)
    .setProject(process.env.APPWRITE_PROJECT_ID);

  const database = new Databases(client);
  const storage = new Storage(client);

  try {
    const result = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_PROMPT_FORM_DATA_COLLECTION_ID
    );

    const documentsWithImageUrls = result.documents.map((doc) => {
      const imageUrl = storage.getFilePreview(
        process.env.APPWRITE_PROMPT_FORM_IMAGES_BUCKET_ID,
        doc.image
      );
      return { ...doc, imageUrl };
    });


    return NextResponse.json({ ...result, documents: documentsWithImageUrls }, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Failed to get documents.", { status: 500 });
  }
}
