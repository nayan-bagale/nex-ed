'use client'

import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import CalendarHeatmap, { ReactCalendarHeatmapValue } from 'react-calendar-heatmap';
// import 'react-calendar-heatmap/dist/styles.css';

const CalenderGraph = () => {
    const [value, setValue] = useState<ReactCalendarHeatmapValue<string>>();
    const state = {
        // Some dates to render in the heatmap
        values: [
            { date: '2024-05-01', count: 122 },
            { date: '2024-02-22', count: 4 },
            { date: '2024-03-30', count: 3 },
        ],
    }

    return (
        <div className='flex w-full flex-col md:flex-row gap-2'>
            <div className=' max-w-72 md:max-w-72 lg:max-w-80 w-full flex-col gap-2 items-center justify-center p-2'>
                <CalendarHeatmap
                    endDate={new Date()}
                    startDate={new Date('2024-02-01')}
                    gutterSize={2}
                    values={state.values}
                    onClick={(value) => setValue(value)}
                    titleForValue={(value: any) => `Count: ${value?.count} submissions on ${value?.date}`}
                />
                <p className="text-sm text-muted-foreground">
                    {value ? `${value.count} lectures taken on ${value.date} ` : 'Hover over a square'}
                </p>
            </div>

            <div className=' flex-none'>
                <Separator orientation='vertical' />
            </div>

            <div className='flex flex-col w-full gap-2'>
                <div className='flex  justify-between'>
                    <h2 className=' text-sm md:text-base'>Blockchain:</h2>
                    <p className=' text-xs text-muted-foreground md:text-sm'>10 lectures taken</p>
                </div>
                <div className='flex  justify-between'>
                    <h2 className=' text-sm md:text-base'>Machine Learning:</h2>
                    <p className=' text-xs text-muted-foreground md:text-sm'>10 lectures taken</p>
                </div>
            </div>
        </div>
    )
}

export default CalenderGraph