"use client";
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AiOutlineHome } from "react-icons/ai";
import { BsPersonBoundingBox, BsMic } from "react-icons/bs";

const tab = {
  title: "Home",
  icon: <AiOutlineHome />,
  value: "home",
  content:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed eveniet voluptatibus excepturi illum, porro sequi voluptatum.",
};

const tabs = [
  {
    title: "Home",
    icon: <AiOutlineHome />,
    value: "home",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed eveniet voluptatibus excepturi illum, porro sequi voluptatum.",
  },
  {
    title: "Profile",
    icon: <BsPersonBoundingBox />,
    value: "profile",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed eveniet voluptatibus excepturi illum, porro sequi voluptatum.",
  },
  {
    title: "Contact",
    icon: <BsMic />,
    value: "contact",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed eveniet voluptatibus excepturi illum, porro sequi voluptatum.",
  },
];

const TabsSample = () => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Tabs
        defaultValue="home"
        className="w-[400px] p-4 rounded-md border bg-white "
      >
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger
              className={`flex items-center justify-center gap-1.5 data-[state=active]:bg-green-500 data-[state=active]:text-white rounded`}
              value={tab.value}
            >
              {tab.icon}
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent value={tab.value}>{tab.content}</TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TabsSample;
