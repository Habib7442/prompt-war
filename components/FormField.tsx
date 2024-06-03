"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";

import icons from "../constants/icons";
type FormFieldProps = {
  title: string;
  value: string;
  handleChangeText: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  otherStyles?: string;
};

const FormField = ({
  title,
  value,
  handleChangeText,
  placeholder,
  type,
  otherStyles,
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={`space-y-2 ${otherStyles}`}>
      <h1 className="text-base text-gray-200 font-pmedium">{title}</h1>
      <div className="border w-full h-16 flex bg-slate-800 rounded-xl  items-center flex-row">
        <Input
          className="text-white text-base font-psemibold w-full h-full flex-1 rounded-xl bg-transparent outline-none border-none"
          value={value}
          placeholder={placeholder}
          onChange={handleChangeText}
          type={title === "Password" && !showPassword ? "password" : "text"}
        />
        {title === "Password" && (
          <Button onClick={() => setShowPassword(!showPassword)}>
            <Image
              src={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              alt="icon"
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default FormField;
