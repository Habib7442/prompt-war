"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import { toast } from "sonner";

const SearchInput = ({ initialQuery }: any) => {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery || "");

  const handleSearch = () => {
    if (!query) {
      toast("Please input something to search");
      return;
    }

    const searchPath = `/search/${query}`;
    router.push(searchPath);
  };
  return (
    <div className="w-full h-16 px-4 rounded-2xl items-center flex flex-row space-x-4">
      <Input
        className="text-base mt-0.5 bg-slate-900 text-gray-100 flex-1 font-pregular border-none"
        value={query}
        placeholder="Search for a prompt topic"
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button onClick={handleSearch}>
        <SearchIcon className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default SearchInput;
