"use client"

import React from 'react'
import ApexChart from '../ApexChart'

const RadialCircleChart = () => {
    const series = [70]
    var options = {
        chart: {
            toolbar: {
                show: false
            },
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '70%',
                }
            },
        },
        labels: ['Cricket'],
    };
    return (
        <div className='p-4 bg-white rounded-md'>
            <h2 className='text-lg font-semibold'>Radial Bar</h2>
            <ApexChart height='400px' options={options} series={series} type="radialBar" />
        </div>
    )
}

export default RadialCircleChart