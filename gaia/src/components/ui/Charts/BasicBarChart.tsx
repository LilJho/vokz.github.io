import React from 'react'
import ApexChart from '../ApexChart';
import { ApexOptions } from 'apexcharts';

const BasicBarChart = ({ data, title, height }: any) => {
    const series = data.data

    const options: ApexOptions = {
        chart: {
            toolbar: {
                show: false
            },
        },
        colors: data?.colors,
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: data?.categories,
        },
        tooltip: {
            theme: 'dark',
        }

    };

    return (
        <div className='p-4 bg-white rounded-md'>
            <h2 className='text-lg font-semibold'>{title}</h2>
            <ApexChart height={height} options={options} series={series} type="bar" />
        </div>
    )
}

export default BasicBarChart