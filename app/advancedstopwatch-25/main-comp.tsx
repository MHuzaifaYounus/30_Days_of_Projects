"use client"
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from 'react'

export default function Main() {
    const [isRunning, setIsRunning] = useState<boolean>(false)
    const [timeDuration, setTimeDuration] = useState<number>(0)
    const [time, setTime] = useState<string>('00:00:00')
    const [laps, setlaps] = useState<string[]>([])
    function startHandler() {
        setIsRunning(!isRunning)
    }
    function resetHandler() {
        setIsRunning(false)
        setTimeDuration(0)
        setlaps([])
    }
    function lapHandler() {
        setlaps([...laps, time])
    }
    function formatTime() {
        const min = Math.floor(timeDuration / 60000)
        const sec = Math.floor((timeDuration % 60000) / 1000)
        const milisec = Math.floor((timeDuration % 1000) / 10)
        setTime(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}:${milisec.toString().padStart(2, "0")}`)
    }
    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isRunning) {
            interval = setInterval(() => {
                setTimeDuration((prevTime) => prevTime + 10);
            }, 10)
        }
        return () => clearInterval(interval)
    }, [isRunning])
    useEffect(() => {
        formatTime()
    }, [timeDuration])


    return (
        <Card className='w-[600px] max-sm:w-full m-auto sm:mt-32 max-sm:border-none rounded-xl flex flex-col justify-center items-center'>
            <CardHeader className='text-center'>
                <CardTitle className='text-4xl max-sm:text-3xl max-sm:pb-5 max-sm:pt-5'>Stop Watch App</CardTitle>
                <CardDescription className='text-gray-400 text-xl'>Made by Huzaifa</CardDescription>
            </CardHeader>
            <CardContent className='w-full relative max-sm:p-2 flex flex-col items-center '>
                <h1 className='text-7xl  font-bold '>{time}</h1>
                <div className='w-[80%] flex justify-around pt-10'>
                    <Button variant='outline' className='hover:bg-white hover:text-black rounded-xl' onClick={resetHandler}>Reset</Button>
                    <Button variant='outline' className='hover:bg-white hover:text-black rounded-xl' onClick={startHandler}>{!isRunning ? "Start" : "Stop"}</Button>
                    <Button variant='outline' className='hover:bg-white hover:text-black rounded-xl' onClick={lapHandler}>Lap</Button>
                </div>
                <div className='w-[90%] m-auto mt-10  max-h-[400px] overflow-y-scroll custom-scrollbar'>
                    <Table >
                        <TableHeader>
                            <TableRow>
                                <TableHead className=" text-left ">Laps</TableHead>
                                <TableHead className=" text-left "></TableHead>
                                <TableHead className=" text-left "></TableHead>
                                <TableHead className="text-right">Time</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {laps.map((lap, index) => {
                                return <TableRow key={index}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell className="text-right">{lap}</TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </div>

            </CardContent>
        </Card>
    )
}
