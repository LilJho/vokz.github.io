import BreadcrumbsLayout from '@/components/layout/BreadcrumbsLayout'
import OCRComponent from '@/components/ui/OCR'
import DailyMedicalForm from '@/components/views/patients/Forms/DailyMedicalForm'
import RecordForm from '@/components/views/patients/Forms/RecordForm'
import React from 'react'

const page = () => {
    return (
        <BreadcrumbsLayout href="/patients" parentPageTitle='Patients Profile' currentPageTitle='Daily Medical Record'>
            {/* <OCRComponent /> */}
            <div className='flex justify-center mt-4 3xl:mt-24'>
                <DailyMedicalForm />
            </div>
        </BreadcrumbsLayout>
    )
}

export default page