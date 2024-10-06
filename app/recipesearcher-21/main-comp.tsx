"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { Search } from "lucide-react";
import { ChangeEvent, useState } from 'react';
import Link from 'next/link'
import { Button } from '@/components/ui/button';
export default function Main() {
    type Recipe = {
        recipe: {
            label: string,
            image: string,
            ingredientLines: string[],
            ingredients: string[],
            url: string,
        }
    }
    const [input, setinput] = useState<string>('')
    const [recipes, setRecipes] = useState<Recipe[]>()
    const [error, seterror] = useState<string>('')
    const samples = ["biryani", "kabuli pulao", "korma", "lassi", "zinger roll"]
    function inputhandler(e: ChangeEvent<HTMLInputElement>) {
        setinput(e.target.value)

    }
    async function getRecipes() {
        seterror('')
        if(!input){
            seterror("please Enter a Valid Dish")
        }
        try{
            const response = await fetch(`https://api.edamam.com/search?q=${input}&app_id=${process.env.NEXT_EDAMAM_APP_ID}&app_key=${process.env.NEXT_EDAMAM_APP_KEY}`)
            const data = await response.json()
            if(!data){
                seterror("No Recipe Found")
            }
            console.log(data);
            setRecipes(data.hits)
        }
        catch(e){
            seterror(e)
        }
    }
    function sampleHandler(e) {
        setinput(e.target.innerText)
    }


    return (
        <div>

            <Card className='w-[600px] max-sm:w-full m-auto sm:mt-12 max-sm:border-none rounded-xl flex flex-col justify-center items-center max-sm:p-1'>
                <CardHeader className='text-center'>
                    <CardTitle className='text-4xl max-sm:text-3xl max-sm:pb-5 max-sm:pt-5'>Search Recipe</CardTitle>
                    <CardDescription className='text-gray-400 text-xl'>Made by Huzaifa</CardDescription>
                </CardHeader>
                <CardContent className='w-full relative max-sm:p-2 flex flex-col  items-center '>
                    <div className=' max-lg:w-[90%]'>
                        {samples.map((sample, index) => {
                            return <Button variant='outline' key={index} className='rounded-xl mt-2 ml-3 border-gray-400 hover:bg-gray-900' onClick={sampleHandler}>{sample}</Button>
                        })}
                    </div>
                    <div className='flex w-full relative max-sm:p-2 mt-3 items-center'>

                        <Input type='search' placeholder='Enter your dish here' className='rounded-xl' value={input} onChange={inputhandler}></Input>
                        <Search className='ml-10 cursor-pointer hover:scale-125 transition-all max-sm:ml-2' onClick={getRecipes} />
                    </div>
                </CardContent>
            </Card>
            <div className='flex flex-wrap max-[1100px]:w-[90%] w-[1000px] pt-10 pb-10 justify-center  m-auto'>
                {!error && recipes?.map((recipe, index) => {
                    return <Link key={index} target='_blank' href={recipe?.recipe?.url}><div  className='w-[300px] min-h-[350px]  rounded-xl border sm:ml-5 mt-5 flex  items-center cursor-pointer hover:border-white  border-gray-500 flex-col'>
                        <div className='w-[90%] mt-3 rounded-xl overflow-hidden '>
                            <Image
                                src={recipe?.recipe?.image}
                                alt='No Image Found'
                                width={270}
                                className='rounded-xl w-full hover:scale-110 transition-all'
                                height={100}
                            />
                        </div>
                        <div className='p-5'>
                            <h1 className='text-xl'>{recipe?.recipe?.label}</h1>
                            <p className='line-clamp-2 text-gray-300 '>{recipe?.recipe?.ingredientLines.toString()}</p>
                        </div>

                    </div></Link>
                })}
                {error && <h1 className='text-red-700 text-2xl'>{error}</h1> }

            </div>
        </div>
    )
}
