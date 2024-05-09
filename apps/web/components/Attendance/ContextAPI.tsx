'use client'
import { addAttendace } from "@/action/attendanceAction";
import cryptoRandomString from "crypto-random-string";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { formatDate } from "../utils/DateFormatter";

const AttendanceContext = createContext<null | any>(null);

export interface StudentA{
   student_id: string;
   status: 'Absent' | 'Present' | '';
}

const AttendanceProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [total, setTotal] = useState<number>(0);
    const [percentage, setPercentage] = useState<number>(0);
    const [allow, setAllow] = useState<boolean>(false);
    
    const [date, setDate] = useState<Date>();
    const [subject, setSubject] = useState<{ subject_id: string, subject_name:string}>();
    const [students, setStudents] = useState<StudentA[]>([]);

    useEffect(() => {
        const present = students.filter((s) => s.status === 'Present').length;
        setPercentage((present / total) * 100);
    }, [students.length]);

    useEffect(() => {
        if (date && subject) {
            setAllow(true);
        }
    }, [date, subject]);

    const handleInsert = async (data:any) => {
        const res = await addAttendace(data);
        if (!res.ok) {
            throw new Error(res.message);
        }
    }

    const handleSubmit = async () => {
        console.log('submitted')

        if(date === undefined){
            toast.warning('Please select the date');
            return;
        }
        if(subject === undefined){
            toast.warning('Please select the subject');
            return;
        }
        if (total !== students.length) {
            toast.warning(`Please mark the ${total - students.length} remaining attendance.`);
            return;
        }

        const data = {
            id: cryptoRandomString({ length:10 }),
            date: formatDate(date),
            subject_id: subject?.subject_id,
            subject_name: subject?.subject_name,
            students,
            mode: 'Offline',
            total_students: total,
            percentage
        }

        toast.promise(handleInsert(data), {
            loading: 'Submitting attendance...',
            success: 'Attendance submitted successfully',
            error: (e) => e.message
        });

        setDate(undefined);
        setSubject(undefined);
        setStudents([]);
        setAllow(false);
    }

    // console.log(date, subject, students)

    return (
        <AttendanceContext.Provider
            value={{
                date,
                setDate,
                subject,
                setSubject,
                students,
                setStudents,
                allow,
                handleSubmit,
                setTotal
            }}
        >
            {children}
        </AttendanceContext.Provider>
    );
};

export const useAttendance = () => useContext(AttendanceContext);

export default AttendanceProvider;