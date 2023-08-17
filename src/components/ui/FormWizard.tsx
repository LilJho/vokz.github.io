import React from 'react'

const FormWizard = () => {
    return (
        <div className='border'>
            <div className='flex p-4'>
                <div className='flex gap-4 items-center py-4'>
                    <div className='w-11 h-11 rounded-full bg-blue-400 text-white flex items-center justify-center text-lg'>
                        1
                    </div>
                    <div>
                        <h5 className='text-base font-semibold leading-5'>Personal Information</h5>
                        <p className='text-sm font-normal text-gray-600'>Enter your personal details</p>
                    </div>
                </div>

                <div className='h-[1px] w-full bg-gray-200 flex-1 my-auto'></div>

                <div className='flex gap-4 items-center py-4'>
                    <div className='w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center text-lg'>
                        2
                    </div>
                    <div>
                        <h5 className='text-base font-semibold leading-5'>Personal Information</h5>
                        <p className='text-sm font-normal text-gray-600'>Enter your personal details</p>
                    </div>
                </div>

                <div className='h-[1px] w-full bg-gray-200 flex-1  my-auto'></div>

                <div className='flex gap-4 items-center py-4'>
                    <div className='w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center text-lg'>
                        3
                    </div>
                    <div>
                        <h5 className='text-base font-semibold leading-5'>Personal Information</h5>
                        <p className='text-sm font-normal text-gray-600'>Enter your personal details</p>
                    </div>
                </div>

                <div className='h-[1px] w-full bg-gray-200 flex-1  my-auto'></div>

                <div className='flex gap-4 items-center py-4'>
                    <div className='w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center text-lg'>
                        4
                    </div>
                    <div>
                        <h5 className='text-base font-semibold leading-5'>Personal Information</h5>
                        <p className='text-sm font-normal text-gray-600'>Enter your personal details</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default FormWizard