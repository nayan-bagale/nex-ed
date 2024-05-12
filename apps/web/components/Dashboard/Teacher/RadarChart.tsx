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
    {
        name: 'Apr',
        Present: 29,
        Absent: 20,
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
                <Tooltip isAnimationActive={true} cursor={{ rx: 2, ry: 2, fill: 'hsl(var(--secondary))' }} wrapperStyle={{ backgroundColor: 'hsl(var(--secondary))' }} />
                {/* <Legend /> */}
                <Bar dataKey="Absent" className=' fill-primary' radius={[4, 4, 0, 0]} activeBar={<Rectangle className=' fill-primary' stroke="fill-primary" />} />
                <Bar dataKey="Present" fill="#dddddd" radius={[4, 4, 0, 0]} activeBar={<Rectangle fill="#dddddd"  stroke="#dddddd" />} />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default RadarChartDash