import { IPersonalInformation } from '@/lib/types';
import React from 'react'
import { useFieldArray } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/FormControls/form'
import RadioSelectionGroup from '@/components/ui/FormControls/Selection';
import { Textarea } from '@/components/ui/FormControls/TextArea';

const SurveyQuestion = ({ form }: IPersonalInformation) => {

    const { fields: fieldsQuestion } = useFieldArray({
        control: form.control,
        name: "motivation_survey.survey_Questions"
    });
    return (
        <>
            <div className='flex flex-col gap-4'>
                {fieldsQuestion?.map((item, index) => {
                    return (
                        <div key={`${item}-${index}`} className=''>
                            <FormItem className='md:col-span-8'>
                                <FormLabel>{item.question}</FormLabel>
                                <FormField
                                    control={form.control}
                                    name={`motivation_survey.survey_Questions[${index}].rating_answer` as any}
                                    render={({ field }) => (
                                        <FormControl>
                                            <RadioSelectionGroup type="rating" {...field} data={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]} />
                                        </FormControl>
                                    )}
                                />
                            </FormItem>
                        </div>
                    )
                })}
            </div>
            <FormItem className=' w-full'>
                <FormLabel>Additional comments or notes from you answer above</FormLabel>
                <FormControl>
                    <Textarea rows={6} placeholder='Write your additional comments here, if any.' {...form.register("motivation_survey.additional_comment")} />
                </FormControl>
            </FormItem>
        </>

    )
}

export default SurveyQuestion