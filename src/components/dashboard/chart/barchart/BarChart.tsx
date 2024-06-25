'use client'
import React from 'react'
import Chart from 'react-apexcharts'

interface BarChartProps {
    items:{
        title:string
        count:number
    }[]
    name:string
}
const BarChart = ({items,name}: BarChartProps) => {
    const state = {
        options: {
            colors: ['#5C37EB', '#705AF8', '#5C37EB'],
            chart: {
                id: 'apexchart-example'
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
        <Chart options={state.options} series={state.series} type="bar" height={320} />
    )
}

export default BarChart