'use client'

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FC, useState } from 'react';
import CalendarHeatmap, { ReactCalendarHeatmapValue } from 'react-calendar-heatmap';
// import 'react-calendar-heatmap/dist/styles.css';

interface CalenderGraphProps {
    dates: {
        date: string,
        count: number
    }[],
    data: {
        [key: string]: {
            subject_id: string;
            // total_strudents: number;
            subject_name: string;
            status: string;
        }[];
    } 
}

const CalenderGraphStudent:FC<CalenderGraphProps> = ({dates, data}) => {
    
    const [value, setValue] = useState<ReactCalendarHeatmapValue<string>>();

    return (
        <div className='flex w-full flex-col md:flex-row gap-2'>
            <div className=' max-w-72 md:max-w-72 lg:max-w-80 w-full flex-col gap-2 items-center justify-center p-2'>
                <CalendarHeatmap
                    endDate={new Date()}
                    startDate={new Date('2024-03-01')}
                    gutterSize={2}
                    values={dates}
                    onClick={(value) => setValue(value)}
                    titleForValue={(value: any) => `Count: ${value?.count} submissions on ${value?.date}`}
                />
            </div>

            <div className=' flex-none'>
                <Separator orientation='vertical' />
            </div>

            <div className='flex flex-col w-full gap-2'>
                <p className="text-sm text-muted-foreground">
                    {value ? `${data[value?.date].length} lectures addended on ${value.date} ` : 'No lecture attended'}
                </p>
                {
                    value && data[value.date].map((e) => {
                        return (
                            <div className='flex justify-between'>
                                <h2 className=' text-sm md:text-base'>{e.subject_name}:</h2>
                                <p className=' text-xs text-muted-foreground md:text-sm'>
                                    {e.status === 'Present' ? <Badge>Present</Badge> : <Badge variant={'destructive'}>Absent</Badge>}
                                    </p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CalenderGraphStudent