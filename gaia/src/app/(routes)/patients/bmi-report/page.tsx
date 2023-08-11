import BreadcrumbsLayout from '@/components/layout/BreadcrumbsLayout'
import BodyCompositionForm from '@/components/views/patients/Forms/BodyCompositionForm'
import React from 'react'

const page = () => {
    return (
        <BreadcrumbsLayout href="/patients" parentPageTitle='Patients Profile' currentPageTitle='BMI Report'>
            <div className='flex justify-center mt-4 3xl:mt-24'>
                <BodyCompositionForm />
            </div>
        </BreadcrumbsLayout>
    )
}

export default page

