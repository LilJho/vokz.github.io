"use client";
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs/tabs-modified";
import { AiOutlineHome } from "react-icons/ai";
import { BsPersonBoundingBox, BsMic } from "react-icons/bs";

import Index from "./Patient/Index";
import { TbReportMedical } from "react-icons/tb";
import { RiCalendarCheckFill, RiDraftLine, RiHeartAddFill, RiOpenArmFill, RiPsychotherapyLine, RiUserHeartLine } from "react-icons/ri";
import ViewPDF from "./ViewPDF";

const tabs = [
  {
    title: "Daily Health Report",
    icon: <TbReportMedical className="relative w-5 h-5 mr-2 -top-[1px]" />,
    value: "Daily",
    content: <Index />,
  },
  {
    title: "Monthly Health Report",
    icon: <RiCalendarCheckFill className="relative w-5 h-5 mr-2 -top-[1px]" />,
    value: "Monthly",
    content:
      "expedita aperiam officia, ipsum, inventore quidem aliquam possimus! Ut laboriosam laborum obcaecati! Quas fuga nisi eius quae, consequuntur corporis hic nulla exercitationem natus quasi repellat placeat dolore!",
  },
  {
    title: "Medical Record",
    icon: <RiDraftLine className="relative w-5 h-5 mr-2 -top-[1px]" />,
    value: "medical-record",
    content: <ViewPDF />,
  },
  {
    title: "Nutrition",
    icon: <RiUserHeartLine className="relative w-5 h-5 mr-2 -top-[1px]" />,
    value: "nutrition",
    content:
      "Under construction",
  },
  {
    title: "Pain Management, strength and Conditioning",
    icon: <RiOpenArmFill className="relative w-5 h-5 mr-2 -top-[1px]" />,
    value: "pain",
    content:
      <ViewPDF />,
  },
  {
    title: "Mindfulness",
    icon: <RiPsychotherapyLine className="relative w-5 h-5 mr-2 -top-[1px]" />,
    value: "mind",
    content:
      <ViewPDF />,
  },
];

const TabsSample = () => {
  return (
    <div className="grid grid-cols-1">
      <Tabs
        defaultValue="Daily"
      >
        <TabsList className='mb-4'>
          {tabs.map((tab, index) => (
            <TabsTrigger
              key={index}
              value={tab.value}
            >
              {tab.icon}
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab, index) => (
          <TabsContent key={index} value={tab.value}>{tab.content}</TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TabsSample;
