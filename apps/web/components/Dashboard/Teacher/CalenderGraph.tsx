'use client'

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
      <div className='max-w-60 md:max-w-72 lg:max-w-80 flex flex-col gap-2 items-center justify-center p-2'>
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
  )
}

export default CalenderGraph