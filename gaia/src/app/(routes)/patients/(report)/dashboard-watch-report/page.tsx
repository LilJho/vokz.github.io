import BreadcrumbsLayout from '@/components/layout/BreadcrumbsLayout'
import DailyMedicalForm from '@/components/views/patients/Forms/DailyMedicalForm'
import React from 'react'

const page = () => {
    return (
        <BreadcrumbsLayout href="/patients/summary" parentPageTitle='Patients Profile' currentPageTitle='Daily Medical Record'>
            {/* <OCRComponent /> */}
            <div className='flex justify-center mt-4 3xl:mt-24'>
                <DailyMedicalForm />
            </div>
        </BreadcrumbsLayout>
    )
}

export default page