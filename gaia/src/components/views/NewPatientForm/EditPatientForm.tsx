"use client"

import { formDefaultData } from '@/config/formData';
import usePostForm from '@/hooks/useSubmitForm';
import { PatientInformationType, ToastTypes } from '@/lib/types';
import { PatientSchema } from '@/lib/validations/patient';
import * as z from "zod";
import PatientForm from './PatientForm';
import { cleanData } from '@/helper/cleanData';
import { PatientsInformationService } from '@/services/databaseServices';

interface IEditPatientForm {
    isPatient?: boolean
    defaultValue: PatientInformationType
    readOnly?: boolean
}

const EditPatientForm = ({ isPatient, defaultValue, readOnly }: IEditPatientForm) => {
    const defaultValues = defaultValue ?? formDefaultData;

    async function handleFormSubmit(values: z.infer<typeof PatientSchema>) {
        const processedData = cleanData(values)
        const res = await PatientsInformationService.update({
            id: defaultValue.id!,
            columnName: "id",
            update: processedData,
        })
        console.log({ res })
    }

    const { onSubmit, isLoading, formMethods } = usePostForm({
        handleFormSubmit,
        queryKey: ["patients-information"],
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
            type="edit"
            isPatient={isPatient}
            readOnly={isPatient || readOnly}
        />
    )
}

export default EditPatientForm

const successMessage: ToastTypes = {
    title: "Information Updated",
    description: "Patient information has been updated successfully!",
    variant: "success"
}

const errorMessage: ToastTypes = {
    title: "Submission Failed",
    description: "Something went wrong. Please try again!",
    variant: "destructive"
}
