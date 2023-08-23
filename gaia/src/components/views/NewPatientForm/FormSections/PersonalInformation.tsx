"use client"

import { DateField } from '@/components/ui/FormControls/DateField'
import { NumberField } from '@/components/ui/FormControls/NumberField'
import RadioSelectionGroup from '@/components/ui/FormControls/Selection'
import { TextField } from '@/components/ui/FormControls/TextField'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/FormControls/form'
import React from 'react'
import HeadLessComboBox from '@/components/ui/FormControls/HeadLessComboBox'
import { racesData, relationshipData } from '@/config/formData'
import { IPersonalInformation } from '@/lib/types'
import NameAgeDynamicForm from '../DynamicForms/NameAgeDynamicForm'

interface PersonalInfoExtends extends IPersonalInformation {
    readOnly?: boolean
}

const PersonalInformation = ({ form, readOnly = true }: PersonalInfoExtends) => {
    return (
        <>
            <div className='my-2'>
                <h2 className="text-xl font-semibold text-center lg:text-left">Personal Information</h2>
                <p className='text-center lg:text-left'>Fill up all required patient&apos;s personal information</p>
            </div>

            <h3 className="mt-8 mb-2 text-lg font-semibold">Personal Information</h3>
            <div className='flex flex-col md:grid md:grid-cols-3 gap-y-5 gap-x-8'>
                <FormItem>
                    <FormLabel required>First Name</FormLabel>
                    <FormControl>
                        <TextField readOnly={readOnly} placeholder='First name' {...form.register("first_name", { required: true })} />
                    </FormControl>
                    <FormMessage className='mb-1'>
                        {form.formState.errors.first_name?.message}
                    </FormMessage>
                </FormItem>
                <FormItem>
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                        <TextField readOnly={readOnly} placeholder='Middle name' {...form.register("middle_name")} />
                    </FormControl>
                </FormItem>
                <FormItem>
                    <FormLabel required>Last Name</FormLabel>
                    <FormControl>
                        <TextField readOnly={readOnly} placeholder='Last name' {...form.register("last_name", { required: true })} />
                    </FormControl>
                    <FormMessage className='mb-1'>
                        {form.formState.errors.last_name?.message}
                    </FormMessage>
                </FormItem>


                <FormItem>
                    <FormLabel required>Date of Birth</FormLabel>
                    <FormControl>
                        <DateField readOnly={readOnly}  {...form.register("date_of_birth", { required: true })} />
                    </FormControl>
                    <FormMessage className='mb-1'>
                        {form.formState.errors.date_of_birth?.message}
                    </FormMessage>
                </FormItem>
                <FormItem>
                    <FormLabel required>Mailing Address</FormLabel>
                    <FormControl>
                        <TextField readOnly={readOnly} placeholder='Mailing Address' {...form.register("mailing_address", { required: true })} />
                    </FormControl>
                    <FormMessage className='mb-1'>
                        {form.formState.errors.mailing_address?.message}
                    </FormMessage>
                </FormItem>
                <FormItem>
                    <FormLabel required>City</FormLabel>
                    <FormControl>
                        <TextField readOnly={readOnly} placeholder='City' {...form.register("city", { required: true })} />
                    </FormControl>
                    <FormMessage className='mb-1'>
                        {form.formState.errors.city?.message}
                    </FormMessage>
                </FormItem>

                <FormItem>
                    <FormLabel required>Contact Number</FormLabel>
                    <FormControl>
                        <NumberField
                            readOnly={readOnly}
                            placeholder='0000000000'
                            leftIcon="+63"
                            maxLength={10}
                            {...form.register("contact_number", { required: true })}
                        />
                    </FormControl>
                    <FormMessage className='mb-1'>
                        {form.formState.errors.contact_number?.message}
                    </FormMessage>
                </FormItem>
                <FormItem>
                    <FormLabel>Alternative Contact Number</FormLabel>
                    <FormControl>
                        <NumberField
                            readOnly={readOnly}
                            placeholder='0000000000'
                            leftIcon="+63"
                            maxLength={10}
                            {...form.register("alt_contact_number")}
                        />
                    </FormControl>
                </FormItem>
                <FormItem>
                    <FormLabel required>Gender</FormLabel>
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormControl>
                                <RadioSelectionGroup readOnly={readOnly} {...field} data={["Male", "Female"]} />
                            </FormControl>
                        )}
                    />
                    <FormMessage className='mb-1'>
                        {form.formState.errors.gender?.message}
                    </FormMessage>
                </FormItem>

                <FormItem>
                    <FormLabel required>Email Address</FormLabel>
                    <FormControl>
                        <TextField readOnly={readOnly} placeholder='Email Address' {...form.register("email")} />
                    </FormControl>
                    <FormMessage className='mb-1'>
                        {form.formState.errors.email?.message}
                    </FormMessage>
                </FormItem>
                <FormItem>
                    <FormLabel required>Race</FormLabel>
                    <FormField
                        control={form.control}
                        name="race"
                        render={({ field }) => (
                            <FormControl>
                                <HeadLessComboBox readOnly={readOnly} data={racesData} {...field} />
                            </FormControl>
                        )}
                    />
                    <FormMessage className='mb-1'>
                        {form.formState.errors.race?.message}
                    </FormMessage>
                </FormItem>
                <FormItem>
                    <FormLabel required>Relationship Status</FormLabel>
                    <FormField
                        control={form.control}
                        name="relationship_status"
                        render={({ field }) => (
                            <FormControl>
                                <HeadLessComboBox readOnly={readOnly}  {...field} data={relationshipData} />
                            </FormControl>
                        )}
                    />
                    <FormMessage className='mb-1'>
                        {form.formState.errors.relationship_status?.message}
                    </FormMessage>
                </FormItem>

                <FormItem className='col-span-2'>
                    <FormLabel required>Current Address</FormLabel>
                    <FormControl>
                        <TextField readOnly={readOnly} placeholder='Current Address' {...form.register("current_address")} />
                    </FormControl>
                    <FormMessage className='mb-1'>
                        {form.formState.errors.current_address?.message}
                    </FormMessage>
                </FormItem>
                <FormItem>
                    <FormLabel>Currently Living With</FormLabel>
                    <FormControl>
                        <TextField readOnly={readOnly} placeholder='Currently Living With' {...form.register("currently_living_with")} />
                    </FormControl>
                </FormItem>

                <FormItem className='col-span-2'>
                    <FormLabel required>Occupation</FormLabel>
                    <FormControl>
                        <TextField readOnly={readOnly} placeholder='Occupation' {...form.register("occupation")} />
                    </FormControl>
                    <FormMessage className='mb-1'>
                        {form.formState.errors.occupation?.message}
                    </FormMessage>
                </FormItem>
                <FormItem>
                    <FormLabel>Work hours per week</FormLabel>
                    <FormControl>
                        <TextField readOnly={readOnly} placeholder='Work hours per week' {...form.register("work_hours_per_week")} />
                    </FormControl>
                </FormItem>
            </div>

            <h3 className="mt-8 mb-2 text-lg font-semibold">Family Information</h3>
            {/* <div className='mt-2 mb-4 h-[2px] bg-gray-200'></div> */}
            <div className='flex flex-col gap-4'>
                <FormItem className="col-span-2">
                    <FormControl>
                        <NameAgeDynamicForm readOnly={readOnly} fieldName="children" label="Children" form={form} />
                    </FormControl>
                </FormItem>

                <FormItem className="col-span-2">
                    <FormControl>
                        <NameAgeDynamicForm readOnly={readOnly} fieldName="grandchildren" label="Grandchildren" form={form} />
                    </FormControl>
                </FormItem>
            </div>
        </>
    )
}

export default PersonalInformation