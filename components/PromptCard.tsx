"use client";
import { useEffect, useState } from "react";
import { bookmarkPost, deletePost, likePost } from "../lib/appwrite";
import { useAppSelector } from "@/provider/redux/store";
import { Trash2Icon } from "lucide-react";
import {
  setLikedPosts,
  setBookmarkedPosts,
} from "@/provider/redux/globalSlice";

import Image from "next/image";
import icons from "@/constants/icons";
import DialogComponent from "./Dialog";
import { usePathname, useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { toast } from "sonner";

type PromptImage = {
  title: string;
  thumbnail: string;
  prompt: string;
  creator: { username: string; avatar: string };
  $id: string;
  likes: string;
  isBookmarked: boolean;
  likesCount: number;
};

type GlobalState = {
  global: {
    isLogged: boolean;
    user: any; // replace with the actual type of user
    isLoading: boolean;
    bookmarkedPosts: any[]; // replace with the actual type of bookmarkedPosts
    likedPosts: any[]; // replace with the actual type of likedPosts
  };
};

const PromptCard = ({
  promptImage: {
    title,
    thumbnail,
    prompt,
    creator: { username, avatar },
    $id,
    likes,
    isBookmarked,
    likesCount,
  },
}: {
  promptImage: PromptImage;
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarkedState, setIsBookmarkedState] = useState(isBookmarked);
  const [localLikesCount, setLocalLikesCount] = useState(likesCount);
  const { user, bookmarkedPosts, likedPosts } = useAppSelector(
    (state: GlobalState) => state.global
  );

  const pathname = usePathname();
  const router = useRouter();

  const generateUserKey = (user: any) => {
    if (!user) return null;
    return `user_${user.$id}`;
  };

  const handleLike = async () => {
    try {
      await likePost($id, user?.$id);
      const userKey = generateUserKey(user);
      const likeStatus = !isLiked;
      setIsLiked(likeStatus);
      localStorage.setItem(
        `@${userKey}_likeStatus_${$id}`,
        JSON.stringify(likeStatus)
      );
      if (likeStatus) {
        setLikedPosts([...likedPosts, $id]);
        setLocalLikesCount(localLikesCount + 1);
      } else {
        setLikedPosts(likedPosts.filter((postId) => postId !== $id));
        setLocalLikesCount(localLikesCount - 1);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleBookmark = async () => {
    try {
      await bookmarkPost($id, user?.$id, !isBookmarkedState);
      const userKey = generateUserKey(user);
      const bookmarkStatus = !isBookmarkedState;
      setIsBookmarkedState(bookmarkStatus);
      localStorage.setItem(
        `@${userKey}_bookmarkStatus_${$id}`,
        JSON.stringify(bookmarkStatus)
      );

      if (bookmarkStatus) {
        setBookmarkedPosts([...bookmarkedPosts, $id]);
      } else {
        setBookmarkedPosts(bookmarkedPosts.filter((postId) => postId !== $id));
      }
    } catch (error) {
      console.error("Error bookmarking post:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost($id);
      toast("Post deleted successfully Please refresh the page");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast("Error deleting post. Please try again.");
    }
  };

  useEffect(() => {
    const fetchLikeStatus = async () => {
      const userKey = generateUserKey(user);
      const likeStatus = localStorage.getItem(`@${userKey}_likeStatus_${$id}`);
      if (likeStatus !== null) {
        setIsLiked(JSON.parse(likeStatus));
      }
    };

    fetchLikeStatus();
  }, [user]);

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      const userKey = generateUserKey(user);
      const bookmarkStatus = localStorage.getItem(
        `@${userKey}_bookmarkStatus_${$id}`
      );
      if (bookmarkStatus !== null) {
        setIsBookmarkedState(JSON.parse(bookmarkStatus) || isBookmarked);
      } else {
        setIsBookmarkedState(isBookmarked);
      }
    };
    fetchBookmarkStatus();
  }, [user, isBookmarked]);

  return (
    <div className="flex flex-col px-4 mb-14">
      <div className="flex gap-3 items-start">
        <div className="justify-start items-start flex flex-row flex-1">
          <div className="w-8 h-8 rounded-lg border border-teal-400 justify-center items-center p-0.5">
            <Image
              src={avatar}
              width={100}
              height={100}
              className="w-full h-full rounded-lg"
              alt="avatar"
            />
          </div>
          <div className="justify-center items-center flex-1 ml-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <h2 className="text-white font-semibold text-sm">
                    {title.slice(0, 30)}...
                  </h2>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <p className="text-gray-300 text-xs">{username}</p>
          </div>
          {pathname.startsWith("/profile") && (
            <Trash2Icon
              onClick={handleDelete}
              className="w-5 h-5 my-auto cursor-pointer"
            />
          )}
        </div>
      </div>
      <button className="w-full h-[350px] rounded-xl relative justify-center items-center">
        <Image
          src={thumbnail}
          fill
          className="w-full h-full rounded-xl mt-3 object-cover"
          alt="thumbnail"
        />
      </button>
      <div className="mt-4 w-full flex flex-row gap-2">
        <button onClick={handleLike}>
          <Image
            src={isLiked ? icons.likered : icons.like}
            width={100}
            height={100}
            className="w-8 h-8 opacity-80"
            alt="like"
          />
        </button>
        <button>
          <Image src={icons.share} className="w-8 h-8 opacity-80" alt="share" />
        </button>
        <button onClick={handleBookmark} className="ml-auto">
          <Image
            src={isBookmarkedState ? icons.bookmarkred : icons.bookmark}
            width={100}
            height={100}
            className="w-8 h-8 opacity-80"
            alt="bookmark"
          />
        </button>
      </div>
      <p className="text-white font-semibold w-full opacity-80">
        {localLikesCount} likes
      </p>
      <div>
        <DialogComponent prompt={prompt} />
      </div>
    </div>
  );
};

export default PromptCard;
