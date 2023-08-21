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
import IllnessDynamicForm from '../DynamicForms/IllnessDynamic'
import SelectField from '@/components/ui/FormControls/SelectField'
import { relationshipData } from '@/config/formData'
import HeadLessComboBox from '@/components/ui/FormControls/HeadLessComboBox'

const MedicalHistory = ({ form }: IPersonalInformation) => {
    const isUsingTobacco = form.watch().is_using_tobacco
    const isUsingTobaccoPast = form.watch().is_using_tobacco_in_past
    const isDrinkingAlcohol = form.watch().drinking_alcohol
    const isUsingRecreational = form.watch().is_using_recreational_drugs
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
                        <IllnessDynamicForm fieldName='cancerIllness' form={form} label="Cancer - Type?" />
                    </FormControl>
                </FormItem>
                <FormItem>
                    <FormControl>
                        <IllnessDynamicForm fieldName='dementiaIllness' form={form} label="Dementia" />
                    </FormControl>
                </FormItem>
                <FormItem>
                    <FormControl>
                        <IllnessDynamicForm fieldName='diabetesIllness' form={form} label="Diabeter - Type?" />
                    </FormControl>
                </FormItem>
                <FormItem>
                    <FormControl>
                        <IllnessDynamicForm fieldName='highBloodPressureIllness' form={form} label="High Blood Pressure" />
                    </FormControl>
                </FormItem>
            </div>

            <h3 className="mt-8 mb-2 text-lg font-semibold">Social History</h3>
            <div className='flex flex-col md:grid md:grid-cols-12 gap-y-4 gap-x-8'>
                <FormItem className='col-span-12'>
                    <FormLabel>Marital Status</FormLabel>
                    <FormControl>
                        <FormField
                            control={form.control}
                            name="martial_status"
                            render={({ field }) => (
                                <FormControl>
                                    <RadioSelectionGroup {...field} data={relationshipData} />
                                </FormControl>
                            )}
                        />
                    </FormControl>
                </FormItem>

                <FormItem className='col-span-3'>
                    <FormLabel>Do you use tobacco products?</FormLabel>
                    <FormControl>
                        <FormField
                            control={form.control}
                            name="is_using_tobacco"
                            render={({ field }) => (
                                <FormControl>
                                    <RadioSelectionGroup {...field} data={["Yes", "No"]} />
                                </FormControl>
                            )}
                        />
                    </FormControl>
                </FormItem>

                <FormItem className='col-span-3'>
                    <FormLabel>Did you use tobacco products in the past?</FormLabel>
                    <FormControl>
                        <FormField
                            control={form.control}
                            name="is_using_tobacco_in_past"
                            render={({ field }) => (
                                <FormControl>
                                    <RadioSelectionGroup {...field} data={["Yes", "No"]} />
                                </FormControl>
                            )}
                        />
                    </FormControl>
                </FormItem>

                {isUsingTobacco === "Yes" && <FormItem className='col-span-3'>
                    <FormLabel>Frequency</FormLabel>
                    <FormControl>
                        <TextField placeholder='Frequency' {...form.register("tobacco_usage_frequency")} />
                    </FormControl>
                </FormItem>}

                {isUsingTobaccoPast === "Yes" && <FormItem className='col-span-6'>
                    <FormLabel>Type of Tobacco Products</FormLabel>
                    <FormControl>
                        <FormField
                            control={form.control}
                            name="tobacco_product_type"
                            render={({ field }) => (
                                <FormControl>
                                    <RadioSelectionGroup {...field} data={["Cigarette", "Vape", "Smokeless", "Chewing Tobacco"]} />
                                </FormControl>
                            )}
                        />
                    </FormControl>
                </FormItem>}
                {isUsingTobaccoPast === "Yes" && <FormItem className='col-span-3'>
                    <FormLabel>Years of using tobacco products?</FormLabel>
                    <FormControl>
                        <TextField placeholder='Years of using tobacco' {...form.register("years_of_using_tobacco")} />
                    </FormControl>
                </FormItem>}
                {isUsingTobaccoPast === "Yes" && <FormItem className='col-span-3'>
                    <FormLabel>When did you quit using tobacco products?</FormLabel>
                    <FormControl>
                        <TextField placeholder='When did you quit using tobacco products?' {...form.register("year_of_tobacco_cessation")} />
                    </FormControl>
                </FormItem>}
            </div>
            <div className='flex my-4 gap-y-4 gap-x-8'>
                <FormItem className='col-span-3'>
                    <FormLabel>Do you drink alcohol?</FormLabel>
                    <FormControl>
                        <FormField
                            control={form.control}
                            name="drinking_alcohol"
                            render={({ field }) => (
                                <FormControl>
                                    <RadioSelectionGroup {...field} data={["Yes", "No"]} />
                                </FormControl>
                            )}
                        />
                    </FormControl>
                </FormItem>

                {isDrinkingAlcohol === "Yes" && <FormItem className='col-span-3'>
                    <FormLabel>How much/frequency?</FormLabel>
                    <FormControl>
                        <TextField placeholder='How much/frequency' {...form.register("alcohol_consumption_frequency")} />
                    </FormControl>
                </FormItem>}
            </div>

            <div className='flex my-4 gap-y-4 gap-x-8'>
                <FormItem className='col-span-3'>
                    <FormLabel>Do you use recreational drug?</FormLabel>
                    <FormControl>
                        <FormField
                            control={form.control}
                            name="is_using_recreational_drugs"
                            render={({ field }) => (
                                <FormControl>
                                    <RadioSelectionGroup {...field} data={["Yes", "No"]} />
                                </FormControl>
                            )}
                        />
                    </FormControl>
                </FormItem>

                {isUsingRecreational === "Yes" && <FormItem className='col-span-3'>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                        <TextField placeholder='Type' {...form.register("recreational_drug_type")} />
                    </FormControl>
                </FormItem>}

                {isUsingRecreational === "Yes" && <FormItem className='col-span-3'>
                    <FormLabel>How much/frequency?</FormLabel>
                    <FormControl>
                        <TextField placeholder='How much/frequency' {...form.register("recreational_drug_usage_frequency")} />
                    </FormControl>
                </FormItem>}
            </div>
            <FormItem className='w-full'>
                <FormLabel>Additional Comments</FormLabel>
                <FormControl>
                    <Textarea placeholder='Additional comments' {...form.register("additional_comment")} />
                </FormControl>
            </FormItem>
        </>
    )
}

export default MedicalHistory