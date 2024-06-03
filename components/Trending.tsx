import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { FreeMode, Pagination } from "swiper/modules";
import Image from "next/image";

const Trending = ({ posts }: any) => {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {posts.map((post, index) => (
          <SwiperSlide key={index}>
            <Image
              width={500}
              height={500}
              quality={100}
              src={post.thumbnail}
              alt="trending"
              className="lg:w-[300px] lg:h-[300px] w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Trending;
