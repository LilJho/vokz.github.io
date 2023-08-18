"use client"

import React from 'react'
import ApexChart from '../ApexChart'
import { ApexOptions } from 'apexcharts'

const HorizontalBarchart = ({ data, title, height }: any) => {
    const series = data?.data

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
        colors: data?.colors,
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: 'horizontal',
                shadeIntensity: 0.25,
                // gradientToColors: ['#88D8E6', '#788D99', '#EA6C8F', '#34FFCC', '#D4BFB2', '#56D7DE', '#FBC9CB', '#C0FFC2', '#F89E56', '#95E3EB'], // Gradient end colors
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
            }
        },
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
            categories: data.categories,
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
            <h2 className='text-lg font-semibold'>{title}</h2>
            <ApexChart height={height} options={options} series={series} type="bar" />
        </div>
    )
}

export default HorizontalBarchart