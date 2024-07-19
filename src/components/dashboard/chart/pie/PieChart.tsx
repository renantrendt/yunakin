'use client'
import React from 'react'
import Chart from 'react-apexcharts'
interface PieChartOptions {
    items: {
        title: string
        count: number
    }[]
    name: string
}
const PieChart = ({ items, name }: PieChartOptions) => {
    const state = {
        series: items.map(d => Math.floor(Math.random() * 100)),
        options: {
            chart: {
                width: 380,
                type: 'donut',
            },
            labels: items.map(d => d.title),
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },
    };

    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Chart options={state.options} series={state.series} type="pie" height={320} />
    )
}

export default PieChart