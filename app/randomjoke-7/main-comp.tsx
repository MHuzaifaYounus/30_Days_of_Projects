"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

export default function Main() {
    const [joke, setJoke] = useState<string>('')
    interface Joke {
        setup: string,
        punchline: string,
    }
    async function getJoke():Promise<void> {
        const response = await fetch("https://official-joke-api.appspot.com/random_joke")
        const data :Joke = await response.json()
        setJoke(data.setup + " - " + data.punchline)
    }
    useEffect(() => {
        getJoke()
    },[])
    function generateJoke() {
        getJoke()
    }
    return (
        <Card className='w-[600px] max-sm:w-full m-auto sm:mt-72 max-sm:border-none rounded-xl flex flex-col justify-center items-center'>
            <CardHeader className='text-center'>
                <CardTitle className='text-4xl max-sm:text-3xl max-sm:pb-5 max-sm:pt-5'>😂Random Joke Generator🎉</CardTitle>
                <CardDescription className='text-gray-400 text-xl'>Made by Huzaifa</CardDescription>
            </CardHeader>
            <CardContent className='w-full relative max-sm:p-2 flex flex-col items-center '>
                <div className='w-full p-10 pb-10 text-center text-xl'>{joke? joke : "Loading...."}</div>
                <Button className='rounded-xl hover:bg-white hover:text-black ' variant='outline' onClick={generateJoke}>😂 Genrate a Joke 😂</Button>

            </CardContent>
        </Card>
    )
}
