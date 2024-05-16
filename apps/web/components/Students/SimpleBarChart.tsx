import { getStudentData } from '@/action/studentsAction';
import React, { FC, useMemo } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

export const SimpleBarChart:FC<{id:string}> = ({id}) => {
    const [studentData, setStudentData] = React.useState<{
        name: string;
        Present: number;
        Absent: number;
    }[]>([]);

    useMemo(() => {
        const fetchdata = async () => {
           const res = await getStudentData(id);
           console.log(res)
           if(!res?.ok || !res?.data) return;
           setStudentData(res?.data);
        }
        fetchdata();
        // console.log(id)
    }, [id])

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart
                width={500}
                height={300}
                data={studentData}
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
                    axisLine={false} />
                <YAxis stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`} />
                {/* <Tooltip /> */}
                <Legend />
                <Bar dataKey="Absent" fill="#adfa1d" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                <Bar dataKey="Present" fill="#ffffff" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            </BarChart>
        </ResponsiveContainer>
    );

}
