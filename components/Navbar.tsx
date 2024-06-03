"use client";
import NavLink from "./NavLinks";
import { usePathname } from "next/navigation";
import { BadgeCheck, BookmarkIcon, HomeIcon, KeyIcon, NotebookPen, PlusIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import exportObject from "@/constants/images";

const Navbar = () => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <div className="fixed left-0 top-0 h-full w-[50px] bg-[#111111] z-50">
      <div className="space-y-4 py-4 flex justify-center items-center flex-col">
        <Link
          href="/"
          className={`w-full justify-start text-white ${
            isActive("/") ? "text-teal-300" : ""
          }`}
        >
          <Image
            src={exportObject.images.logosmall}
            alt="logo"
            className="w-10 h-10 justify-center items-center mx-auto"
          />
        </Link>
        <div className="px-4 py-5">
          <div className="space-y-1">
            <NavLink
              href="/posts"
              icon={<HomeIcon className="mx-auto h-6 w-6" />}
              tooltip="Home"
              isActive={isActive("/posts")}
            />
            <NavLink
              href="/weekly-challenge"
              icon={<KeyIcon className="mx-auto h-6 w-6 mt-10" />}
              tooltip="Weekly Challenge"
              isActive={isActive("/weekly-challenge")}
            />
            <NavLink
              href="/bookmark"
              icon={<BookmarkIcon className="mx-auto h-6 w-6 mt-10" />}
              tooltip="Bookmarks"
              isActive={isActive("/bookmark")}
            />
            <NavLink
              href="/leaderboard"
              icon={<BadgeCheck className="mx-auto h-6 w-6 mt-10" />}
              tooltip="Leaderboard"
              isActive={isActive("/leaderboard")}
            />
            <NavLink
              href="/submitPrompt"
              icon={<PlusIcon className="mx-auto h-6 w-6 mt-10" />}
              tooltip="Submit Prompt"
              isActive={isActive("/submitPrompt")}
            />
            <NavLink
              href="/profile"
              icon={<UserIcon className="mx-auto h-6 w-6 mt-10" />}
              tooltip="Profile"
              isActive={isActive("/profile")}
            />
            <NavLink
              href="/testimonialForm"
              icon={<NotebookPen className="mx-auto h-6 w-6 mt-10" />}
              tooltip="Feedback"
              isActive={isActive("/testimonialForm")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
