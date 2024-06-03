"use client";
import { getTestimonials } from "@/lib/appwrite";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

const TestimonialList: React.FC = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const testimonials = await getTestimonials();
        setTestimonials(testimonials);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchTestimonials();
  }, []);


  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-8 px-4">
      <h3 className="text-4xl font-bold mb-8 text-gray-400">Testimonials</h3>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {testimonials.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.$id}
              className="bg-slate-900 p-6 rounded-lg shadow-md flex flex-col items-center"
            >
              <h2 className="text-gray-400 font-bold text-xl">{testimonial?.username}</h2>
              <p className="text-yellow-400 text-lg mb-2">
                {"★".repeat(testimonial.rating)}
              </p>
              <p className="mb-4 text-center">{testimonial.review}</p>
              {testimonial.imageurl && (
                <div className="w-[50px] h-[50px] border border-red-400 rounded-full overflow-hidden mb-4">
                  <Image
                    src={testimonial.imageurl}
                    width={100}
                    height={100}
                    alt="User image"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        
        <Loader className="w-10 h-10 animate-spin" />
      )}
    </div>
  );
};

export default TestimonialList;
