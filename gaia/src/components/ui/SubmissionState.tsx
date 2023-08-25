import Image from 'next/image';
import UploadIllu from '@public/images/uploading.svg'
import { RiLoader5Line } from 'react-icons/ri';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const SubmissionState = ({ message, description }: { message: string, description: string }) => {
    return (
        <div className='z-50 fixed flex flex-col gap-4 items-center justify-center w-full h-full inset-0 backdrop-blur-sm bg-gray-300/70'>
            <div className='bg-white border flex flex-col items-center px-6 py-10 rounded-lg max-w-sm w-full'>
                <Image src={UploadIllu} alt="Upload Illustration" className='w-52' />
                <AiOutlineLoading3Quarters className="animate-spin w-8 h-8 text-primary-500 mt-6" />
                <h2 className='font-medium mt-4 pb-2 text-primary-500 text-center'>{message}</h2>
                <p className='text-sm text-gray-400 max-w-[300px] text-center -mt-1.5'>{description}</p>
            </div>
        </div>
    )
}

export default SubmissionState