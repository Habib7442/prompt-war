"use client";
import Image from "next/image";
import exportObject from "../constants/images";
import CustomButton from "./CustomButton";
import FormField from "./FormField";
import { useState, useRef } from "react";
import { createImage } from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/provider/redux/store";
import { toast } from "sonner";


type FormState = {
  title: string;
  thumbnail: File | null;
  prompt: string | null;
};

const SubmitPromptForm = () => {
  const user = useAppSelector((state) => state.global.user);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<FormState>({
    title: "",
    thumbnail: null,
    prompt: null,
  });
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file instanceof File) {
        setForm((prevForm) => ({ ...prevForm, thumbnail: file }));
      } else {
        console.error("Selected item is not a file");
      }
    } else {
      setForm((prevForm) => ({ ...prevForm, thumbnail: null }));
    }
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setForm((prevForm) => ({ ...prevForm, thumbnail: file }));
  };

  const submit = async () => {
    if (!form.prompt || !form.title || !form.thumbnail) {
      return toast("Please fill in all the fields");
    }

    setUploading(true);

    try {
      await createImage({ ...form, userId: user.$id });
      toast("Post uploaded successfully");
      router.push("/posts");
    } catch (error) {
      if (typeof error === "object" && error !== null && "message" in error) {
        alert(error.message);
      } else {
        toast("An error occurred");
      }
    } finally {
      setForm({ title: "", thumbnail: null, prompt: null });
      setUploading(false);
    }
  };

  return (
    <div className="min-h-full p-2 w-full bg-gray-800 relative text-white flex items-center justify-center">
      <div className="flex flex-col lg:flex-row w-full lg:w-3/4 border border-blue-100 rounded-lg overflow-hidden p-2 h-full">
        <div className="w-full lg:w-1/2 h-64 lg:h-auto">
          <Image
            src={exportObject.images.SubmitFormImage}
            alt="Your Image"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="lg:w-1/2 w-full px-2 z-10 overflow-auto">
          <FormField
            title="Image Title"
            value={form.title}
            placeholder="Give your image a catchy title..."
            handleChangeText={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            otherStyles="mt-10"
          />
          <label className="mt-2">Upload Image</label>
          <div
            className="w-full h-[200px] mt-2 bg-gray-700 flex justify-center items-center border-2 border-dashed border-gray-500 rounded-md"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            {form.thumbnail ? (
              <Image
                src={URL.createObjectURL(form.thumbnail)}
                width={100}
                height={100}
                alt="Thumbnail"
                className="w-full h-full object-contain"
              />
            ) : (
              <p className="text-gray-400">Drop or click to upload image</p>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef}
            />
          </div>
          <FormField
            title="AI Prompt"
            value={form.prompt || ""}
            placeholder="The prompt you used to create image"
            handleChangeText={(e) =>
              setForm({ ...form, prompt: e.target.value })
            }
            otherStyles="mt-7"
          />
          <CustomButton
            title="Submit & Publish"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={uploading}
            variant="secondary"
            textStyles="text-black"
          />
        </div>
      </div>
    </div>
  );
};

export default SubmitPromptForm;
