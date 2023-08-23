"use client"

import { formDefaultData } from '@/config/formData';
import usePostForm from '@/hooks/usePostForm';
import { ToastTypes } from '@/lib/types';
import { PatientSchema } from '@/lib/validations/patient';
import * as z from "zod";
import PatientForm from './PatientForm';
import { cleanData } from '@/helper/cleanData';
import { PatientsInformationService } from '@/services/databaseServices';

const AddPatientForm = () => {
    const defaultValues = formDefaultData;

    async function handleFormSubmit(values: z.infer<typeof PatientSchema>) {
        const processedData = cleanData(values)
        await PatientsInformationService.create(processedData)
    }

    const { onSubmit, isLoading, formMethods } = usePostForm({
        handleFormSubmit,
        queryKey: ["patients-record"],
        successMessage,
        errorMessage,
        schema: PatientSchema,
        defaultValues
    })

    return (
        <PatientForm
            handleSubmit={formMethods.handleSubmit(onSubmit)}
            isLoading={isLoading}
            form={formMethods}
        />
    )
}

export default AddPatientForm

const successMessage: ToastTypes = {
    title: "New Patient Added",
    description: "New Patient has been added successfully",
    variant: "success"
}

const errorMessage: ToastTypes = {
    title: "Submission Failed",
    description: "Something went wrong. Please try again!",
    variant: "destructive"
}
