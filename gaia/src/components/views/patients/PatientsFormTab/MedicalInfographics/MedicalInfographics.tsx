"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import humanBody from "@public/images/green-woman.svg";
import greenbody from "@public/images/greenbody.svg";
import GreenBody from "./GreenBody";
import GridTwo from "./MedicalHistory/GridTwo";
import GridThree from "./MedicalHistory/GridThree";
import GridFour from "./MedicalHistory/GridFour";

const MedicalInfographics = () => {
  return (
    <div className="w-full h-[1000px] flex flex-col justify-start items-center gap-2">
      <div className="relative flex items-center justify-center w-full gap-2">
        <Card className="h-[500px] w-[42%] relative bottom-[-52px]">
          <div className="flex items-center justify-between w-full p-4">
            <div>
              <CardTitle>Medical History</CardTitle>
              <CardDescription>
                List of of your Last Medication Treatment
              </CardDescription>
            </div>
            <Button variant={"default"}>View Details</Button>
          </div>
          <div className="flex items-center justify-center w-full mt-6 ">
            {/* <div className="h-[350px] w-[350px] rounded-full border border-[#58AA45] flex justify-center items-center">
            </div> */}
            {/* <Image
              src={greenbody}
              alt="Green Woman image"
              className="w-[385px]"
            /> */}
            <GreenBody />
          </div>
        </Card>

        <div className="h-[400px] w-[58%]">
          <GridTwo />
        </div>
      </div>
      <div className="relative flex items-center justify-center gap-2">
        <div className="h-[500px] w-[42%]">
          <GridThree />
        </div>

        <div className="h-[600px] w-[58%] relative top-[-52px]">
          <GridFour />
        </div>
      </div>
    </div>
  );
};

export default MedicalInfographics;
