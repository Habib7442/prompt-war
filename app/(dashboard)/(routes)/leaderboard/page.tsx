"use client"
import { getAllPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { LoaderIcon } from "lucide-react";

interface Post {
  title: string;
  creator: {
    username: string;
  };
  likes: string[];
  thumbnail: string;
}

const Leaderboard = () => {
  const [sortedPosts, setSortedPosts] = useState<Post[]>([]);
  const { data: posts, isLoading } = useAppwrite(getAllPosts);

  useEffect(() => {
    if (posts) {
      // Sort posts by number of likes in descending order
      const sorted = [...(posts as Post[])].sort(
        (a, b) => b.likes.length - a.likes.length
      );
      setSortedPosts(sorted);
    }
  }, [posts]);

  return (
    <div className="w-full h-screen bg-black flex justify-center p-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Title</TableHead>
            <TableHead className="w-[200px]">Creator</TableHead>
            <TableHead className="w-[200px]">Likes</TableHead>
            <TableHead className="text-center w-[200px]">Image</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow className="w-full h-screen flex justify-center items-center">
              <TableCell colSpan={4} className="text-center">
                <LoaderIcon className="w-10 h-10 text-white mx-auto animate-spin" />
              </TableCell>
            </TableRow>
          ) : (
            sortedPosts.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-white">
                  {item.title}
                </TableCell>
                <TableCell className="font-medium text-white">
                  {item.creator.username}
                </TableCell>
                <TableCell className="font-medium text-white">
                  {item.likes.length}
                </TableCell>
                <TableCell className="text-center">
                  <Image
                    width={100}
                    height={100}
                    src={item.thumbnail}
                    className="w-[50px] h-[50px] mx-auto object-cover"
                    alt="img"
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Leaderboard;
