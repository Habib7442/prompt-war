"use client";
import InfoBox from "@/components/InfoBox";
import PromptCard from "@/components/PromptCard";
import icons from "@/constants/icons";
import useAppwrite from "@/lib/useAppwrite";
import Image from "next/image";
import renderSkeletons from "@/components/Skeleton";
import { Button } from "@/components/ui/button";
import {
  getCurrentUser,
  getUserPosts,
  sendVerificationEmail,
  signOut,
} from "@/lib/appwrite";
import {
  setIsLogged,
  setUser,
} from "@/provider/redux/globalSlice";
import { useAppDispatch, useAppSelector } from "@/provider/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { InfoIcon, LoaderCircle, MoveRight } from "lucide-react";
import { toast } from "sonner";

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

type User = {
  avatar: string;
  username: string;
  $id: string;
};

const Profile = () => {
  const user = useAppSelector((state) => state.global.user) as User | null;
  const [loading, setLoading] = useState(false);
  const [isVerification, setIsVerification] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const { data: posts, isLoading } = useAppwrite(() => getUserPosts(user.$id));
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    getCurrentUserInfo();
  }, []);

  const logOut = async () => {
    try {
      setLoading(true);
      await signOut();
      dispatch(setUser(null));
      dispatch(setIsLogged(false));

      router.push("/sign-in");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentUserInfo = async () => {
    try {
      const result = await getCurrentUser();
      setIsEmailVerified(result.emailVerification);
      if (!result.emailVerification) {
        toast("Please verify your email");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyEmail = async () => {
    setIsVerification(true);
    try {
      await sendVerificationEmail();
      toast("Verification email sent. Please check your inbox.");
    } catch (error) {
      toast((error as Error).message);
      console.log(error);
    } finally {
      setIsVerification(false);
    }
  };

  if (loading) {
    return (
      <div
        className={`w-full ${
          posts?.length === 0 ? "h-screen" : "h-full"
        } flex justify-center items-center mt-5`}
      >
        <LoaderCircle className="w-6 h-6 text-teal-300 animate-spin" />
      </div>
    );
  }
  return (
    <div
      className={`w-full ${
        posts?.length === 0 ? "h-screen" : "h-full"
      } flex flex-col justify-center items-center mt-6 mb-12 px-4`}
    >
      <div className="flex space-x-4 mb-10">
        <Button
          className="flex justify-center items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={logOut}
        >
          Logout
          <Image
            width={24}
            height={24}
            src={icons.logout}
            className="w-6 h-6 object-contain"
            alt="logout-icon"
          />
        </Button>
        {!isEmailVerified ? (
          <Button
            className="flex justify-center items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            onClick={verifyEmail}
          >
            {isVerification ? "Please wait" : "Verify Email"}

            <InfoIcon />
          </Button>
        ) : (
          <Button
            className="flex justify-center items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            onClick={verifyEmail}
          >
            Your Email is Verified
          </Button>
        )}
      </div>

      <div className="w-24 h-24 border border-teal-300 rounded-md overflow-hidden">
        <Image
          src={user?.avatar}
          className="w-full h-full object-cover"
          alt="avatar"
          width={96}
          height={96}
        />
      </div>
      <InfoBox
        title={user?.username}
        containerStyles="mt-5 text-center"
        titleStyles="text-lg font-semibold"
        subtitle=""
      />
      <div className="mt-5 flex space-x-10">
        <InfoBox
          title={posts.length || 0}
          subtitle="Posts"
          containerStyles="text-center"
          titleStyles="text-xl font-bold"
        />
        <InfoBox
          title="1.2k"
          subtitle="Followers"
          titleStyles="text-xl font-bold"
          containerStyles="text-center"
        />
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

export default Profile;
