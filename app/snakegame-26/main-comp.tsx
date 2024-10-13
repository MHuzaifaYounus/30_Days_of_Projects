"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { PlayIcon, PauseIcon, RefreshCcwIcon } from 'lucide-react';
import { KeyboardEvent, useEffect, useState } from 'react';


export default function Main() {
    const grid_len = 15;
    type Point = {
        x: number;
        y: number;
    }
    type Direction = "Up" | "Down" | "Left" | "Right"

    const [snake, setSnake] = useState<Point[]>([
        { x: 2, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 0 },
    ])
    const [food, setFood] = useState<Point>({ x: 5, y: 5 })
    const [direction, setDirection] = useState<Direction>("Right")
    const [gameOver, setGameOver] = useState<boolean>(false)
    const [isRunning, setIsRunning] = useState<boolean>(true)
    const [Score, setScore] = useState<number>(0)

    function refreshHandler() {
        setGameOver(false)
        generateFood()
        setSnake([
            { x: 2, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: 0 },
        ])
        setIsRunning(true)
        setDirection("Right")
        setScore(0)

    }
    function PauseHandler() {
        setIsRunning(!isRunning)
    }
    function generateFood() {
        const x = Math.floor(Math.random() * grid_len)
        const y = Math.floor(Math.random() * grid_len)
        snake.forEach((points) => {
            if (points.x != x && points.y != y) {
                setFood({ x, y })
            }
        })
    }
    function moveSnake() {
        const newSnake = [...snake]
        const snakeHead = { ...newSnake[0] }
        if (direction === "Right") {
            snakeHead.x += 1
        }
        if (direction === "Left") {
            snakeHead.x -= 1
        }
        if (direction === "Up") {
            snakeHead.y -= 1
        }
        if (direction === "Down") {
            snakeHead.y += 1
        }
        if (
            snakeHead.x < 0 ||
            snakeHead.x > grid_len ||
            snakeHead.y < 0 ||
            snakeHead.y > grid_len ||
            snake.some((points) => points.x === snakeHead.x && points.y === snakeHead.y)
        ) {
            setGameOver(true)
            setIsRunning(false)
            return;
        }
        newSnake.unshift(snakeHead)
        if (snakeHead.x === food.x && snakeHead.y === food.y) {
            generateFood()
            setScore(prev => prev += 1)
        }
        else {
            newSnake.pop()
        }

        setSnake(newSnake)
    }
    function handleKeyPress(event: KeyboardEvent<HTMLDivElement>) {
        if (isRunning) {
            if (event.key === "ArrowUp" && direction != "Down") {
                setDirection("Up")
            }
            if (event.key === "ArrowDown" && direction != "Up") {
                setDirection("Down")
            }
            if (event.key === "ArrowRight" && direction != "Left") {
                setDirection("Right")
            }
            if (event.key === "ArrowLeft" && direction != "Right") {
                setDirection("Left")
            }
        }
    }

    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(moveSnake, 60)
            return () => clearInterval(interval)
        }
    }, [snake, direction, isRunning])

    useEffect(() => {
        generateFood()
    }, [])


    return (
        <Card className='w-[600px] max-sm:w-full m-auto sm:mt-20 max-sm:border-none rounded-xl flex flex-col justify-center items-center' onKeyDown={handleKeyPress} tabIndex={0} autoFocus>
            <CardHeader className='text-center'>
                <CardTitle className='text-4xl max-sm:text-3xl max-sm:pb-5 max-sm:pt-5'>Snake Game</CardTitle>
                <CardDescription className='text-gray-400 text-xl'>Made by Huzaifa</CardDescription>
            </CardHeader>
            <CardContent className='w-full relative max-sm:p-2 flex flex-col items-center ' >

                <div className={`grid grid-cols-15 grid-rows-15 ${gameOver ? "bg-red-900" : "bg-gray-900"} rounded-xl p-2`}>
                    {Array.from({ length: grid_len }).map((_, y) => (
                        <div key={y} className="flex">
                            {Array.from({ length: grid_len }).map((_, x) => (

                                <div key={x} className={`w-4 h-4 bg-black rounded-xl relative m-1 ${snake.some((points) => points.x === x && points.y === y) && "bg-green-500"} ${(food.y === y && food.x === x) && "bg-red-600"}`}></div>

                            ))}
                        </div>
                    ))}
                </div>
                <div className='w-full flex justify-around pt-10 '>
                    <div className='h-10 w-10 hover:bg-gray-800 rounded-xl flex justify-center items-center transition-all cursor-pointer' onClick={PauseHandler}>
                        {isRunning ? <PauseIcon></PauseIcon> : <PlayIcon ></PlayIcon>}

                    </div>
                    <div className='h-10 w-10 hover:bg-gray-800 rounded-xl flex justify-center items-center transition-all cursor-pointer' onClick={refreshHandler}>
                        <RefreshCcwIcon></RefreshCcwIcon>
                    </div>
                    <h1 className='text-xl pt-2'>Score:{Score}</h1>

                </div>
            </CardContent>
        </Card>
    )
}
