import { DateField } from '@/components/ui/FormControls/DateField'
import SelectField from '@/components/ui/FormControls/SelectField'
import { TextField } from '@/components/ui/FormControls/TextField'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/FormControls/form'
import NoDataFound from '@/components/ui/NoDataFound'
import { Button } from '@/components/ui/button'
import { IPersonalInformation } from '@/lib/types'
import React from 'react'
import { useFieldArray } from 'react-hook-form'
import { RiAddFill, RiCloseLine } from 'react-icons/ri'

interface IChildrenDynamicForm extends IPersonalInformation {
    label: string
    fieldName?: "prescription_medication" | "over_the_counter_medication"
    readOnly?: boolean
}

const MedicationDynamicForm = ({ form, label, fieldName = "prescription_medication", readOnly }: IChildrenDynamicForm) => {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: `${fieldName}`
    });

    const handleAddField = () => {
        append({ medication_name: '', dosage: '', purpose: "", start_date: "", remarks: "" })
    }

    const handleRemoveField = (index: number) => {
        remove(index);
    };

    return (
        <div>
            <FormLabel>{label}</FormLabel>
            <div className='mt-1 flex flex-col gap-2 border p-4 rounded-md'>
                {fields.length > 0 ? fields?.map((item, index) => {
                    return (
                        <div key={index} className='flex flex-col md:grid md:grid-cols-12 gap-8'>
                            <FormItem className={`${!readOnly && fields.length > 1 ? "md:col-span-3" : "md:col-span-4"}`}>
                                <FormLabel>Medication Name</FormLabel>
                                <FormField
                                    control={form.control}
                                    name={`${fieldName}[${index}].medication_name` as any}
                                    render={({ field }) => (
                                        <FormControl>
                                            <TextField readOnly={readOnly} placeholder='e.g. ' {...field} />
                                        </FormControl>
                                    )}
                                />
                            </FormItem>
                            <FormItem className='md:col-span-2'>
                                <FormLabel>Dose and How often?</FormLabel>
                                <FormField
                                    control={form.control}
                                    name={`${fieldName}[${index}].dosage` as any}
                                    render={({ field }) => (
                                        <FormControl>
                                            <TextField readOnly={readOnly} placeholder='e.g. ' {...field} />
                                        </FormControl>
                                    )}
                                />
                            </FormItem>
                            <FormItem className='md:col-span-2'>
                                <FormLabel>Purpose or reason</FormLabel>
                                <FormField
                                    control={form.control}
                                    name={`${fieldName}[${index}].purpose` as any}
                                    render={({ field }) => (
                                        <FormControl>
                                            <TextField readOnly={readOnly} placeholder='e.g. ' {...field} />
                                        </FormControl>
                                    )}
                                />
                            </FormItem>
                            <FormItem className='md:col-span-2'>
                                <FormLabel>Start date taken</FormLabel>
                                <FormField
                                    control={form.control}
                                    name={`${fieldName}[${index}].start_date` as any}
                                    render={({ field }) => (
                                        <FormControl>
                                            <DateField readOnly={readOnly} placeholder='e.g. ' {...field} />
                                        </FormControl>
                                    )}
                                />
                            </FormItem>
                            <FormItem className='md:col-span-2'>
                                <FormLabel>Remarks</FormLabel>
                                <FormField
                                    control={form.control}
                                    name={`${fieldName}[${index}].remarks` as any}
                                    render={({ field }) => (
                                        <FormControl>
                                            <TextField readOnly={readOnly} placeholder='e.g. ' {...field} />
                                        </FormControl>
                                    )}
                                />
                            </FormItem>
                            {!readOnly && fields.length > 1 && (<Button className='self-end max-w-max' color="red" size="square" onClick={() => handleRemoveField(index)}><RiCloseLine className="w-5 h-5" /></Button>)}
                        </div>
                    )
                }) : <NoDataFound readOnly={readOnly} />}
                {!readOnly && <Button className='mt-2 mx-auto' size="sm" variant='light' onClick={handleAddField}><RiAddFill className="w-5 h-5 mr-2" /> Add new field</Button>}
            </div>
        </div>
    )
}

export default MedicationDynamicForm