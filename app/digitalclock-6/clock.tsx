"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

export default function Clock() {
    const [time, setTime] = useState<Date>(new Date())
    const [is12Hours, setIs12Hours] = useState<boolean>(false)
    const [hours, setHours] = useState<string>(String(time.getHours()))
    const [mode, setMode] = useState<string>("")

    useEffect(() => {
        const interval = setInterval(() => {
            const newTime = new Date()
            if (is12Hours) {
                const hourValue = newTime.getHours() % 12 || 12
                setHours(hourValue.toString().padStart(2, "0"))
                setMode(newTime.getHours() < 12 ? "AM" : "PM")
            } else {
                setHours(newTime.getHours().toString().padStart(2, "0"))
                setMode('')
            }
            setTime(newTime)
        })

        return () => clearInterval(interval)
    }, [is12Hours])

    return (
        <Card className='w-[600px] max-sm:w-full m-auto sm:mt-72 max-sm:border-none rounded-xl flex flex-col justify-center items-center'>
            <CardHeader className='text-center'>
                <CardTitle className='text-4xl max-sm:text-3xl max-sm:pb-5 max-sm:pt-5'>Digital Clock</CardTitle>
                <CardDescription className='text-gray-400 text-xl'>Made by Huzaifa</CardDescription>
            </CardHeader>
            <CardContent className='w-full relative max-sm:p-2 flex flex-col items-center '>
                <p className='absolute right-16 text-lg'>{mode}</p>
                <h1 className='text-8xl'>{hours}:{time.getMinutes().toString().padStart(2, "0")}:{time.getSeconds().toString().padStart(2, "0")}</h1>
                <div className='flex w-full justify-around pt-14'>
                    <Button
                        variant='outline'
                        className={`rounded-xl ${is12Hours ? "bg-white text-black hover:bg-white hover:text-black" : "hover:bg-white hover:text-black"}`}
                        onClick={() => setIs12Hours(true)}
                    >
                        12 Hours Format
                    </Button>
                    <Button
                        variant='outline'
                        className={`rounded-xl ${!is12Hours ? "bg-white text-black hover:bg-white hover:text-black" : "hover:bg-white hover:text-black"}`}
                        onClick={() => setIs12Hours(false)}
                    >
                        24 Hours Format
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
