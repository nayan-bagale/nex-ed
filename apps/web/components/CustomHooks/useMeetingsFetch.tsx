import { get_schedule_meeting } from '@/action/meetingAction';
import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil';
import { scheduleMeeting } from '../Store/meeting';

const useMeetingsFetch = () => {
    const setMeetings = useSetRecoilState(scheduleMeeting);
    useEffect(() => {
        const fetchmeetings = async () => {
            const res = await get_schedule_meeting();
            if (res && res?.ok) {
                const pro_data = res?.data?.map((meeting) => {
                    return {
                        id: meeting.id,
                        title: meeting.title,
                        subject_id: meeting.subject_id,
                        date: meeting.date,
                        starttime: meeting.start_time,
                        endtime: meeting.end_time,
                        teacher: meeting.teacher_id,
                        cameraAlwaysOn: meeting.camera,
                        visibility: meeting.visibility ? 'public' : 'private' as 'public' | 'private',
                    }
                })
                if (pro_data !== undefined) {
                    setMeetings((prev) => [...prev, ...pro_data])
                }
            }
        }
        fetchmeetings();
    }, [])
}

export default useMeetingsFetch