import Image from 'next/image'
import NoDataIllu from '@public/images/No data-rafiki.png'

const NoDataFound = ({ readOnly }: { readOnly?: boolean }) => {
    return (
        <div className='flex flex-col gap-1 items-center justify-center'>
            <Image src={NoDataIllu} alt="No Data Illustration" className='w-32' />
            <h4 className={`text-lg font-semibold ${readOnly && "pb-2"}`}>No data available.</h4>
            {!readOnly && <p className='text-sm text-gray-400 -mt-1'>Click the add new field button to add information.</p>}
        </div>
    )
}

export default NoDataFound