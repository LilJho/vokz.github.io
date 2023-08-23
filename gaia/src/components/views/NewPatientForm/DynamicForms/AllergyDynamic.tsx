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
  fieldName?: "allergies"
}

const AllergyDynamicForm = ({ form, label, fieldName = "allergies" }: IChildrenDynamicForm) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: fieldName
  });

  const handleAddField = () => {
    append({ cause: '', reaction: '' })
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
            <div key={`${item}-${index}`} className='grid grid-cols-1 md:grid-cols-12 gap-8'>
              <FormItem className='md:col-span-6'>
                <FormLabel>Medication Or Environmental Issue</FormLabel>
                <FormField
                  control={form.control}
                  name={`${fieldName}[${index}].cause` as any}
                  render={({ field }) => (
                    <FormControl>
                      <TextField placeholder='eg. Dust' {...field} />
                    </FormControl>
                  )}
                />
              </FormItem>
              <FormItem className={`${fields.length > 1 ? "md:col-span-5" : "md:col-span-6"}`}>
                <FormLabel>Reaction</FormLabel>
                <FormField
                  control={form.control}
                  name={`${fieldName}[${index}].reaction` as any}
                  render={({ field }) => (
                    <FormControl>
                      <TextField placeholder='eg. Rhinitis' {...field} />
                    </FormControl>
                  )}
                />
              </FormItem>
              {fields.length > 1 && (<Button className='self-end max-w-max' color="red" size="square" onClick={() => handleRemoveField(index)}><RiCloseLine className="w-5 h-5" /></Button>)}
            </div>
          )
        }) : <NoDataFound />}
        <Button className='mt-2 mx-auto' size="sm" variant='light' onClick={handleAddField}><RiAddFill className="w-5 h-5 mr-2" /> Add new field</Button>
      </div>
    </div>
  )
}

export default AllergyDynamicForm