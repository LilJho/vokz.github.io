import BreadcrumbsLayout from '@/components/layout/BreadcrumbsLayout'
import OCRComponent from '@/components/ui/OCR'
import React from 'react'

const page = () => {
    return (
        <BreadcrumbsLayout href="/patients" parentPageTitle='Patients Profile' currentPageTitle='CGM Report'>
            <div>
                <OCRComponent />
            </div>
        </BreadcrumbsLayout>
    )
}

export default page