"use client"

import React, { useState } from 'react'
import RecordForm from './RecordForm'
import { CropRegionsType } from '@/lib/types'
import { v4 as uuidv4 } from 'uuid';
import useExtractText from '@/hooks/useExtractText';

const BodyCompositionForm = () => {
    const [selectedFile, setSelectedFile] = useState({
        fileName: "",
        file: "",
    })

    const { extractTextFromRegions, progress } = useExtractText()

    const handleSubmit = async () => {
        const data = await extractTextFromRegions({ getStructuredData: getBMIReportData, regions: bodyCompositionReportRegion, image: selectedFile.file })
        console.log({ data })
    }


    return (
        <RecordForm
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            handleSubmit={handleSubmit}
            title="Body Composition Form"
            description="Kindly submit your daily health log. Ensure the image is clear and the text can be easily read."
            progress={progress}
        />

    )
}

export default BodyCompositionForm

const bodyCompositionReportRegion: CropRegionsType[] = [
    { x: 243, y: 276, width: 829, height: 277 },//weight
    { x: 225, y: 600, width: 857, height: 172 },//status
    { x: 200, y: 857, width: 378, height: 113 },//weightValue
    { x: 826, y: 902, width: 378, height: 113 },//weightStatus
    { x: 197, y: 1124, width: 379, height: 162 },//bodyfatValue
    { x: 818, y: 1163, width: 379, height: 162 },//bodyfatStatus
    { x: 197, y: 1384, width: 379, height: 162 },//BMIValue
    { x: 821, y: 1432, width: 379, height: 162 },//BMIStatus
    { x: 188, y: 1657, width: 379, height: 162 },//SkeletalMuscleValue
    { x: 819, y: 1695, width: 379, height: 162 },//SkeletalMuscleStatus
    { x: 205, y: 1914, width: 379, height: 162 },//MuscleMassValue
    { x: 819, y: 1964, width: 379, height: 162 },//MuscleMassStatus
    { x: 202, y: 2178, width: 379, height: 162 },//ProteinValue
    { x: 817, y: 2225, width: 379, height: 162 },//ProteinStatus
    { x: 205, y: 2448, width: 379, height: 162 },//BMRValue
    { x: 788, y: 2490, width: 379, height: 162 },//BMRStatus
    { x: 198, y: 2715, width: 379, height: 162 },//FatFreeValue
    { x: 203, y: 2962, width: 379, height: 162 },//SubcutaneousFatValue
    { x: 859, y: 3017, width: 379, height: 162 },//SubcutaneousFatStatus
    { x: 200, y: 3229, width: 379, height: 162 },//VisceralFatValue
    { x: 848, y: 3277, width: 379, height: 162 },//VisceralFatStatus
    { x: 201, y: 3492, width: 379, height: 162 },//BodyWaterValue
    { x: 855, y: 3543, width: 379, height: 162 },//BodyWaterStatus
    // { x: 202, y: 3765, width: 379, height: 162 },//BoneMassValue
    // { x: 816, y: 3787, width: 379, height: 162 },//BoneMassStatus 
    // { x: 200, y: 4029, width: 379, height: 162 },//heartRateValue
    // { x: 813, y: 4072, width: 379, height: 162 },//heartRateStatus
    // { x: 198, y: 4294, width: 379, height: 162 },//cardiacIndexValue
    // { x: 811, y: 4331, width: 379, height: 162 },//cardiacIndexStatus
    // { x: 199, y: 4558, width: 379, height: 162 },//metabolicAgeValue
]

const getBMIReportData = (data: string[]) => {
    return {
        activity_id: uuidv4(),
        average_weight: data[0],
        status: data[1],
        medical_record: [
            {
                label: "Weight",
                value: data[2],
                status: data[3]
            },
            {
                label: "Body Fat",
                value: data[4],
                status: data[5],
            },
            {
                label: "BMI",
                value: data[6],
                status: data[7],
            },
            {
                label: "Skeletal Muscle",
                value: data[8],
                status: data[9],
            },
            {
                label: "Muscle Mass",
                value: data[10],
                status: data[11],
            },
            {
                label: "Protein",
                value: data[12],
                status: data[13],
            },
            {
                label: "BMR",
                value: data[14],
                status: data[15],
            },
            {
                label: "Fat Free Body Weight",
                value: data[16],
                status: ""
            },
            {
                label: "Subcutaneous Fat",
                value: data[17],
                status: data[18],
            },
            {
                label: "Visceral Fat",
                value: data[19],
                status: data[20],
            },
            {
                label: "Body Water",
                value: data[21],
                status: data[22],
            },
            {
                label: "Bone Mass",
                value: data[23],
                status: data[24],
            },
            {
                label: "Heart Rate",
                value: data[25],
                status: data[26],
            },
            {
                label: "Cardiac Index",
                value: data[27],
                status: data[28],
            },
            {
                label: "Metabolic Age",
                value: data[29],
                status: "",
            }
        ]
    }

}