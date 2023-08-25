"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const GridTwo = () => {
  return (
    <Card className="flex flex-col items-center justify-center h-full">
      <CardHeader>
        <CardTitle>Current/Past Medical Problems</CardTitle>
      </CardHeader>

      <div className="flex gap-4">
        <Card className="bg-[#58AA45] text-white">
          <CardHeader>
            <CardTitle className="text-base">Mild</CardTitle>
          </CardHeader>
          <CardContent>
            <ol>
              <li>
                <p>Common Cold</p>
              </li>
              <li>
                <p>Seasonal Allergies</p>
              </li>
              <li>
                <p>Mild Skin Rashes</p>
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card className="bg-[#FFA500] text-white">
          <CardHeader>
            <CardTitle className="text-base">Moderate</CardTitle>
          </CardHeader>
          <CardContent>
            <ol>
              <li>
                <p>Influenza(Flu)</p>
              </li>
              <li>
                <p>Pneumonia</p>
              </li>
              <li>
                <p>Asthma</p>
              </li>
              <li>
                <p>Moderate Depression</p>
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card className="bg-[#C70909] text-white">
          <CardHeader>
            <CardTitle className="text-base">Severe</CardTitle>
          </CardHeader>
          <CardContent>
            <ol>
              <li>
                <p>Heart Attack</p>
              </li>
              <li>
                <p>Stroke</p>
              </li>
              <li>
                <p>Advance Cancer</p>
              </li>
              <li>
                <p>Severe Mental Illness</p>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </Card>
  );
};

export default GridTwo;
