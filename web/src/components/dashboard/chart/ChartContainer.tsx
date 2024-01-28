'use client'
import React from 'react'
import BarChart from './barchart/BarChart'
import LineChart from './linechart/LineChart'

const ChartContainer = () => {
    return (
        <div className='chart-container grid grid-cols-2 gap-x-8'>
            <div className="bar-chart card bg-gray-900  pt-4 flex justify-center shadow-md rounder-lg my-4 text-black" >
                <BarChart />
            </div>
            <div className="bar-chart card bg-gray-900  pt-4 flex justify-center shadow-md rounder-lg my-4 text-black" >
                <LineChart />
            </div>
            <div className="bar-chart card bg-gray-900  pt-4 flex justify-center shadow-md rounder-lg my-4 text-black" >
                <BarChart />
            </div>
            <div className="bar-chart card bg-gray-900  pt-4 flex justify-center shadow-md rounder-lg my-4 text-black" >
                <LineChart />
            </div>
        </div>
    )
}

export default ChartContainer