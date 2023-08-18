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
import StatusCard from "../views/patients/StatusCard";

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
      className="w-full md:w-[500px]"
    >
      {data?.map((val: any, index: number) => (
        <SwiperSlide className="px-8 py-6">
          <StatusCard
            key={val.id}
            title={val.title}
            description={val.description}
            value={val.value}
            icon={val.icon}
            backgroundColor={val.backgroundColor}
            records={val.records}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperSlider;
