"use client";

import { Button } from "@/components/ui/button";
import { User } from "@/data/data";

import { useState } from "react";


interface CellActionProps {
    data: User;
    action: 'absent' | 'present';
}

export const CellAction: React.FC<CellActionProps> = ({ data, action }) => {
    const [select, setSelect] = useState('');

    return (
        <>
            <div className=" space-x-2 flex ">
                <Button disabled={select === 'present'} onClick={() => setSelect('present')} variant='default'>P</Button>
                <Button disabled={select === 'absent'} onClick={() => setSelect('absent')} variant='destructive'>A</Button>
            </div>
        </>
    );
};