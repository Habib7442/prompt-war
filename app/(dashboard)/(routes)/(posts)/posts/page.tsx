"use client";
import PromptCard from "@/components/PromptCard";
import useAppwrite from "@/lib/useAppwrite";
import SearchInput from "@/components/SearchInput";
import renderSkeletons from "@/components/Skeleton";
import PaginationComponent from "@/components/Pagination";

import { getAllPosts, getLatestPosts } from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/provider/redux/store";

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

const Posts = () => {
  const isLogged = useAppSelector((state) => state.global.isLogged);

  const { data: posts, isLoading } = useAppwrite(getAllPosts);


  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  const router = useRouter();

  useEffect(() => {
    if (!isLogged) {
      router.push("/sign-in");
    }
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="w-full h-full">
      <div>
        <SearchInput />
      </div>
      <div className="w-full h-full bg-black text-white grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 p-4 mt-4">
        {isLoading
          ? renderSkeletons()
          : currentPosts.map((item: Post) => (
              <PromptCard
                key={item.$id}
                promptImage={{
                  ...item,
                  likes: item.likes?.length || 0,
                }}
              />
            ))}
      </div>
      <div className="flex w-full mx-auto mb-2">
        <PaginationComponent
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Posts;
