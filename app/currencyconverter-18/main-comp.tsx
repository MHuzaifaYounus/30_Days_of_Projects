"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ChangeEvent, useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Main() {
    const [exchangeRates, setExchangeRates] = useState<Object>()
    const [inputAmount, setInputAmount] = useState<number>()
    const [result, setResult] = useState<number>(0.00)
    const [fromCurrency, setFromCurrency] = useState<string>()
    const [toCurrency, setToCurrency] = useState<string>()

    useEffect(() => {
        async function getRates() {
            const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD")
            const data = await response.json()
            console.log(data.rates)
            setExchangeRates(data.rates)
        }
        getRates()
    }, [])
    function inputAmountHandler(e: ChangeEvent<HTMLInputElement>) {
        setInputAmount(Number(e.target.value))
    }
    function fromCurrencyHandler(value:string) {
        setFromCurrency(value)
    }
    function toCurrencyHandler(value:string) {
        setToCurrency(value)
    }
    function convert() {
        setResult(Math.floor(((inputAmount / exchangeRates[fromCurrency])*exchangeRates[toCurrency])*100)/100)
    }
    return (
        <Card className='w-[600px] max-sm:w-full m-auto sm:mt-72 max-sm:border-none rounded-xl flex flex-col justify-center items-center border-gray-500'>
            <CardHeader className='text-center'>
                <CardTitle className='text-4xl max-sm:text-3xl max-sm:pb-5 max-sm:pt-5'>Currency Converter</CardTitle>
                <CardDescription className='text-gray-400 text-xl'>Made by Huzaifa</CardDescription>
            </CardHeader>
            <CardContent className='w-full relative max-sm:p-2 flex flex-col items-center'>
                <div className='flex justify-center items-center w-[90%]'>
                    <h2 className='text-xl pr-5 '>From:</h2>
                    <Input placeholder='Amount' className='rounded-xl' type='number' onChange={inputAmountHandler}></Input>
                    <Select onValueChange={fromCurrencyHandler} value={fromCurrency}>
                        <SelectTrigger className="w-[180px] ml-4 rounded-xl">
                            <SelectValue placeholder="Currency" />
                        </SelectTrigger>
                        <SelectContent className='bg-black rounded-xl'>
                            {exchangeRates && Object.entries(exchangeRates).map((value) => {
                                return <SelectItem key={value[0]} value={value[0]}>{value[0]}</SelectItem>
                            })}


                        </SelectContent>
                    </Select>
                </div>
                <div className='flex justify-between items-center pt-10 w-[90%]'>
                    <h2 className='text-xl pr-5 '>To:</h2>
                    <h1 className='text-4xl'>{result}</h1>

                    <Select onValueChange={toCurrencyHandler} value={toCurrency}>
                        <SelectTrigger className="w-[110px] ml-4 rounded-xl">
                            <SelectValue placeholder="Currency" />
                        </SelectTrigger>
                        <SelectContent className='bg-black rounded-xl'>
                            {exchangeRates && Object.entries(exchangeRates).map((value) => {
                                return <SelectItem value={value[0]} key={value[0]}>{value[0]}</SelectItem>
                            })}


                        </SelectContent>
                    </Select>
                </div>
                <Button variant='outline' className='rounded-xl w-full mt-10 hover:text-black hover:bg-white' onClick={convert}>Convert</Button>
            </CardContent>
        </Card>
    )
}
