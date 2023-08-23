"use client";

import React, { useEffect, useState } from "react";
import StatusCard from "./StatusCard";
import { BiRun } from "react-icons/bi";
import { FiActivity, FiDroplet, FiThermometer } from "react-icons/fi";
import { DailyDiagnosisService } from '@/services/databaseServices'
import { Swiper, SwiperSlide } from "swiper/react";
import { Controller, Navigation, Pagination } from "swiper/modules";
import userStore from '@/lib/store/userStore';

// Import Swiper styles
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; // Navigation module
import { GrNext, GrPrevious } from "react-icons/gr";

const PatientStatus = () => {
  const user = userStore((state) => state.user);

  const [diagnosisData, setDiagnosisData] = useState<DataItem[]>([]);
  const template = [
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
      chart: "line"
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
        const diagnosis = await DailyDiagnosisService.getWhere(['created_at::date','patient_id'], [new Date().toISOString().split('T')[0], user?.uuid]);

        const sourceData: SourceDataItem[] = diagnosis;

        const updatedData = combineData(sourceData, template);
        setDiagnosisData(updatedData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  interface SourceDataItem {
    report_id: string;
    activity_id: string;
    patient_id: string | null;
    created_at: string;
    diagnosis: string;
    diagnosis_keyValue: string;
    diagnosis_label: string;
    diagnosis_value: string;
    diagnosis_numeric: number | null;
  }

  interface DataItem {
    id: string;
    title: string;
    description: string;
    value: string;
    records: number[];
    icon: JSX.Element;
    backgroundColor: string;
    chart: string;
  }

  function combineData(sourceData: SourceDataItem[], data: DataItem[]): DataItem[] {
    const diagnosisValueMap: { [key: string]: string } = {};

    sourceData.forEach((item) => {
      diagnosisValueMap[item.diagnosis] = item.diagnosis_value;
    });

    // Update the value in each object in the data array
    data.forEach((item) => {
      if (diagnosisValueMap[item.title]) {
        item.value = diagnosisValueMap[item.title];
      }
    });

    return data;
  }

  const [controlledSwiper, setControlledSwiper] = useState<any>(null);

  return (
    <Swiper
      modules={[Controller, Navigation, Pagination]}
      spaceBetween={10}
      slidesPerView={4}
      pagination={{ clickable: true }}
      loop
      controller={{ control: controlledSwiper }}
      className="w-[100%] "
    >
      {diagnosisData?.map((val: any, index: number) => (
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
