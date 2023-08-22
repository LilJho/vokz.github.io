"use client"

import * as z from "zod";
import { RecordSchema } from '@/lib/validations/records'
import { v4 as uuidv4 } from 'uuid';
import useExtractText from '@/hooks/useExtractText'

import { DailyActivitiesService,DailyBMIService } from '@/services/databaseServices'

import RecordForm from './RecordForm'
import { CropRegionsType, ToastTypes } from '@/lib/types'
import { catchError } from '@/lib/utils'
import usePostForm from '@/hooks/usePostForm';
import axios from "axios";
import userStore from '@/lib/store/userStore'

const BodyCompositionForm = () => {
    const defaultValues = {
        fileName: "",
        file: "",
    }
    // const { extractTextFromRegions, progress } = useExtractText();
    const user = userStore((state) => state.user)

    const handleFormSubmit = async (values: z.infer<typeof RecordSchema>) => {
        try {
            const formData = new FormData();
            formData.append('record_file', values.file);  // Assuming 'yourFileInput' is your file input element
            formData.append('region_choice', 'bmi');  // values: dashboard, bmi, ring
            formData.append("file_type", "image") // values: image, pdf
            const response = await axios.post('http://127.0.0.1:5000/v1/extract-metrics', formData);

            // const structuredDataArray = result.structured_data;
            // console.log({ result });
            const result = response.data; // Access the response data
             const structuredDataArray = result.structured_data ;
            
            //   console.log("Result:", structuredDataArray[2]); getting structured data key

            const summary_data = [structuredDataArray[0],structuredDataArray[1]];

            const dailyActivities = {
                report_type: "BMI Report",
                summary_data: summary_data,
                patient_id: user?.uuid,
            }

            const activity = await DailyActivitiesService.create(dailyActivities); // insert daily activity report
            const bmiArray = result.structured_data[2] as Array<{
                bmi_keyValue: string;
                bmi_label: string;
                bmi_value: string;
              }>;

            const bmiArrayWithActivityId = bmiArray.map(bmiItem => {
                const updatedDiagnosisItem = {
                    ...bmiItem, // Spread existing diagnosis item
                    activity_id: activity[0].activity_id,
                    patient_id: user?.uuid,
                };
                return updatedDiagnosisItem;
            });

            await DailyBMIService.create(bmiArrayWithActivityId); // insert diagnosis
        } catch (error) {
            catchError(error);
        }
    };

    const { onSubmit, isLoading, formMethods } = usePostForm({
        handleFormSubmit,
        queryKey: ["bmi-report"],
        successMessage,
        errorMessage,
        schema: RecordSchema,
        defaultValues
    })

    return (
        <RecordForm
            handleSubmit={formMethods.handleSubmit(onSubmit)}
            isLoading={isLoading}
            title="Body Composition BMI Form"
            form={formMethods}
            description="Kindly submit your BMI log. Ensure the image is clear and the text can be easily read."
        />

    )
}

export default BodyCompositionForm

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

const bodyCompositionReportRegion: CropRegionsType[] = [
    { x: 113, y: 252, width: 1061, height: 315, unit: "px" },
    { x: 100, y: 589, width: 1061, height: 209, unit: "px" },
    { x: 196, y: 858, width: 403, height: 116, unit: "px" },
    { x: 797, y: 860, width: 403, height: 199, unit: "px" },
    { x: 202, y: 1128, width: 403, height: 109, unit: "px" },
    { x: 788, y: 1119, width: 404, height: 211, unit: "px" },
    { x: 196, y: 1400, width: 404, height: 108, unit: "px" },
    { x: 794, y: 1378, width: 404, height: 220, unit: "px" },
    { x: 190, y: 1650, width: 404, height: 123, unit: "px" },
    { x: 812, y: 1631, width: 391, height: 241, unit: "px" },
    { x: 195, y: 1913, width: 420, height: 122, unit: "px" },
    { x: 780, y: 1896, width: 420, height: 231, unit: "px" },
    { x: 179, y: 2176, width: 420, height: 120, unit: "px" },
    { x: 780, y: 2167, width: 420, height: 227, unit: "px" },
    { x: 198, y: 2438, width: 430, height: 125, unit: "px" },
    { x: 774, y: 2425, width: 430, height: 236, unit: "px" },
    { x: 202, y: 2711, width: 481, height: 112, unit: "px" },
    { x: 769, y: 2686, width: 424, height: 240, unit: "px" },
    { x: 206, y: 2960, width: 554, height: 133, unit: "px" },
    { x: 719, y: 2957, width: 478, height: 239, unit: "px" },
    { x: 205, y: 3238, width: 478, height: 118, unit: "px" },
    { x: 720, y: 3218, width: 478, height: 242, unit: "px" },
    { x: 206, y: 3489, width: 478, height: 130, unit: "px" },
    { x: 721, y: 3478, width: 478, height: 247, unit: "px" },
    { x: 190, y: 3764, width: 478, height: 119, unit: "px" },
    { x: 720, y: 3746, width: 478, height: 234, unit: "px" },
    { x: 199, y: 4033, width: 478, height: 110, unit: "px" },
    { x: 725, y: 4011, width: 478, height: 237, unit: "px" },
    { x: 203, y: 4289, width: 478, height: 125, unit: "px" },
    { x: 728, y: 4275, width: 478, height: 238, unit: "px" },
    { x: 201, y: 4548, width: 478, height: 128, unit: "px" },
    { x: 731, y: 4534, width: 478, height: 239, unit: "px" },
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