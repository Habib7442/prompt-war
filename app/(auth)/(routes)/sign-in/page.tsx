"use client";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import exportObject from "@/constants/images";
import Image from "next/image";
import Link from "next/link";

import {
  deleteSession,
  getCurrentUser,
  sendPasswordResetEmail,
  signIn,
} from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setIsLogged, setUser } from "@/provider/redux/globalSlice";
import { useAppDispatch } from "@/provider/redux/store";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const SignInPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isForgotPassSubmitting, setIsForgotPassSubmitting] = useState(false);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      toast("Please fill all fields");
    } else {
      setIsSubmitting(true);

      try {
        await signIn(form.email, form.password);

        const result = await getCurrentUser();
        // if (!result.emailVerification) {
        //   // Log out the user if email is not verified
        //   await deleteSession();
        //   toast("Please verify your email first");
        //   return;
        // }
        dispatch(setUser(result));
        dispatch(setIsLogged(true));

        toast("Sign In successful");

        router.push("/");
      } catch (error) {
        toast((error as Error).message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const resetPassword = async () => {
    if (form.email === "") {
      toast("Please fill email");
    } else {
      try {
        setIsForgotPassSubmitting(true);
        await sendPasswordResetEmail(form.email);
        toast("Recovery email has been sent to your email");
      } catch (error) {
        toast((error as Error).message);
      } finally {
        setIsForgotPassSubmitting(false);
      }
    }
  };

  return (
    <div className="w-full h-full flex lg:flex-row flex-col rounded-lg overflow-hidden">
      <div className="left lg:w-1/2 w-full flex justify-center items-center bg-gray-100 p-4">
        <Image
          src={exportObject.images.signIn}
          alt="signup"
          className="max-w-full max-h-full object-cover"
        />
      </div>
      <div className="right lg:w-1/2 w-full bg-[#161622] flex flex-col justify-center items-center p-2">
        <div className="w-full flex justify-center items-center">
          <Image
            src={exportObject.images.logo}
            alt="logo"
            className="w-36 h-36"
          />
        </div>
        <div className="w-full max-w-md px-4">
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            otherStyles="mt-3"
            type="email"
            placeholder="email"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            otherStyles="mt-3"
            placeholder="password"
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7 w-full"
            isLoading={isSubmitting}
            variant="secondary"
            textStyles=""
          />
          <div className="justify-center pt-5 flex flex-row gap-2">
            <h2 className="lg:text-md md:text-md text-sm text-gray-100 font-pregular">
              Don&apos;t have an account?
            </h2>
            <Link href="/sign-up" className="lg:text-md md:text-md text-sm text-teal-300">
              Sign Up
            </Link>
          </div>
            <Button
              className="mt-5 w-full"
              variant="destructive"
              onClick={resetPassword}
            >
              {isForgotPassSubmitting ? "Please wait" : "Forgot Password"}
            </Button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
