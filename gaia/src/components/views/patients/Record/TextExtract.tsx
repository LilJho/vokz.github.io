"use client"

import React, { useState } from 'react';
import { mime_types } from '@/lib/utils';
import { Label } from '@/components/ui/FormControls/label';
import Dropzone from '@/components/ui/Dropzone/Dropzone';
import { Button } from '@/components/ui/button';
import { createWorker } from 'tesseract.js';
import { CropRegionsType, DashboardReportDataType } from '@/lib/types';
import { getSleepHours } from '@/helper/getSleepHours';
import { DailyActivitiesService } from '@/services/databaseServices';
import { v4 as uuidv4 } from 'uuid';
import { processAndExtract } from '@/helper/tesseractExtract';

const page = () => {
    const [selectedFile, setSelectedFile] = useState({
        file: "",
        type: ""
    });
    const [progress, setProgress] = useState({
        loading: 0,
        status: ''
    });
    const [loading, setLoading] = useState(false);
    const [ocrResults, setOcrResults] = useState<string[]>([]);

    const getDashboardReportData = (ocrResults: string[]) => {
        return {
            activity_id: uuidv4(),
            total_dailySteps: ocrResults[0],
            total_dalySleep: ocrResults[1],
            diagnosis_dateandtime: new Date(),
            patient_id: "user-1",
            medical_report: [
                {
                    diagnosis: "Pedometer",
                    diagnosis_label: ocrResults[2],
                    diagnosis_value: ocrResults[3],
                    diagnosis_keyValue: "steps"
                },
                {
                    diagnosis: "Sleep",
                    diagnosis_label: getSleepHours(ocrResults[4]),
                    diagnosis_value: ocrResults[4],
                    diagnosis_keyValue: "hours",
                },
                {
                    diagnosis: "Heart Rate",
                    diagnosis_label: ocrResults[5],
                    diagnosis_value: ocrResults[6],
                    diagnosis_keyValue: "bp",
                },
                {
                    diagnosis: "Blood Pressure",
                    diagnosis_label: ocrResults[7],
                    diagnosis_value: ocrResults[8],
                    diagnosis_keyValue: "mmHg",
                },
                {
                    diagnosis: "Blood Oxygen",
                    diagnosis_label: ocrResults[9],
                    diagnosis_value: ocrResults[10],
                    diagnosis_keyValue: "percentage",
                },
                {
                    diagnosis: "HRV",
                    diagnosis_label: ocrResults[11],
                    diagnosis_value: ocrResults[12],
                    diagnosis_keyValue: "",
                },
                {
                    diagnosis: "Body Temperature",
                    diagnosis_label: ocrResults[13],
                    diagnosis_value: ocrResults[14],
                    diagnosis_keyValue: "celcius",
                },
                {
                    diagnosis: "Blood Glucose",
                    diagnosis_label: ocrResults[15],
                    diagnosis_value: ocrResults[16],
                    diagnosis_keyValue: "mg/dL",
                }
            ]
        }
    }


    const handleImageChange = (files: any) => {
        if (files && mime_types.IMAGE_MIME_TYPE.includes(files.type)) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedFile({
                    file: e.target?.result as string,
                    type: "image"
                });
            };
            reader.readAsDataURL(files);
        } else if (files && mime_types.PDF_MIME_TYPE.includes(files.type)) {
            setSelectedFile({
                file: files,
                type: "pdf"
            });
        }
    };

    const handleSubmit = async () => {
        const { extractedText } = await processAndExtract({ getStructuredData: getDashboardReportData as any, image: selectedFile.file, regions: dailyMedicalReportRegion })
        console.log({ extractedText })
    }


    return (
        <div>
            <Label>Upload File</Label>
            <Dropzone className='max-w-md px-8 py-10' onDrop={(file) => handleImageChange(file)} acceptedTypes={[...mime_types.IMAGE_MIME_TYPE, ...mime_types.PDF_MIME_TYPE]} />
            <Button className='mt-4 w-full max-w-md' onClick={handleSubmit}>Extract Text</Button>
            <p className='mt-4 font-medium'>Recognized Text:</p>
            {loading && <div>
                <div className="mb-2">Progress ({progress.loading}%)</div>
                <div className="bg-gray-200 rounded overflow-hidden max-w-sm h-3">
                    <div className="bg-green-600 w-0 h-3" style={{ width: `${progress.loading}%` }}></div>
                </div>
                <span className='capitalize'>{progress.status}</span>
            </div>}
            <div className='mt-4'>
                {ocrResults.map((result, index) => (
                    <div key={index}>
                        <p className='font-medium'>Recognized Text for Region {index + 1}:</p>
                        <p>{result}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default page


const dailyMedicalReportRegion: CropRegionsType[] = [
    { x: 401, y: 516, width: 318, height: 166 },
    { x: 401, y: 757, width: 318, height: 166 },
    { x: 661, y: 1501, width: 397, height: 71 },//MaximumSteps
    { x: 656, y: 1564, width: 397, height: 71 },//MaximumSteps Value
    { x: 665, y: 2075, width: 422, height: 71 },//Sleep
    { x: 779, y: 2610, width: 281, height: 65 },//HeartRate
    { x: 769, y: 2679, width: 281, height: 77 },//HeartRate Value
    { x: 840, y: 3168, width: 212, height: 69 },//BloodPressure
    { x: 709, y: 3228, width: 347, height: 89 },//BloodPressure Value
    { x: 712, y: 3718, width: 347, height: 78 },//BloodOxygen
    { x: 794, y: 3787, width: 262, height: 74 },//BloodOxygen Value
    { x: 704, y: 4277, width: 354, height: 70 },//HRV
    { x: 708, y: 4341, width: 354, height: 70 },//HRV Value
    { x: 871, y: 5385, width: 185, height: 66 },//BodyTemperature
    { x: 852, y: 5445, width: 206, height: 87 },//BodyTemperature Value
    { x: 887, y: 5939, width: 172, height: 68 },//BloodGlucose
    { x: 780, y: 6001, width: 276, height: 88 },//BloodGlucose Value
]