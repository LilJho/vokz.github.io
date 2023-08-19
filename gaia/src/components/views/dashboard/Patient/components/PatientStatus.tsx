"use client";

import React, { useEffect, useState } from "react";
import StatusCard from "./StatusCard";
import { BiRun } from "react-icons/bi";
import { FiActivity, FiDroplet, FiThermometer } from "react-icons/fi";
import { DailyDiagnosisService } from '@/services/databaseServices'
import { Swiper, SwiperSlide } from "swiper/react";
import { Controller, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; // Navigation module
import { GrNext, GrPrevious } from "react-icons/gr";

const PatientStatus = async () => {
  const data = [
    {
      id: "1",
      title: "Pedometer",
      description: "Maximum Steps",
      value: "867",
      records: [38, 40, 72, 71, 99, 56, 44, 56],
      icon: <BiRun className="w-8 h-8" />,
      backgroundColor: "bg-primary-600",
      chart: "area"
    },
    {
      id: "2",
      title: "Heart Rate",
      description: "Latest 01:05 PM",
      value: "73bmp",
      records: [91, 58, 30, 52, 59, 84, 92, 51],
      icon: <FiActivity className="w-8 h-8" />,
      backgroundColor: "bg-danger-600",
      chart: "bar"
    },
    {
      id: "3",
      title: "Blood Glucose",
      description: "Latest",
      value: "92 mg/dL",
      records: [96, 47, 83, 40, 66, 31, 42, 68],
      icon: <FiDroplet className="w-8 h-8" />,
      backgroundColor: "bg-accent-600",
      chart: "bar"
    },
    {
      id: "4",
      title: "Sleep",
      description: "Latest",
      value: "335.4°C",
      records: [96, 54, 55, 45, 77, 90, 87, 59],
      icon: <FiThermometer className="w-8 h-8" />,
      backgroundColor: "bg-warning-600",
      chart: "bar"
    },
    {
      id: "5",
      title: "Blood Pressure",
      description: "Maximum Steps",
      value: "867",
      records: [38, 40, 72, 71, 99, 56, 44, 56],
      icon: <BiRun className="w-8 h-8" />,
      backgroundColor: "bg-primary-600",
      chart: "bar"
    },
    {
      id: "6",
      title: "Blood Oxygen",
      description: "Latest 01:05 PM",
      value: "73bmp",
      records: [91, 58, 30, 52, 59, 84, 92, 51],
      icon: <FiActivity className="w-8 h-8" />,
      backgroundColor: "bg-danger-600",
      chart: "bar"
    },
    {
      id: "7",
      title: "HRV",
      description: "Latest",
      value: "92 mg/dL",
      records: [96, 47, 83, 40, 66, 31, 42, 68],
      icon: <FiDroplet className="w-8 h-8" />,
      backgroundColor: "bg-accent-600",
      chart: "bar"
    },
    {
      id: "8",
      title: "ECG",
      description: "Latest",
      value: "335.4°C",
      records: [96, 54, 55, 45, 77, 90, 87, 59],
      icon: <FiThermometer className="w-8 h-8" />,
      backgroundColor: "bg-warning-600",
      chart: "line"
    },
    {
      id: "9",
      title: "Body Temperature",
      description: "Latest",
      value: "335.4°C",
      records: [96, 54, 55, 45, 77, 90, 87, 59],
      icon: <FiThermometer className="w-8 h-8" />,
      backgroundColor: "bg-warning-600",
      chart: "bar"
    },
  ];

useEffect(() => {
    const fetchData = async () => {
      try {
        const diagnosis = await DailyDiagnosisService.getWhere('created_at', 'now()');
        console.log(diagnosis);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData(); // Call the async function to fetch data when the component loads
  
    // Since we only want to call this once, we don't specify any dependencies array ([]).
  }, []);


  const [controlledSwiper, setControlledSwiper] = useState<any>(null);

  return (
    // <div className="flex flex-col h-full gap-4 bg-white rounded-lg">
    //   <div className="grid grid-cols-1 gap-3 md:grid-cols-2 3xl:grid-cols-3 ">
    //     {data?.map((val, index) => (
    //       <StatusCard
    //         key={val.id}
    //         title={val.title}
    //         description={val.description}
    //         value={val.value}
    //         icon={val.icon}
    //         backgroundColor={val.backgroundColor}
    //         records={val.records}
    //       />
    //     ))}
    //   </div>
    // </div>
    <Swiper
      modules={[Controller, Navigation, Pagination]}
      spaceBetween={10}
      slidesPerView={4}
      pagination={{ clickable: true }}
      loop
      controller={{ control: controlledSwiper }}
      className="w-[100%] "
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
            chart={val.chart}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PatientStatus;
