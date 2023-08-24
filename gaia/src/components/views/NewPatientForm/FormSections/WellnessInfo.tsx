import RadioSelectionGroup from "@/components/ui/FormControls/Selection"
import { Textarea } from "@/components/ui/FormControls/TextArea"
import { TextField } from "@/components/ui/FormControls/TextField"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/FormControls/form"
import { IPersonalInformation } from "@/lib/types"
import SurveyQuestion from "../DynamicForms/SurveyQuestion"
import { Label } from "@/components/ui/FormControls/label"
import { pittsburgOption1, pittsburgOption2, pittsburgOption3, pittsburgOption4, pittsburgOption5 } from "@/config/formData"
import { useEffect } from "react"
import { DateField } from "@/components/ui/FormControls/DateField"

interface PersonalInfoExtends extends IPersonalInformation {
    readOnly?: boolean
}

const WellnessInfo = ({ form, readOnly }: PersonalInfoExtends) => {
    const watchSleepingProblem = form.watch().pittsburge_sleep_quality_index?.sleeping_optional?.question
    const watchPartner = form.watch().pittsburge_sleep_quality_index?.partner_optional?.question
    console.log(form.watch())
    useEffect(() => {
        let timeoutId: NodeJS.Timeout | null = null;
        const debounceTime = 500; // in milliseconds

        if (!watchSleepingProblem) {
            timeoutId = setTimeout(() => {
                form.setValue('pittsburge_sleep_quality_index.sleeping_optional.rating_answer', '');
            }, debounceTime);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [watchSleepingProblem, form]);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout | null = null;
        const debounceTime = 500; // in milliseconds

        if (!watchPartner) {
            timeoutId = setTimeout(() => {
                form.setValue('pittsburge_sleep_quality_index.partner_optional.rating_answer', '');
            }, debounceTime);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [watchPartner, form]);


    return (
        <>
            <div className='my-2'>
                <h2 className="text-xl font-semibold text-center lg:text-left">Wellness Information & PSQI</h2>
                <p className='text-center lg:text-left'>Fill up all required patient&apos;s nutrition, PSQI and other information</p>
            </div>

            <h3 className="mt-8 mb-2 text-lg font-semibold">Nutrition</h3>
            <div className='flex flex-col md:grid md:grid-cols-3 gap-y-4 gap-x-8'>
                <FormItem className='col-span-3'>
                    <FormLabel required>Do you have problem swallowing, chewing, diarrhea, or constipation?</FormLabel>
                    <FormControl>
                        <FormField
                            control={form.control}
                            name="nutrition_problem"
                            render={({ field }) => (
                                <FormControl>
                                    <RadioSelectionGroup readOnly={readOnly}  {...field} data={["Yes", "No"]} />
                                </FormControl>
                            )}
                        />
                    </FormControl>
                    <FormMessage className='mb-1'>
                        {form.formState.errors.nutrition_problem?.message}
                    </FormMessage>
                </FormItem>
            </div>

            <h3 className="mt-8 mb-2 text-lg font-semibold">Motivation</h3>
            <div className='flex gap-y-4 gap-x-8'>
                <FormItem className='col-span-3 w-full'>
                    <FormLabel>What specific goals or outcomes are you looking to achieve by participating in House of Gaia&apos;s longevity program?</FormLabel>
                    <FormControl>
                        <Textarea readOnly={readOnly} rows={6} placeholder='eg. Weight loss and longevity' {...form.register("reason_for_participating")} />
                    </FormControl>
                </FormItem>
            </div>

            <h3 className="mt-8 mb-2 text-lg font-semibold">On a scale of 1-10 (with 10 being the highest level of satisfaction)</h3>
            <div className='flex flex-col gap-y-4 gap-x-8'>
                <SurveyQuestion readOnly={readOnly} form={form} />
            </div>

            <h3 className="mt-8 mb-2 text-lg font-semibold">PITTSBURG Sleep Quality Index (PSQI)</h3>
            <Label>The following question relate to your usual sleep habits during the <span className="font-medium">past month only</span>. Your answers should indicate the most accurate reply for the majority of days and nights in the past month</Label>
            <div className='mt-2 flex flex-col gap-y-4 gap-x-8'>

                <FormItem>
                    <FormLabel required>During the past month, what time have you usually gone to bed at night?</FormLabel>
                    <FormControl>
                        <TextField readOnly={readOnly} placeholder='Enter your answer here' {...form.register(`pittsburge_sleep_quality_index.given_question[0].rating_answer` as any, { required: true })} />
                    </FormControl>
                    <FormMessage className='mb-1'>
                        {form.formState.errors?.pittsburge_sleep_quality_index?.given_question?.[0]?.rating_answer?.message}
                    </FormMessage>
                </FormItem>

                <FormItem>
                    <FormLabel required>During the past month, how long (in minutes) has it usually taken you to fall asleep each night?</FormLabel>
                    <FormControl>
                        <TextField readOnly={readOnly} placeholder='Enter your answer here' {...form.register(`pittsburge_sleep_quality_index.given_question[1].rating_answer` as any, { required: true })} />
                    </FormControl>
                    <FormMessage className='mb-1'>
                        {form.formState.errors?.pittsburge_sleep_quality_index?.given_question?.[1]?.rating_answer?.message}
                    </FormMessage>
                </FormItem>

                <FormItem>
                    <FormLabel required>During the past month, what time have you usually gotten up in the morning?</FormLabel>
                    <FormControl>
                        <TextField readOnly={readOnly} placeholder='Enter your answer here' {...form.register(`pittsburge_sleep_quality_index.given_question[2].rating_answer` as any, { required: true })} />
                    </FormControl>
                    <FormMessage className='mb-1'>
                        {form.formState.errors?.pittsburge_sleep_quality_index?.given_question?.[2]?.rating_answer?.message}
                    </FormMessage>
                </FormItem>

                <FormItem>
                    <FormLabel required>During the past month, how many hours of <span className="font-medium">actual sleep</span> did you get at night? (This may be different than the number of hours you spent in bed)</FormLabel>
                    <FormControl>
                        <TextField readOnly={readOnly} placeholder='Enter your answer here' {...form.register(`pittsburge_sleep_quality_index.given_question[3].rating_answer` as any, { required: true })} />
                    </FormControl>
                    <FormMessage className='mb-1'>
                        {form.formState.errors?.pittsburge_sleep_quality_index?.given_question?.[3]?.rating_answer?.message}
                    </FormMessage>
                </FormItem>

                <div className="flex flex-col gap-2 mt-4">
                    <Label className="font-semibold">During the <span className="underline">past month,</span> how often have you had trouble sleeping because you...</Label>
                    <div className="flex flex-col gap-6">
                        {pittsburgQuestionSeries1?.map((questions, index) => {
                            return (
                                <FormItem key={index}>
                                    <FormLabel required>{questions}</FormLabel>
                                    <FormControl>
                                        <FormField
                                            control={form.control}
                                            rules={{ required: true }}
                                            name={`pittsburge_sleep_quality_index.given_question[${index + 4}].rating_answer` as any}
                                            render={({ field }) => (
                                                <FormControl>
                                                    <RadioSelectionGroup readOnly={readOnly} type="rating" {...field} data={pittsburgOption1} />
                                                </FormControl>
                                            )}
                                        />
                                    </FormControl>
                                    <FormMessage className='mb-1'>
                                        {form.formState.errors?.pittsburge_sleep_quality_index?.given_question?.[index + 4]?.rating_answer?.message}
                                    </FormMessage>
                                </FormItem>
                            )
                        })}

                        <div className="flex flex-col gap-2">
                            <FormItem className="max-w-sm">
                                <FormLabel>Other reasons(s). Please describe:</FormLabel>
                                <FormControl>
                                    <TextField readOnly={readOnly} placeholder='Enter your other reason' {...form.register(`pittsburge_sleep_quality_index.sleeping_optional.question` as any)} />
                                </FormControl>
                            </FormItem>
                            {watchSleepingProblem && <FormItem>
                                <FormControl>
                                    <FormField
                                        control={form.control}
                                        name={`pittsburge_sleep_quality_index.sleeping_optional.rating_answer` as any}
                                        render={({ field }) => (
                                            <FormControl>
                                                <RadioSelectionGroup readOnly={readOnly} type="rating" {...field} data={pittsburgOption1} />
                                            </FormControl>
                                        )}
                                    />
                                </FormControl>
                            </FormItem>}
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 mt-6">
                        {pittsburgQuestionSeries2?.map((questions, index) => {
                            return (
                                <FormItem key={index}>
                                    <FormLabel required>{questions}</FormLabel>
                                    <FormControl>
                                        <FormField
                                            control={form.control}
                                            name={`pittsburge_sleep_quality_index.given_question[${index + 13}].rating_answer` as any}
                                            render={({ field }) => (
                                                <FormControl>
                                                    <RadioSelectionGroup readOnly={readOnly} type="rating" {...field} data={pittsburgOption1} />
                                                </FormControl>
                                            )}
                                        />
                                    </FormControl>
                                    <FormMessage className='mb-1'>
                                        {form.formState.errors?.pittsburge_sleep_quality_index?.given_question?.[index + 13]?.rating_answer?.message}
                                    </FormMessage>
                                </FormItem>
                            )
                        })}

                        <FormItem>
                            <FormLabel required>During the past month, how much of a problem has it been for you to keep up enough enthusiasm to get things done?</FormLabel>
                            <FormControl>
                                <FormField
                                    control={form.control}
                                    name={`pittsburge_sleep_quality_index.given_question[15].rating_answer` as any}
                                    render={({ field }) => (
                                        <FormControl>
                                            <RadioSelectionGroup readOnly={readOnly} type="rating" {...field} data={pittsburgOption2} />
                                        </FormControl>
                                    )}
                                />
                            </FormControl>
                            <FormMessage className='mb-1'>
                                {form.formState.errors?.pittsburge_sleep_quality_index?.given_question?.[15]?.rating_answer?.message}
                            </FormMessage>
                        </FormItem>

                        <FormItem>
                            <FormLabel required>During the past month, how would you rate your sleep quality overall?</FormLabel>
                            <FormControl>
                                <FormField
                                    control={form.control}
                                    name={`pittsburge_sleep_quality_index.given_question[16].rating_answer` as any}
                                    render={({ field }) => (
                                        <FormControl>
                                            <RadioSelectionGroup readOnly={readOnly} type="rating" {...field} data={pittsburgOption3} />
                                        </FormControl>
                                    )}
                                />
                            </FormControl>
                            <FormMessage className='mb-1'>
                                {form.formState.errors?.pittsburge_sleep_quality_index?.given_question?.[16]?.rating_answer?.message}
                            </FormMessage>
                        </FormItem>

                        <FormItem>
                            <FormLabel required>Do you have a beb parter or room mate?</FormLabel>
                            <FormControl>
                                <FormField
                                    control={form.control}
                                    name={`pittsburge_sleep_quality_index.given_question[17].rating_answer` as any}
                                    render={({ field }) => (
                                        <FormControl>
                                            <RadioSelectionGroup readOnly={readOnly} type="rating" {...field} data={pittsburgOption4} />
                                        </FormControl>
                                    )}
                                />
                            </FormControl>
                            <FormMessage className='mb-1'>
                                {form.formState.errors?.pittsburge_sleep_quality_index?.given_question?.[17]?.rating_answer?.message}
                            </FormMessage>
                        </FormItem>
                    </div>

                    <div className="flex flex-col gap-2 mt-4">
                        <Label className="font-semibold">If you have a room mate or bed partner, ask him/her how often in the past month you have had:</Label>
                        <div className="flex flex-col gap-6">
                            {pittsburgQuestionSeries3?.map((questions, index) => {
                                return (
                                    <FormItem key={index}>
                                        <FormLabel required>{questions}</FormLabel>
                                        <FormControl>
                                            <FormField
                                                control={form.control}
                                                name={`pittsburge_sleep_quality_index.given_question[${index + 18}].rating_answer` as any}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <FormControl>
                                                        <RadioSelectionGroup readOnly={readOnly} type="rating" {...field} data={pittsburgOption5} />
                                                    </FormControl>
                                                )}
                                            />
                                        </FormControl>
                                        <FormMessage className='mb-1'>
                                            {form.formState.errors?.pittsburge_sleep_quality_index?.given_question?.[index + 18]?.rating_answer?.message}
                                        </FormMessage>
                                    </FormItem>
                                )
                            })}

                            <div className="flex flex-col gap-2">
                                <FormItem className="max-w-sm">
                                    <FormLabel>Other restlessness while you sleep, please describe:</FormLabel>
                                    <FormControl>
                                        <TextField readOnly={readOnly} placeholder='Enter your other reason' {...form.register(`pittsburge_sleep_quality_index.partner_optional.question` as any)} />
                                    </FormControl>
                                </FormItem>
                                {watchPartner && <FormItem>
                                    <FormControl>
                                        <FormField
                                            control={form.control}
                                            name={`pittsburge_sleep_quality_index.partner_optional.rating_answer` as any}
                                            render={({ field }) => (
                                                <RadioSelectionGroup readOnly={readOnly} type="rating" {...field} data={pittsburgOption5} />
                                            )}
                                        />
                                    </FormControl>
                                </FormItem>}
                            </div>

                            <div className="flex max-w-max">
                                <FormItem>
                                    <FormLabel required>Date of Application</FormLabel>
                                    <FormControl>
                                        <DateField readOnly={readOnly} {...form.register(`date_of_application` as any, { required: true })} />
                                    </FormControl>
                                </FormItem>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WellnessInfo

const pittsburgQuestionSeries1 = [
    "Cannot get to sleep with 30 minutes.",
    "Wake up in the middle of the night or early morning.",
    "Have to get up to use the bathroom.",
    "Cannot breathe comfortably.",
    "Cough or snore loudly.",
    "Feel too cold.",
    "Feel too hot.",
    "Have bad dreams.",
    "Have pain.",
]

const pittsburgQuestionSeries2 = [
    "During the past month, how often have you taken medicine to help you sleep (prescribed or & 'over the counter')?",
    "During the past month, how often have you had trouble staying awake while driving, eating meals, or engaging in social activity?",
]

const pittsburgQuestionSeries3 = [
    "Loud snoring",
    "Long pauses in breathing while asleep",
    "Legs twitching or jerking while asleep",
    "Episodes of disorientation or confusion during the night",
]