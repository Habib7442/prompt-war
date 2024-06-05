import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "appwrite";

type AppwriteConfig = {
  endpoint: string;
  projectId: string;
  databaseId: string;
  userCollectionId: string;
  promptCollectionId: string;
  storageId: string;
  weeklyChallangesCollectionId: string;
  testimonialsCollectionId: string;
};

export const appwriteConfig: AppwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_URL!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
  promptCollectionId: process.env.NEXT_PUBLIC_APPWRITE_PROMPT_COLLECTION_ID!,
  storageId: process.env.NEXT_PUBLIC_APPWRITE_PROMPT_FORM_IMAGES_BUCKET_ID!,
  weeklyChallangesCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_WEEKLY_CHALLENGE_COLLECTION_ID!,
  testimonialsCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_TESTIMONIALS_COLLECTION_ID!,
};

// Init your react-native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error("Failed to create account");

    const avatarUrl = avatars.getInitials(username);

    // Check if a session already exists
    const currentAccount = await account.get().catch(() => null);

    // If a session exists, log out the current user
    if (currentAccount) {
      await account.deleteSession("current");
    }

    // Now, sign in the new user
    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        username,
        email,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const currentSession = await account.get().catch(() => null);

    // If a session exists, delete the current session
    if (currentSession) {
      await account.deleteSession("current");
    }
    console.log("Current session:", currentSession);
    const session = await account.createEmailSession(email, password);

    return session;
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};

export const signOut = async () => {
  try {
    await account.deleteSession("current");
  } catch (error: any) {
    if (error instanceof Error) {
      // Check if the error is due to missing scope
      if (error.message.includes("missing scope")) {
        console.error(
          "The user does not have the necessary permissions to perform this action."
        );
      }
      // Check if the error is due to the user role being 'guests'
      else if (error.message.includes("role: guests")) {
        console.error(
          "The user is not properly authenticated. Please ensure the user is signed in before trying to sign out."
        );
      }
      // Throw the original error message for any other errors
      else {
        throw new Error(error.message);
      }
    } else {
      throw error;
    }
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw new Error("No current account found");

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser.total) throw new Error("No current user found");

    return {
      ...currentUser.documents[0],
      emailVerification: currentAccount.emailVerification,
    };
  } catch (error: any) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};

export const deleteSession = async () => {
  try {
    await account.deleteSession("current");
  } catch (error: any) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.promptCollectionId
    );
    return posts.documents;
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.promptCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );
    return posts.documents;
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};

export const searchPosts = async (query: string) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.promptCollectionId,
      [Query.search("title", query)]
    );
    return posts.documents;
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};

export const getUserPosts = async (userId: string) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.promptCollectionId,
      [Query.equal("creator", userId)]
    );
    return posts.documents;
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};

type FileAsset = {
  name: string;
  type: string;
  size: number;
  uri: string;
};

export const getFilePreview = async (
  fileId: string,
  type: "image" | "video"
) => {
  try {
    let fileUrl;

    if (type === "image") {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw new Error("Failed to get file preview");

    return fileUrl;
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};

export const uploadFile = async (file: File, type: "image" | "video") => {
  if (!file) return;

  try {
    const uploadFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );
    const fileUrl = await getFilePreview(uploadFile.$id, type);
    return fileUrl;
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};

type FormData = {
  title: string;
  thumbnail: File | null;
  prompt: string | null;
  userId: string;
};

export const createImage = async (form: FormData) => {
  try {
    const [thumbnailUrl] = await Promise.all([
      form.thumbnail ? uploadFile(form.thumbnail, "image") : null,
    ]);

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.promptCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl || null,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};

export const likePost = async (postId: string, userId: string) => {
  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.promptCollectionId,
      postId
    );
    const currentLikes = post.likes || [];
    const likesCount = post.likesCount || 0; // Get the current likesCount or set it to 0 if it doesn't exist

    if (!currentLikes.includes(userId)) {
      const updatedLikes = [...currentLikes, userId];
      await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.promptCollectionId,
        postId,
        {
          likes: updatedLikes,
          likesCount: likesCount + 1, // Increment the likesCount
        }
      );
      return updatedLikes;
    }
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};

export const bookmarkPost = async (
  postId: string,
  userId: string,
  isBookmarked: boolean
) => {
  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.promptCollectionId,
      postId
    );

    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.promptCollectionId,
      postId,
      {
        isBookmarked: isBookmarked,
        bookmarkedBy: isBookmarked
          ? [...(post.bookmarkedBy || []), userId]
          : post.bookmarkedBy.filter((id: string) => id !== userId),
      }
    );
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};

export const getBookmarkedPosts = async (userId: string) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.promptCollectionId,
      [Query.search("bookmarkedBy", userId)]
    );

    return posts.documents;
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};

export const getLatestWeeklyChallenge = async () => {
  try {
    const challenges = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.weeklyChallangesCollectionId,
      [
        Query.orderDesc("$createdAt"), // Order by creation date in descending order
        Query.limit(1), // Limit to 1 document
      ]
    );

    // The latest challenge is the first (and only) document in the response
    const latestChallenge = challenges.documents[0];

    return latestChallenge;
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};

export const deletePost = async (postId: string) => {
  try {
    // Check if the document exists
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.promptCollectionId,
      postId
    );

    if (post) {
      // Delete the document
      await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.promptCollectionId,
        postId
      );
      console.log(`Document with ID ${postId} has been deleted`);
    } else {
      console.log(`Document with ID ${postId} does not exist`);
    }
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};

// Create a new testimonial
export const createTestimonial = async (
  userId: string,
  review: string,
  rating: number,
  imageFile: File | null,
  username: string,
  avatar: string
) => {
  try {
    let imageurl = null;
    if (imageFile) {
      const uploadFile = await storage.createFile(
        appwriteConfig.storageId,
        ID.unique(),
        imageFile
      );
      imageurl = await getFilePreview(uploadFile.$id, "image");
    }

    const newTestimonial = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.testimonialsCollectionId,
      ID.unique(),
      {
        userId,
        review,
        rating,
        imageurl,
        username,
        avatar,
      }
    );

    return newTestimonial;
  } catch (error: any) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};

// Get all testimonials
export const getTestimonials = async () => {
  try {
    const testimonials = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.testimonialsCollectionId
    );

    return testimonials.documents;
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};

export const sendPasswordResetEmail = async (email: any) => {
  try {
    await account.createRecovery(
      email,
      `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`
    );
    console.log("Password reset email sent");
  } catch (error: any) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};

export const resetPassword = async (
  userId: string,
  secret: string,
  newPassword: string,
  confirmPassword: string
) => {
  try {
    await account.updateRecovery(userId, secret, newPassword, confirmPassword);
    console.log("Password reset successful");
  } catch (error: any) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};

export const sendVerificationEmail = async () => {
  try {
    await account.createVerification(`${process.env.NEXT_PUBLIC_BASE_URL}/verify-email`);
    console.log("Verification email sent");
  } catch (error: any) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};

// New verifyEmail function
export const verifyEmail = async (userId: string, secret: string) => {
  try {
    await account.updateVerification(userId, secret);
    console.log("Email verification successful");
  } catch (error) {
    console.error("Error verifying email:", error);
    throw new Error("Failed to verify email");
  }
};
