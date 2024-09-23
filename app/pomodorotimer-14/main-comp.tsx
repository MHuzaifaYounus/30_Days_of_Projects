"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { MinusIcon, PauseIcon, PlayIcon, PlusIcon, RefreshCwIcon } from "lucide-react";
import { useEffect, useState, useRef } from 'react';
export default function Main() {
    const [timeleft, setTimeleft] = useState<number>(25*60)
    const [formatedTime, setFormatedTime] = useState<string>()
    const [isStart, setIsStart] = useState<boolean>(false)
    const [timerState, setTimerState] = useState<"Work" | "Break">("Work")
    const timerRef = useRef<number | null>(null);

    function formatTime() {
        const mins = timeleft / 60
        const secs = timeleft % 60
        setFormatedTime(`${Math.floor(mins).toString().padStart(2, "0")}:${Math.floor(secs).toString().padStart(2, "0")}`)
    }
    function subtractTime() {
        if (timeleft > 60) {
            setTimeleft(prev => prev - 60)
        }

    }
    function addtTime() {
        setTimeleft(prev => prev + 60)
    }
    function startHandler() {
        if (isStart) {
            setIsStart(false)

        }
        else {

            setIsStart(true)
        }
    }
    function resetHandler() {
        setIsStart(false)
        setTimeleft(1500)
    }
    function changeState() {
        if (timeleft <= 0) {
            if (timerState === "Work") {
                setTimerState("Break")
                setTimeleft(5*60)
            }
            else if (timerState === "Break") {
                setTimerState("Work")
                setTimeleft(25*60)

            }
        }
    }
    useEffect(() => {
        formatTime()
    }, [timeleft])
    useEffect(() => {
        if (isStart && timeleft > 0) {
            timerRef.current = window.setInterval(() => {
                setTimeleft(prev => prev - 1)
            }, 1000)

        }
        else if (timeleft === 0) {
            if (timerRef.current) {
                window.clearInterval(timerRef.current);
                timerRef.current = null;
            }
            changeState()
         
        }
        return () => {
            if (timerRef.current) {
                window.clearInterval(timerRef.current)
            }
        }

    }, [isStart ,timeleft])

    return (
        <Card className='w-[600px] max-sm:w-full m-auto sm:mt-72 max-sm:border-none rounded-xl flex flex-col justify-center items-center'>
            <CardHeader className='text-center'>
                <CardTitle className='text-4xl max-sm:text-3xl max-sm:pb-5 max-sm:pt-5'>Pomodoro Timer</CardTitle>
                <CardDescription className='text-gray-400 text-xl'>Made by Huzaifa</CardDescription>
            </CardHeader>
            <CardContent className='w-full relative max-sm:p-2 flex flex-col items-center '>
                <h2 className='text-xl'>{timerState}</h2>
                <h1 className='text-7xl'>{formatedTime}</h1>
                <div className='flex pt-10 w-[50%] justify-around max-sm:w-full'>
                    <MinusIcon className='cursor-pointer' onClick={subtractTime}></MinusIcon>
                    <PlusIcon className='cursor-pointer' onClick={addtTime}></PlusIcon>
                    {isStart ? <PauseIcon className='cursor-pointer' onClick={startHandler}></PauseIcon> : <PlayIcon className='cursor-pointer' onClick={startHandler}></PlayIcon>}
                    <RefreshCwIcon className='cursor-pointer' onClick={resetHandler}></RefreshCwIcon>
                </div>
            </CardContent>
        </Card>
    )
}
