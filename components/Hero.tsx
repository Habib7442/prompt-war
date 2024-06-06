"use client";
import { Button } from "./ui/button";
import { ArrowBigRight } from "lucide-react";
import { useAppSelector } from "@/provider/redux/store";
import Image from "next/image";
import Link from "next/link";
import exportObject from "../constants/images";

const Images = (props: any) => {
  return (
    <Image
      src={props.src}
      width={props.width}
      height={props.height}
      alt={props.alt}
      className={props.className}
    />
  );
};

const Hero = () => {
  const isLogged: any = useAppSelector((state) => state.global.isLogged);

  return (
    <main className="w-full h-screen flex flex-col justify-center items-center relative">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${exportObject.images.homeback.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(50%)", // This line dims the background image
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
      {/* Overlay div */}
      <div className="flex flex-col relative z-10">
        <h1 className="text-center text-teal-600 font-mono font-bold lg:text-[80px] md:text-[70px] text-[40px]">
          Prompt⚔️War
        </h1>
        <h4 className="text-center text-gray-300 font-semibold text-[20px]">
          Where Words Clash and Ideas Spark
        </h4>
      </div>
      <div className="mt-4 flex gap-4 relative z-10">
        <a href="https://www.instagram.com/promptwar.dev?utm_source=qr&igsh=MXZvcGF5a2Y2M2lpag%3D%3D" target="blank">
          <Button className="gap-2">
            Follow us on{" "}
            <Images
              src={exportObject.images.Instagram}
              width={20}
              height={20}
              alt="logo"
            />{" "}
          </Button>
        </a>
        <Link href={isLogged ? "/posts" : "/sign-in"}>
          <Button className="gap-2">
            {isLogged ? "Explore" : "Get Started"} <ArrowBigRight />{" "}
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default Hero;
