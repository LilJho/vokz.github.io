import BreadcrumbsLayout from '@/components/layout/BreadcrumbsLayout'
import React from 'react'

const page = () => {
    return (
        <BreadcrumbsLayout href="/patients" parentPageTitle='Patients Profile' currentPageTitle='BMI Report'>
            <div>
                CGM Report
            </div>
        </BreadcrumbsLayout>
    )
}

export default page

