"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const GridFour = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Other Information</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center gap-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-base">Family History</CardTitle>
          </CardHeader>
          <CardContent>
            <ol>
              <li>Hemochromatosis</li>
              <li>Cystic Fibrosis</li>
              <li>Huntington's Disease</li>
              <li>Sickle Cell Anemia</li>
              <li>Kidney Disease </li>
              <li> Cardiomyopathy</li>
              <li>Breast Cancer </li>
            </ol>
          </CardContent>
        </Card>
        <Card className="flex flex-col flex-1 gap-4 p-4">
          <div>
            <h4 className="font-bold">Diabetes</h4>
            <ol>
              <li>Type 1 Diabetes</li>
              <li>Secondary Diabetes</li>
            </ol>
          </div>
          <div>
            <h4 className="font-bold">Dementia</h4>
            <ol>
              <li>Alzheimer’s Disease</li>
              <li>Parkinson’s Disease </li>
            </ol>
          </div>
          <div>
            <h4 className="font-bold">Cancer:</h4>
            <ol>
              <li>Lung Cancer </li>
              <li>Breast Cancer </li>
            </ol>
          </div>
        </Card>
        <Card className="flex flex-col flex-1 gap-4 p-4">
          <div>
            <h4 className="font-bold">Social History</h4>
            <ol>
              <li>Marital Status: Married</li>
              <li>Smoke Tobacco: No</li>
              <li>Smoked Tobacco(past): Yes</li>
              <li>Drink Alcohol: Yes</li>
              <li>Use Recreational drugs: No</li>
            </ol>
          </div>
          <div>
            <h4 className="font-bold">Additional Comments:</h4>
            <p>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore”
            </p>
          </div>
        </Card>
      </CardContent>
    </Card>
  );
};

export default GridFour;
