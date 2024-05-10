'use client'

import React from 'react'
import { ResponsiveContainer, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend, Radar, RadarChart, PieChart, Pie, Cell, Tooltip } from 'recharts'

const RadarChartDash = () => {
    const data = [
        {
            "name": "Present",
            "value": 56
        },
        {
            "name": "Absent",
            "value": 44
        },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }:any) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <ResponsiveContainer width="100%" height={150}>
            <PieChart width={730} height={450}>
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} label={renderCustomizedLabel} fill="#8884d8" labelLine={false} >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    <Cell key={`radar-454`} fill="#82ca9d" fillOpacity={0.6} />
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    )
}

export default RadarChartDash