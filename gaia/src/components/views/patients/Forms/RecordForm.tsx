"use client"

import React, { Dispatch, useState } from 'react';
import { mime_types } from '@/lib/utils';
import { Label } from '@/components/ui/FormControls/label';
import Dropzone from '@/components/ui/Dropzone/Dropzone';
import { Button } from '@/components/ui/button';
import { CropRegionsType } from '@/lib/types';
import { processAndExtract } from '@/helper/tesseractExtract';
import FilePreview from '@/components/ui/Dropzone/FilePreview';

type SelectedFileType = {
    fileName: string;
    file: string;
}

interface IRecordFormProps {
    selectedFile: SelectedFileType,
    setSelectedFile: Dispatch<React.SetStateAction<SelectedFileType>>;
    handleSubmit: () => void
    title: string
    description: string
}


const RecordForm = ({ selectedFile, setSelectedFile, handleSubmit, title = "", description = "" }: IRecordFormProps) => {
    const handleImageChange = (files: any) => {
        if (files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedFile({
                    fileName: files.name,
                    file: (e.target!).result as string,
                });
            };
            reader.readAsDataURL(files);
        }
    };

    const handleRemoveImage = () => {
        setSelectedFile({
            fileName: "",
            file: "",
        });
    }


    return (
        <div className='mx-auto max-w-3xl'>
            <h3 className='text-2xl font-bold text-center'>{title}</h3>
            <p className='max-w-md text-gray-500 mb-6 3xl:mb-10 text-center'>{description}</p>
            <Dropzone className='px-8 py-16 mb-4' onDrop={(file) => handleImageChange(file)} acceptedTypes={mime_types.IMAGE_MIME_TYPE} />
            <Label className=''>Preview</Label>
            <FilePreview className='mt-1' previewUrl={selectedFile.file} fileName={selectedFile.fileName} handleRemoveImage={handleRemoveImage} />
            <Button className='mt-10 w-full' onClick={handleSubmit}>Upload Photo</Button>
        </div>
    )
}

export default RecordForm


