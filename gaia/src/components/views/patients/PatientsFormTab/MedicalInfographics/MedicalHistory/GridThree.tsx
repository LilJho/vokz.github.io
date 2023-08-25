"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const GridThree = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base">Current Medications</CardTitle>
      </CardHeader>
      <div className="flex items-start justify-center gap-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Prescription</CardTitle>
          </CardHeader>
          <CardContent>
            <ol>
              <li>Pain Medication</li>
              <li>Antibiotics</li>
              <li>Mental Medication</li>
              <li>Anxiety pills</li>
              <li>Birth Control</li>
            </ol>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Non-prescription</CardTitle>
          </CardHeader>
          <CardContent>
            <ol>
              <li>Pain Relievers</li>
              <li>Antacids</li>
              <li>Cough Medications</li>
              <li>Allergy Medications</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </Card>
  );
};

export default GridThree;
