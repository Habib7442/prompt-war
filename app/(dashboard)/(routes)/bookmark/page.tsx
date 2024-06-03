"use client";
import PromptCard from "@/components/PromptCard";
import renderSkeletons from "@/components/Skeleton";
import exportObject from "@/constants/images";
import useAppwrite from "@/lib/useAppwrite";
import Image from "next/image";
import { getBookmarkedPosts } from "@/lib/appwrite";
import { useAppSelector } from "@/provider/redux/store";

type User = {
  avatar: string;
  username: string;
  $id: string;
  // other properties...
};

type Post = {
  $id: string;
  likes: any[];
  title: string;
  thumbnail: string;
  prompt: string;
  creator: {
    username: string;
    avatar: string;
    // Add any other relevant properties for the creator
  };
  isBookmarked: boolean;
};

const Bookmark = () => {
  const user = useAppSelector((state) => state.global.user) as User | null;
  const userId = user?.$id ?? ""; // Use an empty string as the default value
  const { data: bookmarkedPosts, isLoading } = useAppwrite(() =>
    getBookmarkedPosts(userId)
  );
  if (bookmarkedPosts.length === 0) {
    return (
      <div className="w-full h-screen bg-black flex flex-col justify-center items-center">
        <Image
          src={exportObject.images.empty}
          className="w-[200px] h-[200px] object-cover"
          alt="empty"
        />
        <h2 className="text-center text-white text-2xl font-bold">No Posts</h2>
      </div>
    );
  }
  return (
    <div className="w-full h-full bg-black text-white grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 p-4 mt-4">
      {isLoading
        ? renderSkeletons()
        : bookmarkedPosts.map((item: Post) => (
            <PromptCard
              key={item.$id}
              promptImage={{
                ...item,
                likes: item.likes?.length || 0,
                likesCount: item.likes?.length || 0,
              }}
            />
          ))}
    </div>
  );
};

export default Bookmark;
