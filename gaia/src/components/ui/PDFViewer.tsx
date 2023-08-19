"use client"

import { pdfjs, Document, Page } from 'react-pdf';
import { useState } from 'react';
import NoFile from '@public/images/no-file.svg'
import Image from 'next/image'
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

interface IPDFViewerProps {
    pdf: File | null;
    pdfHeight?: number;
    containerHeight?: string;
}

const PDFViewer = ({ pdf, pdfHeight = 1000, containerHeight }: IPDFViewerProps) => {
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);


    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    function changePage(offset: number) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }


    return (
        <div className={`bg-gray-100/80 h-[calc(100dvh-148px)] flex justify-center ${!pdf && "items-center"} border rounded-lg p-4 overflow-y-auto`}>
            <Document
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
                        <Page key={`page_${index + 1}`} className="block m-0" height={pdfHeight} pageNumber={index + 1} renderTextLayer={false} />
                    )
                )}
            </Document>
            {/* {pdfFile &&
                    <div className='flex items-center justify-between mt-2'>
                        <span> Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}</span>
                        <div className='flex gap-4'>
                            <Button size="sm" onClick={previousPage} disabled={pageNumber <= 1}>Prev</Button>
                            <Button size="sm" onClick={nextPage} disabled={pageNumber >= numPages!}>Next</Button>
                        </div>
                    </div>
                } */}
        </div>
    )
}

export default PDFViewer