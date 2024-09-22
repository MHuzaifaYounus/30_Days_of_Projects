"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChangeEvent, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel
} from "@/components/ui/select"

export default function Main() {
    const [inputUnit, setInputUnit] = useState<string>()
    const [outputUnit, setOutputUnit] = useState<string>()
    const [value, setValue] = useState<number>()
    const [result, setResult] = useState<number>()
    const conversionRates: Record<string, Record<string, number>> = {
        length: {
            meter: 1,
            kilometer: 1000,
            centimeter: 0.01,
            millimeter: 0.001,
            inch: 0.0254,
            foot: 0.3048,
            yard: 0.9144,
            mile: 1609.34,
        },
        weight: {
            gram: 1,
            kilogram: 1000,
            milligram: 0.001,
            pound: 453.592,
            ounce: 28.3495,
            ton: 1000000,
        },
        volume: {
            liter: 1,
            milliliter: 0.001,
            gallon: 3.78541,
            quart: 0.946353,
            pint: 0.473176,
            cup: 0.24,
            fluidOunce: 0.0295735,
        },
    }

    const unitTypes = {
        length: [
            'meter',
            'kilometer',
            'centimeter',
            'millimeter',
            'inch',
            'foot',
            'yard',
            'mile',
        ],
        weight: [
            'gram',
            'kilogram',
            'milligram',
            'pound',
            'ounce',
            'ton',
        ],
        volume: [
            'liter',
            'milliliter',
            'gallon',
            'quart',
            'pint',
            'cup',
            'fluid ounce',
        ],
    }
    function inputHandler(value: string): void {
        setInputUnit(value);

    }
    function outputHandler(value: string): void {
        setOutputUnit(value);

    }
    function valueHandler(e: ChangeEvent<HTMLInputElement>): void {
        setValue(Number(e.target.value));

    }
    function convertUnit() {
        if (value !== null && inputUnit && outputUnit) {
            let unitCategory: string | null = null
            for (const category in unitTypes) {
                if(unitTypes[category].includes(inputUnit)&&unitTypes[category].includes(outputUnit)){
                    unitCategory = category
                    console.log(unitCategory);
                    break;
                }
            }
            if(unitCategory){
                const inputUnitRate = conversionRates[unitCategory][inputUnit]
                const outputUnitRate = conversionRates[unitCategory][outputUnit]
                const convertedValue = Math.floor(((value * inputUnitRate)/outputUnitRate)*10)/10
                setResult(convertedValue)
            }
            else{
                setResult(null)
                alert("Please Selecet the valid Units")
            }
                
        }
        else{
            setResult(null)
            alert("Please Fill all the fields")
        }
    }


return (
    <Card className='w-[600px] max-sm:w-full m-auto sm:mt-52 max-sm:border-none rounded-xl flex flex-col justify-center items-center'>
        <CardHeader className='text-center'>
            <CardTitle className='text-4xl max-sm:text-3xl max-sm:pb-5 max-sm:pt-5'>Unit Converter</CardTitle>
            <CardDescription className='text-gray-400 text-xl'>Made by Huzaifa</CardDescription>
        </CardHeader>
        <CardContent className='w-full relative max-sm:p-2 flex flex-col'>
            <div className='flex w-full '>
                <Select onValueChange={inputHandler}>
                    <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="First Unit:" />
                    </SelectTrigger>
                    <SelectContent className='bg-black rounded-xl'>
                        {Object.entries(unitTypes).map(([category, values]) => {
                            return <SelectGroup key={category}>
                                <SelectLabel className='text-gray-400'>{category.toUpperCase()}</SelectLabel>
                                {values.map((subValue) => {
                                    return <SelectItem key={subValue} value={subValue}>{subValue}</SelectItem>
                                })}
                            </SelectGroup>
                        })}
                    </SelectContent>
                </Select>
                <Select onValueChange={outputHandler}>
                    <SelectTrigger className="rounded-xl ml-5">
                        <SelectValue placeholder="Second Unit:" />
                    </SelectTrigger>
                    <SelectContent className='bg-black rounded-xl'>
                        {Object.entries(unitTypes).map(([category, values]) => {
                            return <SelectGroup key={category}>
                                <SelectLabel className='text-gray-400'>{category.toUpperCase()}</SelectLabel>
                                {values.map((subValue) => {
                                    return <SelectItem key={subValue} value={subValue}>{subValue}</SelectItem>
                                })}
                            </SelectGroup>
                        })}
                    </SelectContent>
                </Select>
            </div>
            <Label className='pt-10'>Value:</Label>
            <Input type='number' placeholder='Enter Value Here' className='rounded-xl mt-3' onChange={valueHandler}></Input>
            <Button variant='outline' className='rounded-xl mt-10 hover:bg-white hover:text-black' onClick={convertUnit}>Convert</Button>
            <h1 className='text-3xl text-center pt-10'>{result?result:0}</h1>
            <h2 className='text-2xl text-gray-500 text-center'>{result?outputUnit:"Unit"}</h2>
        </CardContent>
    </Card>
)
}
