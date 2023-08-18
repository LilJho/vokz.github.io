"use client"

import React from 'react'
import ApexChart from '../ApexChart'
import { ApexOptions } from 'apexcharts'

const HorizontalBarchart = () => {
    const series = [{
        name: "Scores",
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]//Update this to change the data in the chart
    }]

    const options: ApexOptions = {
        chart: {
            toolbar: {
                show: false
            },
        },
        plotOptions: {
            bar: {
                barHeight: '100%',
                distributed: true,
                horizontal: true,
                dataLabels: {
                    position: 'bottom'
                },
            }
        },
        colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
            '#f48024', '#69d2e7'
        ],
        dataLabels: {
            enabled: true,
            textAnchor: 'start',
            style: {
                colors: ['#fff']
            },
            formatter: function (val, opt) {
                return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
            },
            offsetX: 0,
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },
        grid: {
            show: false
        },
        xaxis: {
            categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
                'United States', 'China', 'India'
            ],
        },
        yaxis: {
            labels: {
                show: false
            }
        },
        tooltip: {
            theme: 'dark',
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: function () {
                        return ''
                    }
                }
            }
        }
    };

    return (
        <div className='p-4 bg-white rounded-md'>
            <h2 className='text-lg font-semibold'>Countries</h2>
            <ApexChart height='400px' options={options} series={series} type="bar" />
        </div>
    )
}

export default HorizontalBarchart