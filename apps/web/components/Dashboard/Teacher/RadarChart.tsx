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
        Absent: 20,
        amt: 30,
    },
];

const RadarChartDash = () => {

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart
                data={data}
            >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false} />
                <YAxis stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`} />
                <Tooltip isAnimationActive={true} cursor={{ rx: 2, ry: 2, fill: '#ffffff20' }} wrapperStyle={{ backgroundColor: 'rgb(24 24 27)' }} />
                <Legend />
                <Bar dataKey="Absent" fill="#adfa1d" radius={[4, 4, 0, 0]} activeBar={<Rectangle fill="#adfa1d" stroke="#adfa1d" />} />
                <Bar dataKey="Present" fill="#ffffff" radius={[4, 4, 0, 0]} activeBar={<Rectangle fill="#ffffff" stroke="#ffffff" />} />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default RadarChartDash