import Image from "next/image";
import features from "../constants/features";
import exportObject from "@/constants/images";

const Features = () => {
  return (
    <div className="w-full h-full px-4 py-8 bg-black text-gray-300 flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 p-4  rounded-lg shadow-lg">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-400 font-bold text-center mb-6">
          Features
        </h2>
        {features.map((feature) => (
          <div
            key={feature.id}
            className="mb-4 p-4 bg-slate-900 rounded-lg shadow-md"
          >
            <h3 className="text-lg sm:text-xl md:text-2xl text-teal-300 font-semibold mb-2">
              {feature.id}. {feature.title}
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-300">{feature.desc}</p>
          </div>
        ))}
      </div>

      <div className="w-full md:w-1/2 lg:flex md:flex hidden justify-center items-center relative mt-4 md:mt-0">
        <Image
          src={exportObject.images.feature}
          alt="Feature"
          className="w-[450px] h-[450px] object-cover -rotate-3"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
    </div>
  );
};

export default Features;
