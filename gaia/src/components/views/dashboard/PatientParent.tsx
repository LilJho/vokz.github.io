"use client";
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AiOutlineHome } from "react-icons/ai";
import { BsPersonBoundingBox, BsMic } from "react-icons/bs";

import Index from "./Patient/Index";

const tabs = [
  {
    title: "Daily Health Report",
    icon: <AiOutlineHome />,
    value: "Daily",
    content: <Index />,
  },
  {
    title: "Monthly Health Report",
    icon: <BsPersonBoundingBox />,
    value: "Monthly",
    content:
      "expedita aperiam officia, ipsum, inventore quidem aliquam possimus! Ut laboriosam laborum obcaecati! Quas fuga nisi eius quae, consequuntur corporis hic nulla exercitationem natus quasi repellat placeat dolore!",
  },
  {
    title: "Medical Record",
    icon: <BsMic />,
    value: "contact",
    content:
      "sit amet consectetur, adipisicing elit. Excepturi quo corporis tempora recusandae iusto dolorum dolorem esse blanditiis modi veniam ipsa officiis saepe,",
  },
  {
    title: "Nutrition",
    icon: <BsMic />,
    value: "contact",
    content:
      "sit amet consectetur, adipisicing elit. Excepturi quo corporis tempora recusandae iusto dolorum dolorem esse blanditiis modi veniam ipsa officiis saepe,",
  },
  {
    title: "Pain Management, strength and Conditioning",
    icon: <BsMic />,
    value: "contact",
    content:
      "sit amet consectetur, adipisicing elit. Excepturi quo corporis tempora recusandae iusto dolorum dolorem esse blanditiis modi veniam ipsa officiis saepe,",
  },
  {
    title: "Mindfulness",
    icon: <BsMic />,
    value: "contact",
    content:
      "sit amet consectetur, adipisicing elit. Excepturi quo corporis tempora recusandae iusto dolorum dolorem esse blanditiis modi veniam ipsa officiis saepe,",
  },
];

const TabsSample = () => {
  return (
    <div className="grid grid-cols-1">
      <Tabs
        defaultValue="Daily"
        className="p-4 rounded-md border bg-white "
      >
        <TabsList>
          {tabs.map((tab, index) => (
            <TabsTrigger
              key={index}
              className={`flex items-center justify-center gap-1.5 data-[state=active]:bg-green-500 data-[state=active]:text-white rounded`}
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
