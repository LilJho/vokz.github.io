"use client"

import * as z from "zod";
import { BloodPressureSchema } from '@/lib/validations/bloodPressure'

import { ToastTypes } from '@/lib/types'
import { catchError } from '@/lib/utils'
import useSubmitForm from '@/hooks/useSubmitForm';
import userStore from '@/lib/store/userStore'
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/FormControls/form";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/FormControls/TextField";
import { DateField } from "@/components/ui/FormControls/DateField";
import dayjs from "dayjs";
import SubmissionState from "@/components/ui/SubmissionState";

const BloodPressureForm = () => {
    const user = userStore((state) => state.user)

    const defaultValues = {
        blood_pressure: "",
        date_of_submission: dayjs().format("YYYY-MM-DD"),
        measurement_unit: "mmHg",
        uploader_id: user?.id,
        uploader_name: `${user?.first_name} ${user?.last_name}`
    }

    const handleFormSubmit = async (values: z.infer<typeof BloodPressureSchema>) => {
        try {

        } catch (error) {
            catchError(error);
        }
    };

    const { onSubmit, isLoading, formMethods } = useSubmitForm({
        handleFormSubmit,
        queryKey: ["blood-pressure-report"],
        successMessage,
        errorMessage,
        schema: BloodPressureSchema,
        defaultValues
    })

    return (
        <>
            <Form {...formMethods}>
                <div className='mx-auto md:min-w-[300px]'>
                    <h3 className='text-2xl font-bold text-center'>Blood Pressure Form</h3>
                    <p className='max-w-md text-gray-500 mb-6 3xl:mb-10 text-center'>Kindly enter your blood pressure measurement.</p>
                    <div className="flex flex-col gap-4">
                        <FormItem className='flex flex-col max-w-3xl'>
                            <FormLabel required>Blood Pressure Measurement</FormLabel>
                            <FormControl>
                                <TextField placeholder="e.g. 90/60" rightIcon="mmHg" {...formMethods.register("blood_pressure", { required: true })} />
                            </FormControl>
                        </FormItem>
                        <FormItem className='flex flex-col max-w-3xl'>
                            <FormLabel required>Date of submission</FormLabel>
                            <FormControl>
                                <DateField {...formMethods.register("date_of_submission", { required: true })} />
                            </FormControl>
                        </FormItem>
                    </div>
                    <Button className='mt-10 w-full' onClick={formMethods.handleSubmit(onSubmit)}>
                        Submit Form
                    </Button>
                </div>
            </Form>

            {isLoading ?
                <SubmissionState message="Uploading your record" description="This may take a few moments. Please do not close the window or refresh the page." /> : null}
        </>
    )
}

export default BloodPressureForm

const successMessage: ToastTypes = {
    title: "Upload Success",
    description: "Blood Pressure Form Submitted",
    variant: "success"
}

const errorMessage: ToastTypes = {
    title: "Upload Failed",
    description: "Blood Pressure Form Submission Failed",
    variant: "destructive"
}


