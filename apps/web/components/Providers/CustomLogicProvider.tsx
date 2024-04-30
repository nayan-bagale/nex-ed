'use client';

import React, { FC } from 'react'
import useMeetingsFetch from '../CustomHooks/useMeetingsFetch';
// import useInstantMeetingsFetch from '../CustomHooks/useInstantMeetingsFetch';

const CustomLogicProvider:FC<{children: React.ReactNode}> = ({children}) => {
  
    useMeetingsFetch();
    // useInstantMeetingsFetch();
    
    return (
    <>
    {children}
    </>
  )
}

export default CustomLogicProvider