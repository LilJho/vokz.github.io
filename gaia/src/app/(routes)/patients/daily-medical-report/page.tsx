import BreadcrumbsLayout from '@/components/layout/BreadcrumbsLayout'
import OCRComponent from '@/components/ui/OCR'
import TextExtract from '@/components/views/patients/Record/TextExtract'
import React from 'react'

const page = () => {
    return (
        <BreadcrumbsLayout href="/patients" parentPageTitle='Patients Profile' currentPageTitle='Daily Medical Report'>
            <OCRComponent />
            <TextExtract />
        </BreadcrumbsLayout>
    )
}

export default page