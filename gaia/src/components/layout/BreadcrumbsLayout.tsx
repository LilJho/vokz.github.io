import Link from 'next/link'
import React from 'react'
import { FiChevronRight } from 'react-icons/fi'

interface IBreadcrumbsLayout {
    href: string
    parentPageTitle: string
    currentPageTitle: string
    children: React.ReactNode
}

const BreadcrumbsLayout = ({ href, parentPageTitle, currentPageTitle, children }: IBreadcrumbsLayout) => {
    return (
        <div className='flex flex-col gap-6 min-h-screen'>
            <div className='flex justify-between items-center'>
                <h2 className='text-xl font-semibold flex gap-1 items-center'>
                    <Link href={href}>{parentPageTitle}</Link> <FiChevronRight /> <span className='text-primary-600'>{currentPageTitle}</span>
                </h2>
            </div>
            {children}
        </div>
    )
}

export default BreadcrumbsLayout