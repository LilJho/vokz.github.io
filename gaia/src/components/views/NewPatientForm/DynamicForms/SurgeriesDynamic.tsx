import { DateField } from '@/components/ui/FormControls/DateField'
import { NumberField } from '@/components/ui/FormControls/NumberField'
import { TextField } from '@/components/ui/FormControls/TextField'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/FormControls/form'
import NoDataFound from '@/components/ui/NoDataFound'
import { Button } from '@/components/ui/button'
import { IPersonalInformation } from '@/lib/types'
import React from 'react'
import { useFieldArray } from 'react-hook-form'
import { RiAddFill, RiCloseLine } from 'react-icons/ri'

interface PersonalInfoExtends extends IPersonalInformation {
    readOnly?: boolean
}

const SurgeriesDynamicForm = ({ form, readOnly }: PersonalInfoExtends) => {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "surgeries"
    });

    const handleAddField = () => {
        append({ procedure: '', date: '' })
    }

    return (
        <div>
            <FormLabel>Past Surgeries or Procedure</FormLabel>
            <div className='mt-1 flex flex-col gap-2 border p-4 rounded-md'>
                {fields.length > 0 ? fields?.map((item, index) => {
                    return (
                        <div key={`${item.id}`} className='grid grid-cols-1 md:grid-cols-12 gap-8'>
                            <FormItem className='md:col-span-6'>
                                <FormLabel>Surgery or Procedure name</FormLabel>
                                <FormField
                                    control={form.control}
                                    name={`surgeries[${index}].procedure` as any}
                                    render={({ field }) => (
                                        <FormControl>
                                            <TextField readOnly={readOnly} placeholder='First name' {...field} />
                                        </FormControl>
                                    )}
                                />
                            </FormItem>
                            <FormItem className={`${!readOnly && fields.length > 1 ? "md:col-span-5" : "md:col-span-6"}`}>
                                <FormLabel>Year done</FormLabel>
                                <FormField
                                    control={form.control}
                                    name={`surgeries[${index}].date` as any}
                                    render={({ field }) => (
                                        <FormControl>
                                            <DateField readOnly={readOnly} placeholder='Last name' {...field} />
                                        </FormControl>
                                    )}
                                />
                            </FormItem>
                            {!readOnly && fields.length > 1 && (<Button className='self-end max-w-max' color="red" size="square" onClick={() => remove(index)}><RiCloseLine className="w-5 h-5" /></Button>)}
                        </div>
                    )
                }) : <NoDataFound readOnly={readOnly} />}
                {!readOnly && <Button className='mt-2 mx-auto' size="sm" variant='light' onClick={handleAddField}><RiAddFill className="w-5 h-5 mr-2" /> Add new field</Button>}
            </div>
        </div>
    )
}

export default SurgeriesDynamicForm