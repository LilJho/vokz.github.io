"use client"

import React, { useState } from 'react'
import PersonalInformation from './FormSections/PersonalInformation'
import usePostForm from '@/hooks/usePostForm';
import { ToastTypes } from '@/lib/types';
import { PatientSchema } from '@/lib/validations/patient';
import * as z from "zod";
import { Form } from '@/components/ui/FormControls/form';
import { Button } from '@/components/ui/button';
import MedicalHistory from './FormSections/MedicalHistory';
import WellnessInfo from './FormSections/WellnessInfo';
import PSQI from './FormSections/PSQI';

const PatientForm = () => {
    const defaultValues = {
        first_name: "",
        middle_name: "",
        last_name: "",
        date_of_birth: "",
        gender: "",
        city: "",
        email: "",
        mailing_address: "",
        contact_number: "",
        alt_contact_number: "",
        race: "Asian",
        relationship_status: "",
        currennt_address: "",
        currently_living_with: "",
        children: [{
            first_name: "",
            last_name: "",
            age: "",
        }],
        grandchildren: [
            {
                first_name: "",
                last_name: "",
                age: "",
            }
        ],
        occupation: "",
        work_hours_per_week: "",
        allergies: [
            {
                cause: "",
                reaction: "",
            }
        ],
        prescription_medication: [
            {
                medication_name: "",
                dosage: "",
                purpose: "",
                start_date: "",
                remarks: ""
            }
        ],
        over_the_counter_medication: [
            {
                medication_name: "",
                dosage: "",
                purpose: "",
                start_date: "",
                remarks: ""
            }
        ],
        menses_began_at_age: "",
        post_menopausal_last_period: "",
        first_child_birth: "",
        number_of_pregnancies: "",
        miscarraiges: "",
        health_conditions: [" "],
        surgeries: [{
            procedure: "",
            date: "",
        }],
        vaccinations: [{
            vaccine: "",
            status: ""
        }]
    };

    const handleFormSubmit = async (values: z.infer<typeof PatientSchema>) => {
        console.log({ values })
    }

    const { onSubmit, isLoading, formMethods } = usePostForm({
        handleFormSubmit,
        queryKey: ["patients-record"],
        successMessage,
        errorMessage,
        schema: PatientSchema,
        defaultValues
    })

    const [formSteps, setFormSteps] = useState(0)

    const handlePrevPage = () => {
        setFormSteps(prev => prev - 1)
    }

    const handleNextPage = () => {
        setFormSteps(prev => prev + 1)
    }


    const formsPage: formSteps = {
        0: <PersonalInformation form={formMethods} />,
        1: <MedicalHistory form={formMethods} />,
        2: <WellnessInfo />,
        3: <PSQI />
    }

    return (
        <div className='border rounded-lg bg-white w-full max-w-[1400px] mx-auto'>
            <div className='flex p-4 overflow-x-auto form-wizard border-b'>
                {header.map((item, index) => {
                    return (
                        <>
                            <FormTitle key={index} title={item.title} details={item.details} number={index + 1} active={index === formSteps} />
                            <FormLine />
                        </>
                    )
                })}
            </div>
            <div className="px-6 py-4">
                <Form {...formMethods}>
                    {formsPage[formSteps]}
                </Form>
                <div className='flex gap-4 mt-6'>
                    {formSteps > 0 && <Button color={header.length - 2 ? "gray" : "default"} onClick={handlePrevPage}>Previous</Button>}
                    {formSteps < header.length - 1 && <Button onClick={handleNextPage}>Next</Button>}
                    {formSteps === header.length - 1 && <Button>Add New Patient</Button>}
                </div>
            </div>
        </div>
    )
}

export default PatientForm

type formSteps = {
    [key: number]: JSX.Element
}

const header = [
    {
        title: 'Personal Information',
        details: 'Enter the patient’s personal information',
    },
    {
        title: 'Medical History',
        details: 'Enter the patient’s medical history',
    },
    {
        title: "Wellness Information",
        details: "Enter the patient’s wellness information",
    },
    {
        title: "PSQI",
        details: "PITTSBURG Sleep Quality Index",
    }
]

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


interface FormTitleProps {
    title: string
    details: string
    number: number
    active?: boolean
}

const FormTitle = ({ title, details, number, active = false }: FormTitleProps) => {
    return (
        <div className='flex gap-4 items-center py-1'>
            <div className={`w-11 h-11 rounded-full ${active ? "bg-primary-500 text-white" : "bg-gray-200"} flex items-center justify-center base`}>
                {number}
            </div>
            <div className='flex-1'>
                <h5 className='text-base font-semibold leading-5 whitespace-nowrap'>{title}</h5>
                <p className='text-sm font-normal min-w-[140px] text-gray-600'>{details}</p>
            </div>
        </div>
    )
}

const FormLine = () => (
    <div className='h-[1px] w-full bg-gray-200 flex-1 min-w-[200px] my-auto last-of-type:hidden'></div>
)