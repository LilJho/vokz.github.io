"use client"

import { mime_types } from '@/lib/utils';
import { Label } from '@/components/ui/FormControls/label';
import Dropzone from '@/components/ui/Dropzone/Dropzone';
import { Button } from '@/components/ui/button';
import FilePreview from '@/components/ui/Dropzone/FilePreview';
import { RiLoader5Line } from 'react-icons/ri';
import * as z from "zod";
import { UseFormReturn } from 'react-hook-form';
import { RecordSchema } from '@/lib/validations/records';
import Image from 'next/image';
import UploadIllu from '@public/images/uploading.svg'
import { Form, FormControl, FormItem, FormMessage } from '@/components/ui/FormControls/form';
import SubmissionState from '@/components/ui/SubmissionState';

interface IRecordFormProps {
    handleSubmit: () => void
    title: string
    description: string
    isLoading: boolean
    form: UseFormReturn<z.infer<typeof RecordSchema>>
    acceptedTypes?: string[]
}

const RecordForm = ({ handleSubmit, title = "", description = "", isLoading, form, acceptedTypes = mime_types.IMAGE_MIME_TYPE }: IRecordFormProps) => {

    const handleImageChange = (files: any) => {
        if (files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                form.setValue("file", files);
                form.setValue("preview", (e.target!).result as string);
                form.setError("preview", ("" as any));
            };
            reader.readAsDataURL(files);
        }
    };

    const handleRemoveImage = () => {
        form.reset()
    }

    const { file, preview } = form.watch()

    return (
        <>
            <Form {...form}>
                <div className='mx-auto md:min-w-[400px]'>
                    <h3 className='text-2xl font-bold text-center'>{title}</h3>
                    <p className='max-w-md text-gray-500 mb-6 3xl:mb-10 text-center'>{description}</p>
                    <FormItem className='flex flex-col max-w-3xl'>
                        <FormControl>
                            <Dropzone className='px-8 py-16 mb-4' onDrop={(file) => handleImageChange(file)} acceptedTypes={acceptedTypes} maxSize={10_000_000} />
                        </FormControl>
                        <Label className=''>Preview</Label>
                        <FilePreview className='mt-1' previewUrl={preview} fileName={file?.name} handleRemoveImage={handleRemoveImage} />
                        <FormMessage className='mt-2'>
                            {form.formState.errors.preview?.message}
                        </FormMessage>
                    </FormItem>
                    <Button className='mt-10 w-full' onClick={handleSubmit}>
                        {isLoading ? <RiLoader5Line className="animate-spin w-6 h-6 -mt-2" /> : "Upload Photo"}
                    </Button>
                </div>
            </Form>

            {isLoading ?
                <SubmissionState message="Uploading your record" description="This may take a few moments. Please do not close the window or refresh the page." /> : null}
        </>

    )
}

export default RecordForm


