"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { resetPassword } from "@/lib/appwrite";
import { toast } from "sonner";

const ResetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");

  console.log(userId, "userId");
  console.log(secret, "secret");

  const handleResetPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (typeof userId === "string" && typeof secret === "string") {
        await resetPassword(userId, secret, newPassword, confirmPassword);
        toast("Password reset successful");

        router.push("/sign-in");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-900 flex">
      <div className="w-1/2">{/* Add your image here */}</div>
      <form
        onSubmit={handleResetPassword}
        className="w-1/2 h-screen flex flex-col items-center justify-center text-white"
      >
        <h3 className="text-2xl mb-4">Reset Password</h3>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          required
          className="w-full p-2 border border-gray-300 rounded mb-4 bg-white text-black"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
          className="w-full p-2 border border-gray-300 rounded mb-4 bg-white text-black"
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
