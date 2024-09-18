"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChangeEvent, MouseEvent, useState , useRef} from 'react'


export default function CalculatorComp() {
    const [num1, setNum1] = useState<number>()
    const [num2, setNum2] = useState<number>()
    const [result, setResult] = useState<number | string>()
    const resultRef = useRef<HTMLInputElement>()
    const input1ref = useRef<HTMLInputElement>()
    const input2ref = useRef<HTMLInputElement>()

    function inputChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.name === "Num1") {
            setNum1(Number(e.target.value))
        }

        else if (e.target.name === "Num2") {
            setNum2(Number(e.target.value))
        }
    }
    function operationHandler(e:MouseEvent<HTMLButtonElement>) {
       if(e.currentTarget.innerText === "+"){
            setResult(num1 + num2)
       } 
       else if(e.currentTarget.innerText === "-"){
            setResult(num1 - num2)
       } 
       else if(e.currentTarget.innerText === "*"){
            setResult(num1 * num2)
       } 
       else if(e.currentTarget.innerText === "/"){
            setResult(num1 / num2)
       } 
         
    }
    function clearHandler() {
        setResult('')
        input1ref.current.value = ''
        input2ref.current.value = ''
    }

    return <Card className='w-[600px] max-sm:w-full m-auto sm:mt-72 max-sm:border-none rounded-xl flex flex-col justify-center items-center'>
        <CardHeader className='text-center'>
            <CardTitle className='text-4xl max-sm:text-3xl max-sm:pb-5 max-sm:pt-5'>Mini Calculator</CardTitle>
            <CardDescription className='text-gray-400 text-xl' >Made by Huzaifa</CardDescription>
        </CardHeader>
        <CardContent className='w-full max-sm:p-2 flex flex-col items-center '>
            <div className='flex w-full'>
                <Input ref={input1ref} type='number' placeholder='Enter Number 1' name='Num1' className='w-full max-sm rounded-xl' onChange={inputChangeHandler}></Input>
                <Input ref={input2ref} type='number' placeholder='Enter Number 2' name='Num2' className='ml-5 w-full max-sm rounded-xl' onChange={inputChangeHandler}></Input>
            </div>
            <div className='pt-5 w-full flex justify-around'>
                <Button className='border rounded-xl text-2xl p-5 pt-6 pb-6 font-bolder hover:bg-white hover:text-black ' onClick={operationHandler}>+</Button>
                <Button className='border rounded-xl text-2xl p-5 pt-6 pb-6 font-bolder hover:bg-white hover:text-black' onClick={operationHandler}>-</Button>
                <Button className='border rounded-xl text-2xl p-5 pt-6 pb-6 font-bolder hover:bg-white hover:text-black' onClick={operationHandler}>*</Button>
                <Button className='border rounded-xl text-2xl p-5 pt-6 pb-6 font-bolder hover:bg-white hover:text-black' onClick={operationHandler}>/</Button>
            </div>
            <div className='w-full pt-5'>
                <h3 className='text-xl'>Result: </h3>
                <Input ref={resultRef}  type='number' placeholder='Result' value={result?result:""} className='w-full max-sm rounded-xl mt-3'></Input>
            </div>
            <Button className='hover:border hover:text-white w-full rounded-xl mt-10 bg-white text-black text-lg font-bold' onClick={clearHandler}>Clear</Button>
        </CardContent>
    </Card>

}