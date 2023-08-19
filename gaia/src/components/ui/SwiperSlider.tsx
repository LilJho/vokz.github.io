import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Controller, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; // Navigation module
import { GrNext, GrPrevious } from "react-icons/gr";

import StatusCard from "../views/patients/StatusCard";

const SwiperSlider = ({ data }: any) => {
  const [controlledSwiper, setControlledSwiper] = useState<any>(null);
  return (
    <Swiper
      modules={[Controller, Navigation, Pagination]}
      spaceBetween={10}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      loop
      controller={{ control: controlledSwiper }}
      className="w-[80%] "
    >
      {data?.map((val: any, index: number) => (
        <SwiperSlide>
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
