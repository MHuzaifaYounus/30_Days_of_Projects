"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChangeEvent, useEffect, useState } from 'react'


export default function GuessingComp() {
    const [isStart, setIsStart] = useState<boolean>(false)
    const [isWon, setIsWon] = useState<boolean>(false)
    const [islose, setIsLose] = useState<boolean>(false)
    const [inputNum, setInputNum] = useState<number | string>()
    const [ranNum, setRanNum] = useState<number>()
    const [attempts, setAttempts] = useState<number>(10)
    const [hint, setHint] = useState<string>()
    const [winMsg, setWinMsg] = useState<string>()
    const [lossMsg, setLossMsg] = useState<string>()
    const [errMsg, setErrMsg] = useState<string>()

    useEffect(() => {
        if (isStart) {
            setRanNum(Math.floor(Math.random() * 100) + 1)
        }
    }, [isStart])


    function StartGame() {
        setAttempts(10)
        setIsStart(true)
        setIsWon(false)
        setWinMsg('')
        setLossMsg('')
        setIsLose(false)
    }
    function inputHandler(e: ChangeEvent<HTMLInputElement>) {
        setInputNum(Number(e.target.value))

    }


    function guessHandler() {
        if (typeof inputNum === "number" && inputNum > 0 && inputNum <= 100) {
            const newAttempts = attempts - 1; 
            if (newAttempts === 0) {
                setLossMsg(`Oh! , You lost. The Number is ${ranNum}`);
                setIsLose(true)
                setIsStart(false);
                setErrMsg('');
                setHint('');
                setAttempts(newAttempts);
            }
            else {
                setAttempts(newAttempts);
                if (inputNum > ranNum) {
                    setErrMsg('');
                    setHint(`${inputNum} is greater than the actual number.`);
                } else if (inputNum < ranNum) {
                    setErrMsg('');
                    setHint(`${inputNum} is less than the actual number.`);
                } else {
                    setIsWon(true);
                    setIsStart(false);
                    setWinMsg(`Congratulations!! You guessed the number in ${10 - newAttempts} attempts.`);
                    setErrMsg('');
                    setHint('');
                }
            }

        }
        else {
            setHint('')
            setErrMsg("Please enter a valid number")

        }
    }


    return <Card className='w-[600px] max-sm:w-full m-auto sm:mt-72 max-sm:border-none rounded-xl flex flex-col justify-center items-center'>
        <CardHeader className='text-center'>
            <CardTitle className='text-4xl max-sm:text-3xl max-sm:pb-5 max-sm:pt-5'>Number Guessing Game</CardTitle>
            <CardDescription className='text-gray-400 text-xl' >Guess a number from 1 to 100</CardDescription>
        </CardHeader>
        <CardContent className='w-full max-sm:p-2 flex flex-col items-center '>
            {(isStart && !isWon && !islose) && <div className='flex w-full max-sm:flex-col max-sm:items-center'>
                <Input type='number' className='rounded-xl' placeholder='Enter your guess' onChange={inputHandler} />
                <Button className='border max-sm:mt-4 sm:ml-5 rounded-xl hover:bg-white hover:text-black ' onClick={guessHandler}>Guess</Button>
            </div>}
            {(!isStart && !isWon && !islose) && <Button onClick={StartGame} className='border rounded-xl hover:bg-white font-bold hover:text-black'>Start Game</Button>}
            {(isWon || islose )&& <Button onClick={StartGame} className='border rounded-xl hover:bg-white font-bold hover:text-black'>Try Again</Button>}
            {(!isWon && !islose && isStart) && <p className='text-lg pt-10 pb-5'>Remaining Attempts: {attempts}</p>}
            {hint && <p className='text-lg text-center pt-10 pb-5'>{hint}</p>}
            {winMsg && <p className='text-lg text-center text-green-600 pt-10 pb-5'>{winMsg}</p>}
            {errMsg && <p className='text-lg text-center text-red-600 pt-10 pb-5'>{errMsg}</p>}
            {lossMsg && <p className='text-lg text-center text-red-600 pt-10 pb-5'>{lossMsg}</p>}
        </CardContent>
    </Card>

}