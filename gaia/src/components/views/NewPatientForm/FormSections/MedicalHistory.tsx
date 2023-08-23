import { Textarea } from '@/components/ui/FormControls/TextArea'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/FormControls/form'
import { IPersonalInformation } from '@/lib/types'
import React from 'react'
import { TextField } from '@/components/ui/FormControls/TextField'
import RadioSelectionGroup from '@/components/ui/FormControls/Selection'
import { relationshipData } from '@/config/formData'
import AllergyDynamicForm from '../DynamicForms/AllergyDynamic'
import ArrayDynamicForm from '../DynamicForms/ArrayDynamic'
import SurgeriesDynamicForm from '../DynamicForms/SurgeriesDynamic'
import VaccineDynamicForm from '../DynamicForms/VaccineDynamic'
import IllnessDynamicForm from '../DynamicForms/IllnessDynamic'
import MedicationDynamicForm from '../DynamicForms/MedicationDynamicForm'

const MedicalHistory = ({ form }: IPersonalInformation) => {
    const isUsingTobacco = form.watch().is_using_tobacco
    const isUsingTobaccoPast = form.watch().is_using_tobacco_in_past
    const isDrinkingAlcohol = form.watch().drinking_alcohol
    const isUsingRecreational = form.watch().is_using_recreational_drugs
    return (
        <>
            <div className='my-2'>
                <h2 className="text-xl font-semibold text-center lg:text-left">Medical Information</h2>
                <p className='text-center lg:text-left'>Fill up all required patient&apos;s medical information</p>
            </div>

            <h3 className="mt-8 mb-2 text-lg font-semibold">Medical Problems</h3>
            {/* <div className='mt-2 mb-4 h-[2px] bg-gray-200'></div> */}
            <div className='flex flex-col md:grid md:grid-cols-3 gap-y-5 gap-x-8'>
                <FormItem className='col-span-3'>
                    <FormLabel>Reason for Establishing Care - Current/Past Medical Problems</FormLabel>
                    <FormControl>
                        <Textarea rows={6} placeholder='Reason for Establishing Care - Current/Past Medical Problems' {...form.register("reason_for_care")} />
                    </FormControl>
                </FormItem>

                <FormItem className="col-span-3">
                    <FormControl>
                        <AllergyDynamicForm label="Allergy" form={form} />
                    </FormControl>
                </FormItem>
            </div>

            <h3 className="mt-8 mb-2 text-lg font-semibold">Current Medication</h3>
            <div className='flex flex-col md:grid md:grid-cols-3 gap-y-5 gap-x-8'>
                <FormItem className="col-span-3">
                    <FormControl>
                        <MedicationDynamicForm fieldName='prescription_medication' label="Prescription Medications" form={form} />
                    </FormControl>
                </FormItem>
                <FormItem className="col-span-3">
                    <FormControl>
                        <MedicationDynamicForm fieldName="over_the_counter_medication" label="Non-prescription (over-the-counter) Medications" form={form} />
                    </FormControl>
                </FormItem>
            </div>

            <h3 className="mt-8 mb-2 text-lg font-semibold">For Women</h3>
            <div className='flex flex-col md:grid md:grid-cols-6 gap-y-5 gap-x-8'>
                <FormItem className='col-span-3'>
                    <FormLabel>Age when menses began</FormLabel>
                    <FormControl>
                        <TextField placeholder='Age when menses began' {...form.register("women_data.menses_began_at_age", { required: true })} />
                    </FormControl>
                </FormItem>
                <FormItem className='col-span-3'>
                    <FormLabel>If post-menopausal, when was your last period?</FormLabel>
                    <FormControl>
                        <TextField placeholder='Age when menses began' {...form.register("women_data.post_menopausal_last_period", { required: true })} />
                    </FormControl>
                </FormItem>

                <FormItem className='col-span-2'>
                    <FormLabel>At what age did you have you first child?</FormLabel>
                    <FormControl>
                        <TextField placeholder='Age when menses began' {...form.register("women_data.first_child_birth", { required: true })} />
                    </FormControl>
                </FormItem>

                <FormItem className='col-span-2'>
                    <FormLabel>Total number of pregnancies</FormLabel>
                    <FormControl>
                        <TextField placeholder='Age when menses began' {...form.register("women_data.number_of_pregnancies", { required: true })} />
                    </FormControl>
                </FormItem>
                <FormItem className='col-span-2'>
                    <FormLabel>Miscarriages?</FormLabel>
                    <FormControl>
                        <TextField placeholder='Age when menses began' {...form.register("women_data.miscarraiges", { required: true })} />
                    </FormControl>
                </FormItem>
            </div>

            <h3 className="mt-8 mb-2 text-lg font-semibold">Past Medical History</h3>
            <div className='flex flex-col md:grid md:grid-cols-1 gap-y-5 gap-x-8'>
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
            <div className='flex flex-col md:grid md:grid-cols-1 gap-y-5 gap-x-8'>
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
                        <IllnessDynamicForm fieldName='diabetesIllness' form={form} label="Diabetes - Type?" />
                    </FormControl>
                </FormItem>
                <FormItem>
                    <FormControl>
                        <IllnessDynamicForm fieldName='highBloodPressureIllness' form={form} label="High Blood Pressure" />
                    </FormControl>
                </FormItem>
            </div>

            <h3 className="mt-8 mb-2 text-lg font-semibold">Social History</h3>
            <div className='flex flex-col gap-y-5 gap-x-8'>
                <FormItem className='col-span-12'>
                    <FormLabel required>Marital Status</FormLabel>
                    <FormControl>
                        <FormField
                            control={form.control}
                            name="marital_status"
                            render={({ field }) => (
                                <FormControl>
                                    <RadioSelectionGroup {...field} data={relationshipData} />
                                </FormControl>
                            )}
                        />
                    </FormControl>
                    <FormMessage className='mb-1'>
                        {form.formState.errors.marital_status?.message}
                    </FormMessage>
                </FormItem>

                <div className='flex flex-col md:flex-row gap-4 md:gap-8'>
                    <FormItem className='col-span-3'>
                        <FormLabel required>Do you use tobacco products?</FormLabel>
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
                        <FormMessage className='mb-1'>
                            {form.formState.errors.is_using_tobacco?.message}
                        </FormMessage>
                    </FormItem>

                    <FormItem className='col-span-3'>
                        <FormLabel required>Did you use tobacco products in the past?</FormLabel>
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
                        <FormMessage className='mb-1'>
                            {form.formState.errors.is_using_tobacco_in_past?.message}
                        </FormMessage>
                    </FormItem>

                    {isUsingTobacco === "Yes" && <FormItem className='col-span-3'>
                        <FormLabel>Frequency</FormLabel>
                        <FormControl>
                            <TextField placeholder='Frequency' {...form.register("tobacco_usage_frequency")} />
                        </FormControl>
                    </FormItem>}
                </div>

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
                {isUsingTobaccoPast === "Yes" && <>
                    <div className='flex flex-col md:flex-row gap-4 md:gap-8'>
                        <FormItem className='flex-1'>
                            <FormLabel>Years of using tobacco products?</FormLabel>
                            <FormControl>
                                <TextField placeholder='Years of using tobacco' {...form.register("years_of_using_tobacco")} />
                            </FormControl>
                        </FormItem>
                        <FormItem className='flex-1'>
                            <FormLabel>When did you quit using tobacco products?</FormLabel>
                            <FormControl>
                                <TextField placeholder='When did you quit using tobacco products?' {...form.register("year_of_tobacco_cessation")} />
                            </FormControl>
                        </FormItem>
                    </div>
                </>}
            </div>
            <div className='flex flex-col md:flex-row my-4 gap-y-5 gap-x-8'>
                <FormItem className='col-span-3'>
                    <FormLabel required>Do you drink alcohol?</FormLabel>
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
                    <FormMessage className='mb-1'>
                        {form.formState.errors.drinking_alcohol?.message}
                    </FormMessage>
                </FormItem>

                {isDrinkingAlcohol === "Yes" && <FormItem className='col-span-3'>
                    <FormLabel>How much/frequency?</FormLabel>
                    <FormControl>
                        <TextField placeholder='How much/frequency' {...form.register("alcohol_consumption_frequency")} />
                    </FormControl>
                </FormItem>}
            </div>

            <div className='flex flex-col lg:flex-row my-4 gap-y-5 gap-x-8'>
                <FormItem className='col-span-3'>
                    <FormLabel required>Do you use recreational drug?</FormLabel>
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
                    <FormMessage className='mb-1'>
                        {form.formState.errors.is_using_recreational_drugs?.message}
                    </FormMessage>
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