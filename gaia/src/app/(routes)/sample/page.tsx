import AreaChart from '@/components/ui/Charts/AreaChart'
import BasicBarChart from '@/components/ui/Charts/BasicBarChart'
import HorizontalBarchart from '@/components/ui/Charts/HorizontalBarchart'
import RadialCircleChart from '@/components/ui/Charts/RadialCircleChart'
import TimeLineChart from '@/components/ui/Charts/TimeLineChart'
import Loaders from '@/components/ui/Loaders'
import { Button } from '@/components/ui/button'
import React from 'react'

const page = () => {
    return (
        <div className='grid grid-cols-2 gap-4'>
            <div className=''>
                <h4 className='text-lg font-semibold mb-2'>Horizontal Bar graph with labels and value inside</h4>
                <HorizontalBarchart />
            </div>
            <div>
                <h4 className='text-lg font-semibold mb-2'>Area chart</h4>
                <AreaChart />
            </div>
            <div>
                <h4 className='text-lg font-semibold mb-2'>Basic Bar chart</h4>
                <BasicBarChart />
            </div>
            <div>
                <h4 className='text-lg font-semibold mb-2'>Time Line chart</h4>
                <TimeLineChart />
            </div>
            <div>
                <h4 className='text-lg font-semibold mb-2'>Time Line chart</h4>
                <RadialCircleChart />
            </div>
            <div>
                <Loaders />
                <Loaders variant="success" />
                <Loaders variant='warning' />
                <Loaders variant='destructive' />
                <Loaders />
                <Loaders variant="success" type="ping" />
                <Loaders variant='warning' type="ping" />
                <Loaders variant='destructive' type="ping" />
            </div>
            <div>
                <Button>Hello</Button>
                <Button isLoading>loading</Button>
            </div>
        </div>
    )
}

export default page