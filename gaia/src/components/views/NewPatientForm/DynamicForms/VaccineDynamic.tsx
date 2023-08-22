import { DateField } from '@/components/ui/FormControls/DateField'
import { NumberField } from '@/components/ui/FormControls/NumberField'
import RadioSelectionGroup from '@/components/ui/FormControls/Selection'
import { TextField } from '@/components/ui/FormControls/TextField'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/FormControls/form'
import { Button } from '@/components/ui/button'
import { IPersonalInformation } from '@/lib/types'
import React from 'react'
import { useFieldArray } from 'react-hook-form'
import { RiAddFill, RiCloseLine } from 'react-icons/ri'

const VaccineDynamicForm = ({ form }: IPersonalInformation) => {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "vaccinations"
    });

    const handleAddField = () => {
        append({ vaccine: '', status: '' })
    }

    const handleRemoveField = (index: number) => {
        remove(index);
    };

    return (
        <div>
            <FormLabel>Where were your previous vaccines or immunization completed?</FormLabel>
            <div className='mt-1 flex flex-col gap-2 border p-4 rounded-md'>
                {fields?.map((item, index) => {
                    return (
                        <div key={`${item}-${index}`} className='flex gap-4 md:gap-8'>
                            <FormItem className={`flex-1`}>
                                <FormLabel>Vaccination or Immunization name</FormLabel>
                                <FormField
                                    control={form.control}
                                    name={`vaccinations[${index}].vaccine` as any}
                                    render={({ field }) => (
                                        <FormControl>
                                            <TextField placeholder='First name' {...field} />
                                        </FormControl>
                                    )}
                                />
                            </FormItem>
                            <FormItem className={`md:col-span-4`}>
                                <FormLabel>Status</FormLabel>
                                <FormField
                                    control={form.control}
                                    name={`vaccinations[${index}].status` as any}
                                    render={({ field }) => (
                                        <FormControl>
                                            <RadioSelectionGroup {...field} data={["Done", "Ongoing"]} />
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

export default VaccineDynamicForm