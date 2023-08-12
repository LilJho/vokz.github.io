"use client"

import * as z from "zod";
import { RecordSchema } from '@/lib/validations/records'
import { v4 as uuidv4 } from 'uuid';
import useExtractText from '@/hooks/useExtractText'

import { DailyActivitiesService } from '@/services/databaseServices'

import RecordForm from './RecordForm'
import { CropRegionsType, ToastTypes } from '@/lib/types'
import { getSleepHours } from '@/helper/getSleepHours'
import { catchError } from '@/lib/utils'
import usePostForm from '@/hooks/usePostForm';

const DailyMedicalForm = () => {
    const defaultValues = {
        fileName: "",
        file: "",
    }

    const { extractTextFromRegions, progress } = useExtractText();

    const handleFormSubmit = async (values: z.infer<typeof RecordSchema>) => {
        try {
            const data = await extractTextFromRegions({
                getStructuredData: getDashboardReportData,
                regions: dailyMedicalReportRegion,
                image: values.file,
            });
            await DailyActivitiesService.create(data);
        } catch (error) {
            catchError(error);
        }
    };

    const { onSubmit, isLoading, formMethods } = usePostForm({
        handleFormSubmit,
        queryKey: ["daily-medical-report"],
        successMessage,
        errorMessage,
        schema: RecordSchema,
        defaultValues
    })

    return (
        <RecordForm
            handleSubmit={formMethods.handleSubmit(onSubmit)}
            isLoading={isLoading}
            title="Daily Medical Record Form"
            form={formMethods}
            description="Kindly submit your daily health log. Ensure the image is clear and the text can be easily read."
            progress={progress}
        />
    )
}

export default DailyMedicalForm


const successMessage: ToastTypes = {
    title: "Upload Success",
    description: "Daily Medical Record Form Submitted",
    variant: "success"
}

const errorMessage: ToastTypes = {
    title: "Upload Failed",
    description: "Daily Medical Record Form Submission Failed",
    variant: "destructive"
}

//Location of text in the image
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

//Format the data to be stored in the database
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