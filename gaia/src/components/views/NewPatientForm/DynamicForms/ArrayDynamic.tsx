import { NumberField } from '@/components/ui/FormControls/NumberField'
import { TextField } from '@/components/ui/FormControls/TextField'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/FormControls/form'
import { Button } from '@/components/ui/button'
import { IPersonalInformation } from '@/lib/types'
import React from 'react'
import { useFieldArray } from 'react-hook-form'
import { RiAddFill, RiCloseLine } from 'react-icons/ri'

interface ArrayDynamicProps extends IPersonalInformation {
    fieldName: "health_conditions" | "vaccinations"
    label: string
}

const ArrayDynamicForm = ({ form, fieldName, label }: ArrayDynamicProps) => {
    const { fields, append, remove } = useFieldArray({
        name: fieldName
    });

    const handleAddField = () => {
        append("")
    }

    const handleRemoveField = (index: number) => {
        remove(index);
    };

    return (
        <div>
            <FormLabel>{label}</FormLabel>
            <div className='mt-1 flex flex-col gap-2 border p-4 rounded-md'>
                {fields?.map((item, index) => {
                    return (
                        <div key={`${index}`} className={`grid grid-cols-12 gap-8`}>
                            <FormItem className={`${fields.length > 1 ? "md:col-span-11" : "md:col-span-12"}`}>
                                <FormLabel>Health Condition</FormLabel>
                                <FormField
                                    control={form.control}
                                    name={`${fieldName}[${index}]` as any}
                                    render={({ field }) => (
                                        <FormControl>
                                            <TextField placeholder='Health Condition' {...field} />
                                        </FormControl>
                                    )}
                                />
                            </FormItem>
                            {fields.length > 1 && (<Button className='self-end max-w-max' color="red" size="square" onClick={() => handleRemoveField(index)}><RiCloseLine className="w-5 h-5" /></Button>)}
                        </div>
                    )
                })}
                <Button className='mt-2 mx-auto' size="sm" variant='light' onClick={handleAddField}><RiAddFill className="w-5 h-5 mr-2" /> Add new field</Button>
            </div>
        </div>
    )
}

export default ArrayDynamicForm