'use client';

import React, { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button';
import { join_subject_Action } from '@/action/subject_Action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { sleep } from '@/components/utils/sleep';

const JoinForm = ({ id }: { id: string }) => {

    const [loading, setLoading] = useState(false);
    const [bool, setBool] = useState(false);
    const route = useRouter();

    const handleSubmit = async () => {
        const res = await join_subject_Action(id);
        console.log(res)
        if (!res.ok) {
            throw new Error(res.message);
        }
        return res;
    }

    const onSubmit = async () => {
        setLoading(true);
        const d = toast.promise(handleSubmit(), {
            loading: 'Joining Class...',
            success: (res) => {
                setBool(true);
                return res.message
            },
            error: (err) => err.message
        });
        setLoading(false);
    };

    useMemo(() => {
        if (bool) {
            sleep(1000).then(() => {
                route.push('/class');
            })
        }
    }, [bool])

    return (
        <>

            <Button disabled={loading} onClick={onSubmit} className="ml-auto w-full" type="submit">
                Join Class
            </Button>

        </>
    )
}

export default JoinForm