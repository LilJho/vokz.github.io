"use client"

import { pdfjs, Document, Page } from 'react-pdf';
import { useEffect, useState } from 'react';
import NoFile from '@public/images/no-file.svg'
import Image from 'next/image'
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

interface IPDFViewerProps {
    pdf: File | null | string;
    pdfHeight?: number;
    containerHeight?: string;
}

const PDFViewer = ({ pdf, pdfHeight = 1000, containerHeight }: IPDFViewerProps) => {
    const [numPages, setNumPages] = useState<number>();
    const [orientation, setOrientation] = useState("vertical");


    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    async function getOrientation(): Promise<string> {
        if (!pdf) {
            return "vertical";
        }

        const reader = new FileReader();

        const fileArrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
            reader.onload = () => resolve(reader.result as ArrayBuffer);
            reader.onerror = () => reject(new Error("Failed to read the file"));
            reader.readAsArrayBuffer(pdf!);
        });

        const typedArray = new Uint8Array(fileArrayBuffer);
        const pdfDocument = await pdfjs.getDocument(typedArray).promise;
        const page = await pdfDocument.getPage(1);
        const { width, height } = page.getViewport({ scale: 1 });
        setOrientation(width > height ? "horizontal" : "vertical");
        return width > height ? "horizontal" : "vertical";
    }

    useEffect(() => {
        getOrientation()
    }, [pdf])

    return (
        <div className={`bg-gray-100/80 h-[calc(100dvh-148px)] flex justify-center ${!pdf && "items-center"} border rounded-lg p-4 overflow-x-auto overflow-y-auto`}>
            <Document
                className="max-w-max"
                file={pdf}
                onLoadSuccess={onDocumentLoadSuccess}
                noData={<div className={`flex flex-col items-center gap-4`}>
                    <Image src={NoFile} alt="Illustration" className='w-72' />
                    <h2 className='text-xl text-primary-600 font-medium'>No PDF file selected</h2>
                </div>}
            >
                {Array.from(
                    new Array(numPages),
                    (el, index) => (
                        <div key={`page_${index + 1}`} className='[&>*]:w-full max-w-5xl [&>*]:object-contain'>
                            <Page className="block m-0" scale={orientation === "vertical" ? 1 : 0.45} height={pdfHeight} pageNumber={index + 1} renderTextLayer={false} />
                        </div>
                    )
                )}
            </Document>
        </div>
    )
}

export default PDFViewer