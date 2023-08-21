import { Textarea } from '@/components/ui/FormControls/TextArea'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/FormControls/form'
import { IPersonalInformation } from '@/lib/types'
import React from 'react'
import AllergyDynamicForm from '../DynamicForms/AllergyDynamic'
import { TextField } from '@/components/ui/FormControls/TextField'
import ArrayDynamicForm from '../DynamicForms/ArrayDynamic'
import SurgeriesDynamicForm from '../DynamicForms/SurgeriesDynamic'
import RadioSelectionGroup from '@/components/ui/FormControls/Selection'
import VaccineDynamicForm from '../DynamicForms/VaccineDynamic'

const MedicalHistory = ({ form }: IPersonalInformation) => {
    return (
        <>
            <h2 className="text-xl font-semibold">Medical Information</h2>
            <p className=''>Fill up all required patient&apos;s medical information</p>

            <h3 className="mt-8 mb-2 text-lg font-semibold">Medical Problems</h3>
            {/* <div className='mt-2 mb-4 h-[2px] bg-gray-200'></div> */}
            <div className='flex flex-col md:grid md:grid-cols-3 gap-y-4 gap-x-8'>
                <FormItem className='col-span-3'>
                    <FormLabel>Reason for Establishing Care - Current/Past Medical Problems</FormLabel>
                    <FormControl>
                        <Textarea rows={6} placeholder='Reason for Establishing Care - Current/Past Medical Problems' {...form.register("first_name")} />
                    </FormControl>
                </FormItem>

                <FormItem className="col-span-3">
                    <FormControl>
                        <AllergyDynamicForm label="Allergy" form={form} />
                    </FormControl>
                </FormItem>
            </div>

            <h3 className="mt-8 mb-2 text-lg font-semibold">Current Medication</h3>
            <div className='flex flex-col md:grid md:grid-cols-3 gap-y-4 gap-x-8'>
                <FormItem className="col-span-3">
                    <FormControl>
                        <AllergyDynamicForm label="Prescription Medications" form={form} />
                    </FormControl>
                </FormItem>
                <FormItem className="col-span-3">
                    <FormControl>
                        <AllergyDynamicForm label="Non-prescription (over-the-counter) Medications" form={form} />
                    </FormControl>
                </FormItem>
            </div>

            <h3 className="mt-8 mb-2 text-lg font-semibold">For Women</h3>
            <div className='flex flex-col md:grid md:grid-cols-6 gap-y-4 gap-x-8'>
                <FormItem className='col-span-3'>
                    <FormLabel>Age when menses began</FormLabel>
                    <FormControl>
                        <TextField placeholder='Age when menses began' {...form.register("first_name", { required: true })} />
                    </FormControl>
                </FormItem>
                <FormItem className='col-span-3'>
                    <FormLabel>If post-menopausal, when was your last period?</FormLabel>
                    <FormControl>
                        <TextField placeholder='Age when menses began' {...form.register("first_name", { required: true })} />
                    </FormControl>
                </FormItem>

                <FormItem className='col-span-2'>
                    <FormLabel>At what age did you have you first child?</FormLabel>
                    <FormControl>
                        <TextField placeholder='Age when menses began' {...form.register("first_name", { required: true })} />
                    </FormControl>
                </FormItem>

                <FormItem className='col-span-2'>
                    <FormLabel>Total number of pregnancies</FormLabel>
                    <FormControl>
                        <TextField placeholder='Age when menses began' {...form.register("first_name", { required: true })} />
                    </FormControl>
                </FormItem>
                <FormItem className='col-span-2'>
                    <FormLabel>Miscarriages?</FormLabel>
                    <FormControl>
                        <TextField placeholder='Age when menses began' {...form.register("first_name", { required: true })} />
                    </FormControl>
                </FormItem>
            </div>

            <h3 className="mt-8 mb-2 text-lg font-semibold">Past Medical History</h3>
            <div className='flex flex-col md:grid md:grid-cols-1 gap-y-4 gap-x-8'>
                <FormItem>
                    <FormControl>
                        <ArrayDynamicForm fieldName='health_conditions' form={form} label="Health Conditions/Concerns" />
                    </FormControl>
                </FormItem>
                <FormItem>
                    <FormControl>
                        <SurgeriesDynamicForm form={form} />
                    </FormControl>
                </FormItem>
                <FormItem>
                    <FormControl>
                        <VaccineDynamicForm form={form} />
                    </FormControl>
                </FormItem>
            </div>

            <h3 className="mt-8 mb-2 text-lg font-semibold">Familiy History</h3>
            <div className='flex flex-col md:grid md:grid-cols-1 gap-y-4 gap-x-8'>
                <FormItem>
                    <FormControl>
                        <ArrayDynamicForm fieldName='health_conditions' form={form} label="Health Conditions/Concerns" />
                    </FormControl>
                </FormItem>
            </div>
        </>
    )
}

export default MedicalHistory