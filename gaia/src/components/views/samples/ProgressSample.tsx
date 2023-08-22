"use client";
import React from "react";
import { Progress } from "@/components/ui/progress";

const barData = [
  {
    barColor: "bg-red-600",
    value: 22,
  },
  {
    barColor: "bg-orange-600",
    value: 33,
  },
  {
    barColor: "bg-green-600",
    value: 44,
  },
  {
    barColor: "bg-blue-600",
    value: 55,
  },
  {
    barColor: "bg-gray-600",
    value: 88,
  },
];
const ProgressSample = () => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-white">
      <h1>PROGRESS BAR</h1>
      {barData.map((bar, index) => (
        <Progress key={index} barColor={bar.barColor} value={bar.value} />
      ))}
    </div>
  );
};

export default ProgressSample;
