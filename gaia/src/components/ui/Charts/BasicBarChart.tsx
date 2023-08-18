import React from 'react'
import ApexChart from '../ApexChart';
import { ApexOptions } from 'apexcharts';

const BasicBarChart = () => {
    const series = [
        {
            name: "Exteral Cost",
            data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
        }, {
            name: "Internal Cost",
            data: [44, 55, 41, 64, 22, 43, 21, 448, 470, 540]
        }
    ]

    const options: ApexOptions = {
        chart: {
            toolbar: {
                show: false
            },
        },
        colors: ['#33b2df', '#546E7A', '#d4526e',
        ],
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
        },
        tooltip: {
            theme: 'dark',
        }

    };

    return (
        <div className='p-4 bg-white rounded-md'>
            <h2 className='text-lg font-semibold'>Cost</h2>
            <ApexChart height='400px' options={options} series={series} type="bar" />
        </div>
    )
}

export default BasicBarChart