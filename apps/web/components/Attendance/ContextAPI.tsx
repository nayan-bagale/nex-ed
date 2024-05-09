'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const AttendanceContext = createContext<null | any>(null);

export interface StudentA{
   student_id: string;
   status: 'Absent' | 'Present' | '';
}

const AttendanceProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [present, setPresent] = useState<number>(0);
    const [absent, setAbsent] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [percentage, setPercentage] = useState<number>(0);
    const [allow, setAllow] = useState<boolean>(false);
    
    const [date, setDate] = useState<Date>();
    const [subject, setSubject] = useState<string>('');
    const [students, setStudents] = useState<StudentA[]>([]);

    useEffect(() => {
        setPercentage((present / total) * 100);
    }, [present, total]);

    useEffect(() => {
        if (date && subject) {
            setAllow(true);
        }
    }, [date, subject]);

    const handleSubmit = () => {
        console.log('submitted')
        toast.success('Attendance submitted successfully');
    }

    console.log(date, subject, students)

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
                handleSubmit
            }}
        >
            {children}
        </AttendanceContext.Provider>
    );
};

export const useAttendance = () => useContext(AttendanceContext);

export default AttendanceProvider;