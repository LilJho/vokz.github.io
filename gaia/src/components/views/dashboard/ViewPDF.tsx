"use client"

import PDFViewer from '@/components/ui/PDFViewer'
import React, { useEffect, useState } from 'react'

const ViewPDF = () => {

    const [pdfFile, setPdfFile] = useState(null);


    return (
        <div>
            {/* <PDFViewer pdf={pdfFile} /> */}
            <h2>PDF Reader</h2>
        </div>
    )
}

export default ViewPDF