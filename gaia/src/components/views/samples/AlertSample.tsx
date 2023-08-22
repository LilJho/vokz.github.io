"use client";
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { PiConfettiLight } from "react-icons/pi";
import { MdOutlineCancel, MdOutlineCancelPresentation } from "react-icons/md";
import { BsBookmarkHeart, BsForward } from "react-icons/bs";
import { AiFillCheckCircle, AiFillWarning } from "react-icons/ai";
import { PiWarningDiamondDuotone } from "react-icons/pi";

const data = [
  {
    variant: "default",
    title: "Ako ay Pogi",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optioiusto tenetur consequatur, atque id eligendi.",
  },
  {
    variant: "secondary",
    title: "Ako ay Pogi",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optioiusto tenetur consequatur, atque id eligendi.",
  },
  {
    variant: "tertiary",
    title: "Ako ay Pogi",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optioiusto tenetur consequatur, atque id eligendi.",
  },
  {
    variant: "quarternary",
    title: "Ako ay Pogi",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optioiusto tenetur consequatur, atque id eligendi.",
  },
  {
    variant: "quinary",
    title: "Ako ay Pogi",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optioiusto tenetur consequatur, atque id eligendi.",
  },
  {
    variant: "senary",
    title: "Ako ay Pogi",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optioiusto tenetur consequatur, atque id eligendi.",
  },
  {
    variant: "destructive",
    title: "Ako ay Pogi",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optioiusto tenetur consequatur, atque id eligendi.",
  },
];

const AlertSample = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1>ALERTS</h1>
      {data.map((val, index) => (
        <Alert key={index} variant={val.variant as any}>
          <div className="flex items-center justify-between ">
            <div className="flex items-center justify-center gap-2">
              {icon[val.variant]}
              <div>
                <AlertTitle>{val.title}</AlertTitle>
                <AlertDescription>{val.description}</AlertDescription>
              </div>
            </div>
            <MdOutlineCancel />
          </div>
        </Alert>
      ))}
    </div>
  );
};

const icon: any = {
  default: <PiConfettiLight classname="w-10 h-10" />,
  secondary: <BsBookmarkHeart classname="w-10 h-10" />,
  tertiary: <BsForward classname="w-10 h-10" />,
  quarternary: <AiFillCheckCircle classname="w-10 h-10" />,
  quinary: <MdOutlineCancelPresentation classname="w-10 h-10" />,
  senary: <AiFillWarning classname="w-10 h-10" />,
  destructive: <PiWarningDiamondDuotone classname="w-10 h-10" />,
};

export default AlertSample;
