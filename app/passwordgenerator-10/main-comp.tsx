"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ChangeEvent, useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
export default function Main() {
    const [includesUppercase, setIncludesUppercase] = useState<boolean>(true)
    const [includesLowercase, setIncludesLowercase] = useState<boolean>(true)
    const [includesNumbers, setIncludesNumbers] = useState<boolean>(true)
    const [includesSpecialcharc, setIncludesSpecialcharc] = useState<boolean>(true)
    const [length, setLenght] = useState<number>(0)
    const [password, setPassword] = useState<string>('')

    function copyPassword() {
        navigator.clipboard.writeText(password).then(() => {
            alert("Successfully Copied")

        }, () => {
            alert("Failed to Copy Password")
        })

    }


    function uppercaseCheckedHandler(checked: boolean) {
        setIncludesUppercase(checked)
    }
    function lowercaseCheckedHandler(checked: boolean) {
        setIncludesLowercase(checked)
    }
    function includesNumbersHandler(checked: boolean) {
        setIncludesNumbers(checked)
    }
    function specialCharcHandler(checked: boolean) {
        setIncludesSpecialcharc(checked)
    }
    function getlength(e: ChangeEvent<HTMLInputElement>) {
        setLenght(Number(e.target.value))
    }

    function generatePass() {
        const lowerCase = 'qwertyuiopasdfghjklzxcvbnm'
        const upperCase = 'QWERTYUIOPASDFGHJKLZXCVBNM'
        const numbers = '1234567890'
        const specialcharc = '!@#$%^&*()_+-={}:<>?'
        let allCharc = ''
        if (includesUppercase) allCharc += upperCase;
        if (includesLowercase) allCharc += lowerCase;
        if (includesNumbers) allCharc += numbers;
        if (includesSpecialcharc) allCharc += specialcharc;
        if (allCharc == '') alert("Please select atleast one checkbox");

        let generatedPassword = ''
        for (let index = 0; index < length; index++) {
            const randomInd = Math.floor(Math.random() * allCharc.length)
            generatedPassword += allCharc[randomInd]
        }
        setPassword(generatedPassword.toString())
    }

    return (
        <Card className='w-[600px] max-sm:w-full m-auto sm:mt-40 max-sm:border-none rounded-xl flex flex-col justify-center items-center'>
            <CardHeader className='text-center'>
                <CardTitle className='text-4xl max-sm:text-3xl max-sm:pb-5 max-sm:pt-5'>Password generator</CardTitle>
                <CardDescription className='text-gray-400 text-xl'>Made by Huzaifa</CardDescription>
            </CardHeader>
            <CardContent className='w-full relative max-sm:p-2 flex flex-col  '>
                <Label>Password length:</Label>
                <Input type='number' className='rounded-xl mt-2 mb-5' placeholder='Enter the length' onChange={getlength}></Input>
                <Label>Include:</Label>
                <div className='h-10 flex items-center'>
                    <Checkbox
                        id='includeUppercase'
                        checked={includesUppercase}
                        onCheckedChange={uppercaseCheckedHandler}
                    />
                    <label className='pl-3 text-lg' htmlFor="includeUppercase">UpperCase Letters</label>
                </div>
                <div className='h-10 flex items-center'>
                    <Checkbox
                        id='includeLowercase'
                        checked={includesLowercase}
                        onCheckedChange={lowercaseCheckedHandler}
                    />
                    <label className='pl-3 text-lg' htmlFor="includeLowercase">LowerCase Letters</label>
                </div>
                <div className='h-10 flex items-center'>
                    <Checkbox
                        id='includesNumbers'
                        checked={includesNumbers}
                        onCheckedChange={includesNumbersHandler}
                    />
                    <label className='pl-3 text-lg' htmlFor="includesNumbers">Numbers</label>
                </div>
                <div className='h-10 flex items-center'>
                    <Checkbox
                        id='includeSpecialcharc'
                        checked={includesSpecialcharc}
                        onCheckedChange={specialCharcHandler}
                    />
                    <label className='pl-3 text-lg' htmlFor="includeSpecialcharc">Special Characters</label>
                </div>
                <Button variant='outline' className='rounded-xl hover:bg-white hover:text-black mt-5 mb-10' onClick={generatePass}>Generate</Button>
                <Label>Generated Password:</Label>
                <div className='w-full flex pt-4 justify-center max-sm:flex-col max-sm:items-center'>
                    <Input type='text' className='rounded-xl w-[70%] max-sm:w-[90%]' value={password} readOnly></Input>
                    <Button variant='outline' className='rounded-xl hover:bg-white hover:text-black ml-4 max-sm:mt-5 pl-14 pr-14' onClick={copyPassword}>Copy</Button>
                </div>
            </CardContent>
        </Card>
    )
}
