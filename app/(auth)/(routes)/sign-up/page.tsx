"use client";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import exportObject from "@/constants/images";
import Image from "next/image";
import Link from "next/link";
import { createUser, sendVerificationEmail } from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setIsLogged, setUser } from "@/provider/redux/globalSlice";
import { toast } from "sonner";

const SignUpPage = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  const router = useRouter();

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      toast("Please fill all fields");
    } else {
      setIsSubmitting(true);

      try {
        const result = await createUser(
          form.email,
          form.password,
          form.username
        );
        dispatch(setUser(result));
        dispatch(setIsLogged(true));

        router.push("/sign-in");
      } catch (error) {
        toast((error as Error).message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // const verifyEmail = async () => {
  //   setIsVerification(true);
  //   try {
  //     await sendVerificationEmail();
  //     toast("Verification email sent. Please check your inbox.");
  //   } catch (error) {
  //     toast((error as Error).message);
  //     console.log(error);
  //   } finally {
  //     setIsVerification(false);
  //   }
  // };

  return (
    <div className="w-full h-full flex flex-col lg:flex-row rounded-lg overflow-hidden">
  <div className="left lg:w-1/2 w-full bg-gray-400">
    <Image
      src={exportObject.images.signup}
      alt="signup"
      className="w-full h-full object-cover"
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
        title="Username"
        value={form.username}
        handleChangeText={(e) =>
          setForm({ ...form, username: e.target.value })
        }
        placeholder="username"
      />

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
        title="Sign Up"
        handlePress={submit}
        containerStyles="mt-7 w-full"
        isLoading={isSubmitting}
        variant="secondary"
        textStyles=""
      />

      <div className="justify-center pt-5 flex flex-row gap-2">
        <h3 className="text-lg text-gray-100 font-pregular">
          Already have an account?
        </h3>
        <Link
          href="/sign-in"
          className="text-lg text-white font-psemibold"
        >
          Sign In
        </Link>
        {/* <Button
          className="ml-5"
          variant="destructive"
          onClick={verifyEmail}
        >
          {isVerification ? "Please wait" : "Send verification email"}
        </Button> */}
      </div>
    </div>
  </div>
  {/* <SignUp /> */}
</div>

  );
};

export default SignUpPage;
