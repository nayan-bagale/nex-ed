'use client'

import React from 'react'
import { ResponsiveContainer, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend, Radar, RadarChart, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid} from 'recharts';

const data = [
    {
        name: 'Jan',
        Present: 10,
        Absent: 20,
        amt: 30,
    },
    {
        name: 'Feb',
        Present: 20,
        Absent: 10,
        amt: 30,
    },
    {
        name: 'Mar',
        Present: 25,
        Absent: 5,
        amt: 30,
    },
    {
        name: 'Apr',
        Present: 29,
        Absent: 1,
        amt: 30,
    },
];

const RadarChartDash = () => {

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={true} />
                <YAxis stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={true}
                    tickFormatter={(value) => `${value}`} />
                <Tooltip isAnimationActive={true} cursor={{ rx: 2, ry: 2, fill: '#ffffff20' }} wrapperStyle={{ backgroundColor: 'rgb(24 24 27)' }} />
                <Legend />
                <Bar dataKey="Absent" fill="#adfa1d" activeBar={<Rectangle fill="#adfa1d" stroke="#adfa1d" />} />
                <Bar dataKey="Present" fill="#ffffff" activeBar={<Rectangle fill="#ffffff" stroke="#ffffff" />} />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default RadarChartDash