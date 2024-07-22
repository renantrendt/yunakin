'use client'
import React from 'react'
import Chart from 'react-apexcharts'

interface BarChartProps {
    items: {
        title: string
        count: number
    }[]
    name: string
}
const BarChart = ({ items, name }: BarChartProps) => {
    const state = {

        options: {
            colors: ['rgba(255, 221, 4, 1)', 'rgba(255, 221, 4, 1)', 'rgba(255, 221, 4, 1)'],
            chart: {
                id: 'apexchart-example',
                toolbar: {
                    show: false
                }
            },
            xaxis: {
                categories: items.map(d => d.title)
            }
        },
        series: [{
            name: name,
            data: items.map(d => d.count),
        }]
    }

    return (
        <Chart options={state.options} series={state.series} type="bar" height={300} />
    )
}

export default BarChart