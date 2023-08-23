"use client"

import { formDefaultData } from '@/config/formData';
import usePostForm from '@/hooks/usePostForm';
import { PatientInformationType, ToastTypes } from '@/lib/types';
import { PatientSchema } from '@/lib/validations/patient';
import * as z from "zod";
import PatientForm from './PatientForm';
import { cleanData } from '@/helper/cleanData';
import { PatientsInformationService } from '@/services/databaseServices';

interface IEditPatientForm {
    isPatient?: boolean
    defaultValue: PatientInformationType
}

const EditPatientForm = ({ isPatient, defaultValue }: IEditPatientForm) => {
    const formattedDefaultValue = {
        ...defaultValue,
        contact_number: parseInt(defaultValue.contact_number),
        alt_contact_number: parseInt(defaultValue.alt_contact_number!)
    }

    const defaultValues = formattedDefaultValue ?? formDefaultData;

    async function handleFormSubmit(values: z.infer<typeof PatientSchema>) {
        const processedData = cleanData(values)
        const updatedData = {
            ...processedData,
            contact_number: (defaultValue.contact_number).toString(),
            alt_contact_number: (defaultValue.alt_contact_number!).toString()
        }
        const res = await PatientsInformationService.update({
            id: defaultValue.id!,
            columnName: "id",
            update: updatedData,
        })
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
            type="edit"
            isPatient={isPatient}
        />
    )
}

export default EditPatientForm

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
