import { get_subject_by_teacher_id } from '@/action/meetingAction'
import { SelectItem } from '@/components/ui/select'
import React, { useEffect } from 'react'

const SelectItemsFetch = () => {
    const [data, setData] = React.useState<{ name: string, id: string }[]>([])
    useEffect(() => {
        const fetchData = async () => {
            const res = await get_subject_by_teacher_id();
            if (res.ok && res.data) {
                setData(res.data)
            }
        }
        fetchData()
    }, [])

    return data.map((item) => (
        <SelectItem value={`${item.id}:${item.name}`}>{item.name}</SelectItem>
    ));
}

export default SelectItemsFetch