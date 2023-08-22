"use client"

import React, { Fragment, useState } from 'react'
import PersonalInformation from './FormSections/PersonalInformation'
import usePostForm from '@/hooks/usePostForm';
import { ToastTypes } from '@/lib/types';
import { PatientSchema } from '@/lib/validations/patient';
import * as z from "zod";
import { Form } from '@/components/ui/FormControls/form';
import { Button } from '@/components/ui/button';
import MedicalHistory from './FormSections/MedicalHistory';
import WellnessInfo from './FormSections/WellnessInfo';
import { PatientsInformationService } from '@/services/databaseServices';
import { toast } from '@/components/ui/use-toast';

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
        current_address: "",
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
        women_data: {
            menses_began_at_age: "",
            post_menopausal_last_period: "",
            first_child_birth: "",
            number_of_pregnancies: "",
            miscarraiges: "",
        },
        health_conditions: [" "],
        surgeries: [{
            procedure: "",
            date: "",
        }],
        vaccinations: [{
            vaccine: "",
            status: ""
        }],
        family_history: {
            cancerIllness: [{
                family_member: "",
                maternal_paternal: ""
            }],
            dementiaIllness: [{
                family_member: "",
                maternal_paternal: ""
            }],
            diabetesIllness: [{
                family_member: "",
                maternal_paternal: ""
            }],
            highBloodPressureIllness: [{
                family_member: "",
                maternal_paternal: ""
            }]
        },
        marital_status: "",
        is_using_tobacco: "",
        is_using_tobacco_in_past: "",
        tobacco_product_type: "",
        years_of_using_tobacco: "",
        year_of_tobacco_cessation: "",
        drinking_alcohol: "",
        alcohol_consumption_frequency: "",
        is_using_recreational_drugs: "",
        recreational_drug_type: "",
        recreational_drug_usage_frequency: "",
        additional_comment: "",
        nutrition_problem: "",
        reason_for_participating: "",
        motivation_survey: {
            survey_Questions: [
                {
                    question: "I know what mindfulness is and I practice it regularly.",
                    rating_answer: ""
                },
                {
                    question: "I have quite time at least once a day (e.g. meditation, prayer).",
                    rating_answer: ""
                },
                {
                    question: "I believe in higher power (e.g. God).",
                    rating_answer: ""
                },
                {
                    question: "I have effective coping mechanism for dealing with stress",
                    rating_answer: ""
                },
                {
                    question: "I respond to setbacks or failure with a growth mindset.",
                    rating_answer: ""
                },
                {
                    question: "I make sure that I have self-care practices on a regular basis.",
                    rating_answer: ""
                },
                {
                    question: "I follow and do a progressive exercise program",
                    rating_answer: ""
                },
                {
                    question: "I have the energy to do the things I want even after a day's work",
                    rating_answer: ""
                },
                {
                    question: "I feel connected to the important people in my life.",
                    rating_answer: ""
                },
                {
                    question: "I manage my time and have laser-focus priority areas",
                    rating_answer: ""
                },
                {
                    question: "I feel I am consistently growing personally and professionally.",
                    rating_answer: ""
                },
                {
                    question: "I have a clear vision of the life I want to live for the rest of my days",
                    rating_answer: ""
                }
            ],
            additional_comment: ""
        },
        pittsburge_sleep_quality_index: [
            {
                question: "During the past month, what time have you usually gone to bed at night?",
                rating_answer: ""
            },
            {
                question: "During the past month, how long (in minutes) has it usually taken you to fall asleep each night?",
                rating_answer: ""
            },
            {
                question: "During the past month, what time have you usually gotten up in the morning?",
                rating_answer: ""
            },
            {
                question: "During the past month, how many hours of actual sleep did you get at night? (This may be different than the number of hours you spent in bed)",
                rating_answer: ""
            },
            {
                question: "Cannot get to sleep with 30 minutes.",
                rating_answer: ""
            },
            {
                question: "Wake up in the middle of the night or early morning.",
                rating_answer: ""
            },
            {
                question: "Have to get up to use the bathroom.",
                rating_answer: ""
            },
            {
                question: "Cannot breathe comfortably.",
                rating_answer: ""
            },
            {
                question: "Cough or snore loudly.",
                rating_answer: ""
            },
            {
                question: "Feel too cold.",
                rating_answer: ""
            },
            {
                question: "Feel too hot.",
                rating_answer: ""
            },
            {
                question: "Have bad dreams.",
                rating_answer: ""
            },
            {
                question: "Have pain.",
                rating_answer: ""
            },
            {
                question: "",
                rating_answer: ""
            },
            {
                question: "During the past month, how often have you taken medicine to help you sleep (prescribed or &quot;over the counter&quot;)?",
                rating_answer: ""
            },
            {
                question: "During the past month, how often have you had trouble staying awake while driving, eating meals, or engaging in social activity?",
                rating_answer: ""
            }, {
                question: "During the past month, how much of a problem has it been for you to keep up enthusiasm to get things done?",
                rating_answer: ""
            },
            {
                question: "During the past month, how would you rate your sleep quality overall?",
                rating_answer: ""
            },
            {
                question: "Do you have a bed parter or room mate?",
                rating_answer: ""
            },
            {
                question: "Loud snoring",
                rating_answer: ""
            },
            {
                question: "Long pauses in breathing while asleep",
                rating_answer: ""
            },
            {
                question: "Episodes of disorientation or confusion during the night",
                rating_answer: ""
            },
            {
                question: "",
                rating_answer: ""
            }
        ],
        status: "unauthorized"
    };

    const { onSubmit, isLoading, formMethods } = usePostForm({
        handleFormSubmit,
        queryKey: ["patients-record"],
        successMessage,
        errorMessage,
        schema: PatientSchema,
        defaultValues
    })

    async function handleFormSubmit(values: z.infer<typeof PatientSchema>) {
        // const res = await PatientsInformationService.create(values)
    }

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
        2: <WellnessInfo form={formMethods} />,
    }

    return (
        <div className='border rounded-lg bg-white w-full max-w-[1400px] mx-auto'>
            <div className='flex py-4 px-6 overflow-x-auto form-wizard border-b'>
                {header.map((item, index) => {
                    return (
                        <Fragment key={index}>
                            <FormTitle title={item.title} details={item.details} number={index + 1} active={index === formSteps} />
                            <FormLine />
                        </Fragment>
                    )
                })}
            </div>
            <div className="px-3.5 md:px-6 py-4">
                <Form {...formMethods}>
                    {formsPage[formSteps]}
                </Form>
                <div className='flex gap-4 mt-14 mb-6'>
                    {formSteps > 0 && <Button color={header.length - 2 ? "gray" : "default"} onClick={handlePrevPage}>Previous</Button>}
                    {formSteps < header.length - 1 && <Button onClick={handleNextPage}>Next</Button>}
                    {formSteps === header.length - 1 && <Button onClick={formMethods.handleSubmit(onSubmit)}>Add New Patient</Button>}
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
        title: "Wellness Information & PSQI",
        details: "Enter the patient’s wellness information",
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