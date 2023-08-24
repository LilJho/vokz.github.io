import { DateField } from '@/components/ui/FormControls/DateField'
import { NumberField } from '@/components/ui/FormControls/NumberField'
import RadioSelectionGroup from '@/components/ui/FormControls/Selection'
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

const VaccineDynamicForm = ({ form, readOnly }: PersonalInfoExtends) => {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "vaccinations"
    });

    const handleAddField = () => {
        append({ vaccine: '', status: '' })
    }

    return (
        <div>
            <FormLabel>Where were your previous vaccines or immunization completed?</FormLabel>
            <div className='mt-1 flex flex-col gap-2 border p-4 rounded-md'>
                {fields.length > 0 ? fields?.map((item, index) => {
                    return (
                        <div key={`${item.id}`} className='flex gap-4 md:gap-8'>
                            <FormItem className={`flex-1`}>
                                <FormLabel>Vaccination or Immunization name</FormLabel>
                                <FormField
                                    control={form.control}
                                    name={`vaccinations[${index}].vaccine` as any}
                                    render={({ field }) => (
                                        <FormControl>
                                            <TextField readOnly={readOnly} placeholder='First name' {...field} />
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
                                            <RadioSelectionGroup readOnly={readOnly}  {...field} data={["Done", "Ongoing"]} />
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

export default VaccineDynamicForm