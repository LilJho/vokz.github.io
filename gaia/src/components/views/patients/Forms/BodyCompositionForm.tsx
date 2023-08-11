"use client"

import React, { useState } from 'react'
import RecordForm from './RecordForm'
import { CropRegionsType } from '@/lib/types'
import { getSleepHours } from '@/helper/getSleepHours'
import { v4 as uuidv4 } from 'uuid';
import { processAndExtract } from '@/helper/tesseractExtract'

const BodyCompositionForm = () => {
    const [selectedFile, setSelectedFile] = useState({
        fileName: "",
        file: "",
    })

    const handleSubmit = async () => {
        // const processedData = await processAndExtract({ getStructuredData: getDashboardReportData, regions: dailyMedicalReportRegion, image: selectedFile.file })
    }

    return (
        <RecordForm
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            handleSubmit={handleSubmit}
            title="Body Composition Form"
            description="Kindly submit your daily health log. Ensure the image is clear and the text can be easily read." />
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
    { x: 198, y: 2715, width: 379, height: 162, },//FatFreeValue
    { x: 203, y: 2962, width: 379, height: 162 },//SubcutaneousFatValue
    { x: 859, y: 3017, width: 379, height: 162 },//SubcutaneousFatStatus
    { x: 200, y: 3229, width: 379, height: 162 },//VisceralFatValue
    { x: 848, y: 3277, width: 379, height: 162 },//VisceralFatStatus
    { x: 201, y: 3492, width: 379, height: 162 },//BodyWaterValue
    { x: 855, y: 3543, width: 379, height: 162 },//BodyWaterStatus
    { x: 202, y: 3765, width: 379, height: 162 },//BoneMassValue
    { x: 816, y: 3787, width: 379, height: 162 },//BoneMassStatus 
    { x: 200, y: 4029, width: 379, height: 117 },//heartRateValue
    { x: 813, y: 4072, width: 379, height: 117 },//heartRateStatus
    { x: 198, y: 4294, width: 379, height: 117 },//cardiacIndexValue
    { x: 811, y: 4331, width: 379, height: 117 },//cardiacIndexStatus
    { x: 199, y: 4558, width: 379, height: 117 },//metabolicAgeValue
]