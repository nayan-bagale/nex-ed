import React, { useEffect } from 'react'
import { instantMeeting } from '../Store/meeting';
import { useSetRecoilState } from 'recoil';
import { get_instant_meeting } from '@/action/meetingAction';

const useInstantMeetingsFetch = () => {
    const setInstantMeetings = useSetRecoilState(instantMeeting);

    useEffect(() => {
        const fetchInstantMeetings = async () => {
            const res = await get_instant_meeting();
            if (res.ok) {
                const pro_data = res?.data?.map((meeting) => {
                    return {
                        id: meeting.id,
                        title: meeting.title,
                        date: meeting.date,
                        host_id: meeting.host_id,
                        visibility: 'public' as 'public' | 'private',
                    }
                })

                if (pro_data !== undefined) {
                    setInstantMeetings((prev) => [...prev, ...pro_data]);
                }
            }
        }
        fetchInstantMeetings();
    }, [])

}

export default useInstantMeetingsFetch