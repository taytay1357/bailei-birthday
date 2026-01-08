"use client"
import { useState, useEffect } from 'react';
import { getTimeRemaining } from '../services/countdownService';

export function Countdown({target, isTimerExpired, setTimerExpired})
{
    const [time, setTime] = useState(() => getTimeRemaining(target))

    const toggleTimerExpired = () => setTimerExpired(!isTimerExpired);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(getTimeRemaining(target))
        }, 1000);

        return () => clearInterval(interval);
    }, [target]);

    useEffect(() => {
        if (time.done && !isTimerExpired) {
            setTimerExpired(true);
        }
    }, [time.done, isTimerExpired, setTimerExpired]);


    return (
        <div className="w-full h-6/10 flex justify-center items-center flex-col">
            <h2 className="text-6xl md:text-8xl lg:text-9xl my-10 font-['Londrina_Outline'] text-center z-20">BAILEI'S BIRTHDAY STARTS IN</h2>
            <p className="text-6xl md:text-8xl lg:text-9xl font-['Londrina_Outline'] rainbow-text z-20">{time.days} : {time.hours} : {time.minutes} : {time.seconds}</p>
        </div>
        
    )
}