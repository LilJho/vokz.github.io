"use client"

import { DateField } from '@/components/ui/FormControls/DateField'
import { NumberField } from '@/components/ui/FormControls/NumberField'
import RadioSelectionGroup from '@/components/ui/FormControls/Selection'
import { TextField } from '@/components/ui/FormControls/TextField'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/FormControls/form'
import React from 'react'
import HeadLessComboBox from '@/components/ui/FormControls/HeadLessComboBox'
import { racesData, relationshipData } from '@/config/formData'
import NameAgeDynamicForm from '../DynamicForms/NameAgeDynamicForm'
import { IPersonalInformation } from '@/lib/types'

const PersonalInformation = ({ form }: IPersonalInformation) => {
    console.log(form.watch())

    return (
        <>
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <p className=''>Fill up all required patient&apos;s personal information</p>

            <h3 className="mt-8 mb-2 text-lg font-semibold">Personal Information</h3>
            {/* <div className='mt-2 mb-4 h-[2px] bg-gray-200'></div> */}
            <div className='flex flex-col md:grid md:grid-cols-3 gap-y-4 gap-x-8'>
                <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                        <TextField placeholder='First name' {...form.register("first_name", { required: true })} />
                    </FormControl>
                </FormItem>
                <FormItem>
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                        <TextField placeholder='Middle name' {...form.register("middle_name", { required: true })} />
                    </FormControl>
                </FormItem>
                <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                        <TextField placeholder='Last name' {...form.register("last_name", { required: true })} />
                    </FormControl>
                </FormItem>


                <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                        <DateField {...form.register("date_of_birth", { required: true })} />
                    </FormControl>
                </FormItem>
                <FormItem>
                    <FormLabel>Mailing Address</FormLabel>
                    <FormControl>
                        <TextField placeholder='Mailing Address' {...form.register("mailing_address", { required: true })} />
                    </FormControl>
                </FormItem>
                <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                        <TextField placeholder='City' {...form.register("city", { required: true })} />
                    </FormControl>
                </FormItem>

                <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                        <NumberField
                            placeholder='0000000000'
                            leftIcon="+63"
                            maxLength={10}
                            {...form.register("contact_number", { required: true })}
                        />
                    </FormControl>
                </FormItem>
                <FormItem>
                    <FormLabel>Alternative Contact Number</FormLabel>
                    <FormControl>
                        <NumberField
                            placeholder='0000000000'
                            leftIcon="+63"
                            maxLength={10}
                            {...form.register("alt_contact_number")}
                        />
                    </FormControl>
                </FormItem>
                <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormControl>
                                <RadioSelectionGroup {...field} data={["Male", "Female"]} />
                            </FormControl>
                        )}
                    />
                </FormItem>

                <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                        <TextField placeholder='Email Address' {...form.register("email")} />
                    </FormControl>
                </FormItem>
                <FormItem>
                    <FormLabel>Race</FormLabel>
                    <FormField
                        control={form.control}
                        name="race"
                        render={({ field }) => (
                            <FormControl>
                                <HeadLessComboBox data={racesData} {...field} />
                            </FormControl>
                        )}
                    />
                </FormItem>
                <FormItem>
                    <FormLabel>Relationship Status</FormLabel>
                    <FormField
                        control={form.control}
                        name="relationship_status"
                        render={({ field }) => (
                            <FormControl>
                                <HeadLessComboBox {...field} data={relationshipData} />
                            </FormControl>
                        )}
                    />
                </FormItem>

                <FormItem className='col-span-2'>
                    <FormLabel>Current Address</FormLabel>
                    <FormControl>
                        <TextField placeholder='Current Address' {...form.register("currennt_address")} />
                    </FormControl>
                </FormItem>
                <FormItem>
                    <FormLabel>Currently Living With</FormLabel>
                    <FormControl>
                        <TextField placeholder='Currently Living With' {...form.register("currently_living_with")} />
                    </FormControl>
                </FormItem>

                <FormItem className='col-span-2'>
                    <FormLabel>Occupation</FormLabel>
                    <FormControl>
                        <TextField placeholder='Occupation' {...form.register("occupation")} />
                    </FormControl>
                </FormItem>
                <FormItem>
                    <FormLabel>Work hours per week</FormLabel>
                    <FormControl>
                        <TextField placeholder='Work hours per week' {...form.register("work_hours_per_week")} />
                    </FormControl>
                </FormItem>
            </div>

            <h3 className="mt-8 mb-2 text-lg font-semibold">Family Information</h3>
            {/* <div className='mt-2 mb-4 h-[2px] bg-gray-200'></div> */}
            <div className='flex flex-col gap-4'>
                <FormItem className="col-span-2">
                    <FormControl>
                        <NameAgeDynamicForm fieldName="children" label="Children" form={form} />
                    </FormControl>
                </FormItem>

                <FormItem className="col-span-2">
                    <FormControl>
                        <NameAgeDynamicForm fieldName="grandchildren" label="Grandchildren" form={form} />
                    </FormControl>
                </FormItem>
            </div>
        </>
    )
}

export default PersonalInformation