"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { ChangeEvent } from 'react'
export default function Main() {
    const [billAmount, setBillAmount] = useState<number>()
    const [tipPercentage, setTipPercentage] = useState<number>()
    const [tipAmount, setTipAmount] = useState<number>(0)
    const [totalAmount, setTotalAmount] = useState<number>(0)
    function handelBillAmount(e: ChangeEvent<HTMLInputElement>) {
        setBillAmount(Number(e.target.value))
    }
    function handelTipPercent(e: ChangeEvent<HTMLInputElement>) {
        setTipPercentage(Number(e.target.value))
    }
    function calculate() {
        setTipAmount(tipPercentage / 100 * billAmount)
        setTotalAmount(billAmount + (tipPercentage / 100 * billAmount))
    }

    return (
        <Card className='w-[600px] max-sm:w-full m-auto sm:mt-72 max-sm:border-none rounded-xl flex flex-col justify-center items-center'>
            <CardHeader className='text-center'>
                <CardTitle className='text-4xl max-sm:text-3xl max-sm:pb-5 max-sm:pt-5'>Tip Calculator</CardTitle>
                <CardDescription className='text-gray-400 text-xl'>Made by Huzaifa</CardDescription>
            </CardHeader>
            <CardContent className='w-full relative max-sm:p-2 flex flex-col '>
                <Label className='pl-2 pb-2 text-lg' >Bill Amount:</Label>
                <Input type='number' className='rounded-xl' placeholder='Enter the Bill Amount' onChange={handelBillAmount}></Input>
                <Label className='pl-2 pt-6 pb-2 text-lg' >Tip Percentage:</Label>
                <Input type='number' className='rounded-xl' placeholder='Enter the Tip in %' onChange={handelTipPercent}></Input>
                <Button variant='outline' className='rounded-xl mt-9 hover:bg-white hover:text-black' onClick={calculate}>Calculate</Button>
                <div className='flex justify-around text-xl pt-6'>
                    <h1 >Tip Amount:</h1>
                    <h1>{tipAmount}</h1>
                </div>
                <div className='flex justify-around text-xl pt-6'>
                    <h1 >Total Amount:</h1>
                    <h1>{totalAmount}</h1>
                </div>
            </CardContent>
        </Card>
    )
}
