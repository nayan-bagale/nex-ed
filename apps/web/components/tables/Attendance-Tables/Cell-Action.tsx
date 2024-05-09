"use client";

import { StudentA, useAttendance } from "@/components/Attendance/ContextAPI";
import { Button } from "@/components/ui/button";
import { Attendance } from "@/types/attendance-table";

import { useEffect, useMemo, useState } from "react";


interface CellActionProps {
    data: Attendance;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const [select, setSelect] = useState('');
    const { allow, students, setStudents } = useAttendance();

    useEffect(() => {
        setSelect(students.find((student: StudentA) => student.student_id === data.student_id)?.status || '');
    },[])

    useEffect(() => {
        const handleStatus = () => {
            setStudents((prev: StudentA[]) => {
                const index = prev?.findIndex((student) => student.student_id === data.student_id);
                if (index !== -1) {
                    prev[index].status = select as 'Absent' | 'Present' | '';
                    return [...prev];
                }
                return [...prev, { student_id: data.student_id, status: select }];
            }
            )
        };

        const debounce = setTimeout(() => {
            if(select === '') return;
            handleStatus();
            // console.log('debounce', students)
        }, 1000);

        return () => clearTimeout(debounce);

    }, [select]);

    return (
        <>
            <div className=" space-x-2 flex ">
                <Button size='sm' disabled={select === 'Present' || !allow} onClick={() => setSelect('Present')} variant='default'>P</Button>
                <Button size='sm' disabled={select === 'Absent' || !allow} onClick={() => setSelect('Absent')} variant='destructive'>A</Button>
            </div>
        </>
    );
};