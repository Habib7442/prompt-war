"use client"
import TestimonialForm from "@/components/TestimonialForm";
import { getCurrentUser } from "@/lib/appwrite";
import { useEffect, useState } from "react";

const TestimonialsForm = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setUserId(user.$id);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="w-full h-screen bg-black">
      {userId && <TestimonialForm userId={userId} />}
    </div>
  );
};

export default TestimonialsForm;
