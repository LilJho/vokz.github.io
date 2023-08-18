import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Controller, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";

const SwiperSlider = ({ data }: any) => {
  const [controlledSwiper, setControlledSwiper] = useState<any>(null);
  return (
    <Swiper
      modules={[Controller, Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      loop
      controller={{ control: controlledSwiper }}
      className="w-full md:w-[200px]"
    >
      {data.map((item: any) => (
        <SwiperSlide className="flex items-center justify-center">
          <Image src={item.img} alt={item.name} width={200} height={80} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperSlider;
