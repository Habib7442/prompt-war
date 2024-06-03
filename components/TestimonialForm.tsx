import exportObject from "@/constants/images";
import { createTestimonial } from "@/lib/appwrite";
import { useAppSelector } from "@/provider/redux/store";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

type TestimonialFormProps = {
  userId: string;
};
type User = {
  avatar: string;
  username: string;
  $id: string;
};

const TestimonialForm: React.FC<TestimonialFormProps> = ({ userId }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const user = useAppSelector((state) => state.global.user) as User | null;

  const username = user?.username;
  const avatar = user?.avatar;
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImageFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createTestimonial(
        userId,
        review,
        rating,
        imageFile,
        username,
        avatar
      );
      toast("Review submitted successfully");
      setReview("");
      setRating(0);
      setImageFile(null);
      setError(null);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-screen bg-slate-900 flex flex-col lg:flex-row">
      <div className="lg:w-1/2 w-full flex justify-center items-center p-4">
        <Image
          src={exportObject.images.feedback}
          alt="feedback"
          className="lg:max-w-[400px] lg:max-h-[400px] max-w-[200px] max-h-[200px] object-cover"
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="lg:w-1/2 w-full h-full flex flex-col items-center justify-center p-6 text-white bg-slate-900"
      >
        <h3 className="lg:text-3xl text-2xl font-semibold mb-6">
          Submit Your Testimonial
        </h3>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-6 w-full">
          <label className="block mb-2 text-lg">Rating:</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className={`cursor-pointer text-3xl ${
                  star <= rating ? "text-yellow-400" : "text-gray-400"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <div className="mb-6 w-full">
          <label className="block mb-2 text-lg">Review:</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded bg-slate-900 text-teal-500"
            placeholder="Write your review here..."
          />
        </div>
        <div className="mb-6 w-full">
          <label className="block mb-2 text-lg">Upload Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 w-full bg-teal-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          {isSubmitting ? "Please wait" : "Submit Testimonial"}
        </button>
      </form>
    </div>
  );
};

export default TestimonialForm;
