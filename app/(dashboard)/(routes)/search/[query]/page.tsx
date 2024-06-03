"use client";
import PromptCard from "@/components/PromptCard";
import SearchInput from "@/components/SearchInput";
import renderSkeletons from "@/components/Skeleton";
import useAppwrite from "@/lib/useAppwrite";
import { searchPosts } from "@/lib/appwrite";

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

const Search = ({ params }: any) => {
  const { query } = params;
  const { data: posts, isLoading } = useAppwrite(() => searchPosts(query));
  return (
    <div className="w-full h-full">
      <div>
        <div className="mt-3 mb-2">
          <SearchInput initialQuery={query} />
        </div>
      </div>
      <div className="w-full h-full bg-black text-white grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 p-4 mt-4">
        {isLoading
          ? renderSkeletons()
          : posts.map((item: Post) => (
              <PromptCard
                key={item.$id}
                promptImage={{
                  ...item,
                  likes: item.likes?.length || 0,
                }}
              />
            ))}
      </div>
    </div>
  );
};

export default Search;
