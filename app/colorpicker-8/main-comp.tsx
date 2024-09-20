"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { ChangeEvent, useState} from 'react'
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
export default function Main() {
    const [colorCode, setColorCode] = useState<string>("#ffffff")
    function handelColorChange(e:ChangeEvent<HTMLInputElement>):void {
        setColorCode(e.target.value)
    }
    function copyColor():void{
        navigator.clipboard.writeText(colorCode)
        alert("Copied")
    }
    return (
        <Card className='w-[600px] max-sm:w-full m-auto sm:mt-72 max-sm:border-none rounded-xl flex flex-col justify-center items-center'>
            <CardHeader className='text-center'>
                <CardTitle className='text-4xl max-sm:text-3xl max-sm:pb-5 max-sm:pt-5'>Color Picker</CardTitle>
                <CardDescription className='text-gray-400 text-xl'>Made by Huzaifa</CardDescription>
            </CardHeader>
            <CardContent className='w-full relative max-sm:p-2 flex flex-col items-center '>
                <div className={`w-full h-52 rounded-xl`} style={{background:colorCode}}></div>
                <h1 className='text-3xl pt-10'>{colorCode}</h1>
                <h1 className='text-xl text-gray-500 pt-2 pb-3'>RGB: {parseInt(colorCode.substring(1,3),16)} {parseInt(colorCode.substring(3,5),16)} {parseInt(colorCode.substring(5,7),16)}</h1>
                <Button variant='outline' onClick={copyColor} className='rounded-xl mb-3 hover:bg-white hover:text-black'>Copy To ClipBoard</Button>
                <Input type='color' value={colorCode} onChange={handelColorChange} className='w-full h-16 rounded-xl'></Input>
            </CardContent>
        </Card>
    )
}
