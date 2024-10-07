"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { ChangeEvent, useEffect, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function Main() {
    const [inputPara, setInputPara] = useState<string>('')
    const [Words, setWords] = useState<number>(0)
    const [charc, setCharc] = useState<number>(0)
    function inputHandler(e:ChangeEvent<HTMLTextAreaElement>) {
        setInputPara(e.target.value)
    }
    useEffect(() => { 
        if(inputPara){
            setWords(inputPara.split(" ").length);
            setCharc(inputPara.length);
        }
     },[inputPara])

  function clearHandler() {
    setInputPara("")
    setCharc(0)
    setWords(0)
  }

    return (
        <Card className='w-[600px] max-sm:w-full m-auto sm:mt-72 max-sm:border-none rounded-xl flex flex-col justify-center items-center'>
            <CardHeader className='text-center'>
                <CardTitle className='text-4xl max-sm:text-3xl max-sm:pb-5 max-sm:pt-5'>Word Counter</CardTitle>
                <CardDescription className='text-gray-400 text-xl'>Made by Huzaifa</CardDescription>
            </CardHeader>
            <CardContent className='w-full relative max-sm:p-2 flex flex-col items-center '>
                <Textarea className='rounded-xl resize-y h-40' placeholder='Enter Your Words Here' value={inputPara} onChange={inputHandler}></Textarea>
                <h1 className='text-gray-500 pt-5 text-xl '>   {Words} Words  {charc} Charcters</h1>
                <Button variant='outline' className='rounded-xl w-full mt-5 hover:bg-white hover:text-black' onClick={clearHandler}>Clear</Button >
            </CardContent>
        </Card>
    )
}
