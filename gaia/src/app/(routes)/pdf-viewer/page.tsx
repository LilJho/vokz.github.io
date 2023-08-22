"use client"

import Dropzone from '@/components/ui/Dropzone/Dropzone';
import PDFViewer from '@/components/ui/PDFViewer'
import { mime_types } from '@/lib/utils';
import React, { useState } from 'react'

const PDFViewerPage = () => {
    const [pdfFile, setpdfFile] = useState<File | null>(null);
    const handleImageChange = (files: any) => {
        if (files) {
            setpdfFile(files);
        }
    };


    return (
        <div className='flex flex-col lg:flex-row gap-10'>
            <div className='w-full md:w-[500px]'>
                <Dropzone className='max-h-max px-8 py-16 mb-4' onDrop={(file) => handleImageChange(file)} acceptedTypes={mime_types.PDF_MIME_TYPE} maxSize={10_000_000} />
            </div>
            <div className='flex-1'>
                <h2 className='text-lg font-semibold mb-2'>PDF Preview</h2>
                <PDFViewer pdf={pdfFile} pdfHeight={1000} containerHeight="h-[900px]" />
            </div>
        </div>
    )
}

export default PDFViewerPage