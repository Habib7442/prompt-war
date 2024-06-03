"use client";
import { verifyEmail } from "@/lib/appwrite";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const VerifyEmailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");

  useEffect(() => {
    const handleVerifyEmail = async () => {
      try {
        if (typeof userId === "string" && typeof secret === "string") {
          await verifyEmail(userId, secret);
          console.log("Email verification successful");
          toast.success("Email verification successful");
          router.push("/posts");
        }
      } catch (error) {
        console.error("Error verifying email:", error);
      }
    };

    if (userId && secret) {
      handleVerifyEmail();
    }
  }, [userId, secret, router]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 text-center">
        <h1 className="text-2xl font-semibold text-gray-700 mb-4">
          Verifying Email, Please Wait...
        </h1>
        <div className="w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
