"use client"

import React, { Fragment, useState } from 'react'
import PersonalInformation from './FormSections/PersonalInformation'
import { IPersonalInformation } from '@/lib/types';
import { Form } from '@/components/ui/FormControls/form';
import { Button } from '@/components/ui/button';
import MedicalHistory from './FormSections/MedicalHistory';
import WellnessInfo from './FormSections/WellnessInfo';
import { toast } from '@/components/ui/use-toast';

interface PatientFormProps extends IPersonalInformation {
    handleSubmit: () => void
    isLoading: boolean
    type?: "add" | "edit"
    isPatient?: boolean
    readOnly?: boolean
}

const PatientForm = ({ form, handleSubmit, isLoading, type = "add", isPatient = false, readOnly = false }: PatientFormProps) => {
    const scrollToTop = () => {
        window.scrollTo({ top: 100, behavior: 'smooth' }); // Scrolls to the top smoothly
    };

    const [formSteps, setFormSteps] = useState(0)

    const handlePrevPage = () => {
        setFormSteps(prev => prev - 1)
        scrollToTop()
    }

    const handleNextPage = () => {
        setFormSteps(prev => prev + 1)
        scrollToTop()
    }

    const handleErrorToast = () => {
        console.log("form.formState.errors:", form.formState.errors);
        if (form.formState.errors && Object.keys(form.formState.errors).length > 0) {
            toast({
                title: "Submission Failed",
                description: "Please fill up all required field!",
                variant: "destructive",
            })
        }
    }

    const formsPage: formSteps = {
        0: <PersonalInformation readOnly={readOnly} form={form} />,
        1: <MedicalHistory readOnly={readOnly} form={form} />,
        2: <WellnessInfo readOnly={readOnly} form={form} />,
    }

    return (
        <div className='border rounded-lg bg-white w-full mx-auto'>
            <div className='hidden lg:flex py-4 px-6 overflow-x-auto form-wizard border-b'>
                {header.map((item, index) => {
                    return (
                        <Fragment key={index}>
                            <FormTitle title={item.title} details={item.details} number={index + 1} active={index === formSteps} />
                            <FormLine />
                        </Fragment>
                    )
                })}
            </div>
            <Form {...form}>
                <form className="px-6 py-4" onSubmit={handleSubmit}>
                    {formsPage[formSteps]}

                    <div className='flex gap-4 mt-14 mb-6'>
                        {formSteps > 0 && <Button type="button" color={header.length - 2 ? "gray" : "default"} onClick={handlePrevPage}>Previous</Button>}
                        {formSteps < header.length - 1 && <Button type="button" onClick={handleNextPage}>Next</Button>}
                        {!isPatient && !readOnly && formSteps === header.length - 1 && <Button isLoading={isLoading} type={isLoading ? "button" : "submit"} onClick={handleErrorToast}>{type === "add" ? "Add New Patient" : "Update Record"}</Button>}
                    </div>
                </form>
            </Form>
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
        title: "Wellness Information & PSQI",
        details: "Enter the patient’s wellness information",
    }
]



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
    <div className='h-[1px] w-full bg-gray-200 flex-1 min-w-[100px] lg:min-w-[200px] my-auto last-of-type:hidden'></div>
)