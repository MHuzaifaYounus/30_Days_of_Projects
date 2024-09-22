"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui//label'
import { ChangeEvent, useState } from 'react'
export default function Main() {
    const [height, setHeight] = useState<number>()
    const [weight, setWeight] = useState<number>()
    const [result, setResult] = useState<number>()
    const [weightType, setWeightType] = useState<string>('')

    function inputHandler(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.name === "height") {
            setHeight(Number(e.target.value))
        }
        else if (e.target.name === "weight") {
            setWeight(Number(e.target.value))
        }
    }
    function calculate() {
        if(weight && height){

            const currentResult = Math.floor((weight  / (height / 100) ** 2)*10)/10
            setResult(currentResult)
            if(currentResult < 18.5 ) setWeightType("Underweight");
            else if(currentResult >= 18.5 && currentResult <= 24.9 ) setWeightType("Normal");
            else if(currentResult >= 25 && currentResult <= 29.9 ) setWeightType("Overweight");
            else if(currentResult >= 30 && currentResult <= 34.9 ) setWeightType("class 1 obesity");
            else if(currentResult >= 35 && currentResult <= 39.9 ) setWeightType("class 2 obesity");
            else if(currentResult > 40 ) setWeightType("class 3 obesity");
        }
        else{
            alert("Please enter the valid weight and height")
        }
      
    }

    return (
        <Card className='w-[600px] max-sm:w-full m-auto sm:mt-52 max-sm:border-none rounded-xl flex flex-col justify-center items-center'>
            <CardHeader className='text-center'>
                <CardTitle className='text-4xl max-sm:text-3xl max-sm:pb-5 max-sm:pt-5'>BMI Calculator</CardTitle>
                <CardDescription className='text-gray-400 text-xl'>Made by Huzaifa</CardDescription>
            </CardHeader>
            <CardContent className='w-full relative max-sm:p-2 flex flex-col '>
                <Label>Height (cm):</Label>
                <Input type='number' placeholder='cm' className='rounded-xl mt-3 mb-9' name='height' onChange={inputHandler}></Input>
                <Label>Weight (kg):</Label>
                <Input type='number' placeholder='kg' className='rounded-xl mt-3' name='weight' onChange={inputHandler} ></Input>
                <Button variant='outline' className='rounded-xl mt-10 hover:bg-white hover:text-black w-32' onClick={calculate}>Calculate</Button>
                {result && <h1 className='text-3xl text-center pt-10'>{result}</h1>}
                {weightType && <h1 className='text-2xl text-gray-500 text-center pt-3'>{weightType}</h1>}

            </CardContent>
        </Card>
    )
}
