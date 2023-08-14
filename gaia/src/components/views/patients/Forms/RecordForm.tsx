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

interface IRecordFormProps {
    handleSubmit: () => void
    title: string
    description: string
    progress?: {
        loading: number,
        status: string
    }
    isLoading: boolean
    form: UseFormReturn<z.infer<typeof RecordSchema>>
    acceptedTypes?: string[]
}

const RecordForm = ({ handleSubmit, title = "", description = "", progress, isLoading, form, acceptedTypes = mime_types.IMAGE_MIME_TYPE }: IRecordFormProps) => {
    const handleImageChange = (files: any) => {
        if (files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                form.setValue("file", files);
                form.setValue("preview", (e.target!).result as string);
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
                <FormItem className='flex flex-col'>
                    <FormControl>
                        <div className='mx-auto max-w-3xl'>
                            <h3 className='text-2xl font-bold text-center'>{title}</h3>
                            <p className='max-w-md text-gray-500 mb-6 3xl:mb-10 text-center'>{description}</p>
                            <Dropzone className='px-8 py-16 mb-4' onDrop={(file) => handleImageChange(file)} acceptedTypes={acceptedTypes} />
                            <Label className=''>Preview</Label>
                            <FilePreview className='mt-1' previewUrl={preview} fileName={file?.name} handleRemoveImage={handleRemoveImage} />
                            <FormMessage className='mt-2'>
                                {form.formState.errors.preview?.message}
                            </FormMessage>
                            <Button className='mt-10 w-full' onClick={handleSubmit}>
                                {isLoading ? <RiLoader5Line className="animate-spin w-6 h-6 -mt-2" /> : "Upload Photo"}
                            </Button>
                        </div>
                    </FormControl>

                </FormItem>
            </Form>

            {isLoading ? <div className='z-50 fixed flex flex-col gap-4 items-center justify-center w-full h-full inset-0 backdrop-blur-sm bg-gray-300/70'>
                <div className='bg-white border flex flex-col items-center px-6 py-10 rounded-md max-w-sm w-full'>
                    <Image src={UploadIllu} alt="Upload Illustration" className='w-52' />
                    <RiLoader5Line className="animate-spin w-20 h-20 text-primary-600" />
                    <h2 className='text-lg font-semibold mt-4'>Uploading photo</h2>
                    {/* {progress?.status ? <p className='text-gray-400'>{progress?.status}</p> : null} */}
                </div>
            </div> : null}
        </>

    )
}

export default RecordForm


