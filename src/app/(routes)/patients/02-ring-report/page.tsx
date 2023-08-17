import BreadcrumbsLayout from '@/components/layout/BreadcrumbsLayout'
import O2RingForm from '@/components/views/patients/Forms/O2RingForm'
import React from 'react'

const page = () => {
    return (
        <BreadcrumbsLayout href="/patients" parentPageTitle='Patients Profile' currentPageTitle='02 Ring Report'>
            <div className='flex justify-center mt-4 3xl:mt-24'>
                <O2RingForm />
            </div>
        </BreadcrumbsLayout>
    )
}

export default page