"use client"

import { useEffect, useState } from 'react';
import NoFile from '@public/images/no-file.svg'
import Image from 'next/image'
import { Viewer, Worker } from '@react-pdf-viewer/core';

import '@react-pdf-viewer/core/lib/styles/index.css';


interface IPDFViewerProps {
    url: string
}

const PDFViewer = ({ url = "" }: IPDFViewerProps) => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-7 gap-4 border rounded-lg w-full p-4 bg-white'>
            <div className='lg:col-span-3'></div>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.9.179/build/pdf.worker.js">
                <div className='lg:col-span-4 flex items-center justify-center p-4 h-[calc(100dvh-236px)] border rounded-lg'>
                    {url ? <Viewer
                        fileUrl="/Gerard-Loy-June.pdf"
                    /> : <div className='flex flex-col items-center'>
                        <Image src={NoFile} alt="No File" className='w-56' />
                        <p className='mt-4 text-lg font-semibold text-center text-gray-800'>No PDF File found</p>
                        <p className='text-center text-gray-400 max-w-sm leading-5'>Sorry, we couldn't find a PDF file to display. Please check that the file exists and try again.</p>
                    </div>}
                </div>
            </Worker>
        </div>
    )
}

export default PDFViewer