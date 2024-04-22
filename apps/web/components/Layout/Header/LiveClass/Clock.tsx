'use client'
import { Badge } from "@/components/ui/badge";
import React, { useState, useEffect } from "react";

const Clock = () => {
    let timeStart = 0;
    const [time, setTime] = useState(timeStart);
    useEffect(() => {
        const current = setInterval(() => {
            setTime((prvTime) => prvTime + 1);
        }, 1000);
        return () => {
            clearInterval(current);
        };
    }, []);


    var hours = Math.floor(time / 3600);
    var minutes = Math.floor((time - hours * 3600) / 60);
    var seconds = time - hours * 3600 - minutes * 60;

    return (
        <Badge variant='secondary' >{hours} : {minutes}: {seconds}</Badge>
    );
};

export default Clock;