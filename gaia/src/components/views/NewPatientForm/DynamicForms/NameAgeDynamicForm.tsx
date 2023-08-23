import { NumberField } from '@/components/ui/FormControls/NumberField'
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
  fieldName: "children" | "grandchildren"
}

const ChildrenDynamicForm = ({ form, label, fieldName }: IChildrenDynamicForm) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: fieldName
  });

  const handleAddField = () => {
    append({ first_name: '', last_name: '', age: '' })
  }

  const handleRemoveField = (index: number) => {
    remove(index);
  };

  return (
    <div>
      <FormLabel>{label}</FormLabel>
      <div className='mt-1 flex flex-col gap-4 md:gap-2 md:border md:p-4 rounded-md'>
        {fields.length > 0 ? fields?.map((item, index) => {
          return (
            <div key={`${item}-${index}`} className='relative border p-3 rounded-md md:p-0 md:border-none grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8'>
              {fields.length > 1 && <Button variant="unstyled" size="square" className='block md:hidden p-0.5 absolute right-2 top-2'>
                <RiCloseLine className="text-red-600 w-6 h-6" onClick={() => handleRemoveField(index)} />
              </Button>}
              <FormItem className='md:col-span-4'>
                <FormLabel>First Name</FormLabel>
                <FormField
                  control={form.control}
                  name={`${fieldName}[${index}].first_name` as any}
                  render={({ field }) => (
                    <FormControl>
                      <TextField placeholder='First name' {...field} />
                    </FormControl>
                  )}
                />
              </FormItem>
              <FormItem className='md:col-span-4'>
                <FormLabel>Last Name</FormLabel>
                <FormField
                  control={form.control}
                  name={`${fieldName}[${index}].last_name` as any}
                  render={({ field }) => (
                    <FormControl>
                      <TextField placeholder='Last name' {...field} />
                    </FormControl>
                  )}
                />
              </FormItem>
              <FormItem className={`${fields.length > 1 ? "md:col-span-3" : "md:col-span-4"}`}>
                <FormLabel>Age</FormLabel>
                <FormField
                  control={form.control}
                  name={`${fieldName}[${index}].age` as any}
                  render={({ field }) => (
                    <FormControl>
                      <NumberField placeholder='Age' {...field} />
                    </FormControl>
                  )}
                />
              </FormItem>
              {fields.length > 1 && (<Button className='hidden md:flex self-end max-w-max' color="red" size="square" onClick={() => handleRemoveField(index)}><RiCloseLine className="w-5 h-5" /></Button>)}
            </div>
          )
        }) :
          <NoDataFound />}
        <Button className='md:mt-2 mx-auto' size="sm" variant='light' onClick={handleAddField}><RiAddFill className="w-5 h-5 mr-2" /> Add new field</Button>
      </div>
    </div>
  )
}

export default ChildrenDynamicForm