"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ChangeEvent, useState } from 'react'


export default function Main() {
    type Details = {
        title: string,
        plot: string,
        year: string,
        imbdRating: string,
        released: string,
        runtime: string,
        actors: string,
        country: string,
        director: string,
        genre: string,
        language: string,
        poster: string,
        type: string,
        writer: string
    }
    const clearedDetails:Details = {
        title: "NaN",
        plot: "NaN",
        year: "NaN",
        imbdRating: "NaN",
        released: "NaN",
        runtime: "NaN",
        actors: "NaN",
        country: "NaN",
        director: "NaN",
        genre: "NaN",
        language: "NaN",
        poster: "NaN",
        type: "NaN",
        writer: "NaN"

    }
    const [input, setInput] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)
    const [details, setDetails] = useState<Details>(clearedDetails)
    const [errMsg, setErrMsg] = useState<string>()

    function inputHandler(e: ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value)
    }
    async function searchMovie() {
        setDetails(clearedDetails)
        setErrMsg('')
        setLoading(true)
        try {

            const response = await fetch(`https://www.omdbapi.com/?t=${input}&apikey=fc1b56b8`)
            const data = await response.json()
            setLoading(false)
            console.log(data);
            if (data.Error) {
                setErrMsg(data.Error)
                console.log(data.Error);
            }
            else {
                setDetails({
                    title: data.Title,
                    plot: data.Plot,
                    year: data.Year,
                    imbdRating: data.imdbRating,
                    released: data.Released,
                    runtime: data.Runtime,
                    actors: data.Actors,
                    genre: data.Genre,
                    country: data.Country,
                    director: data.Director,
                    language: data.Language,
                    poster: data.Poster,
                    type: data.Type,
                    writer: data.Writer

                })


            }


        }
        catch (err) {
            setErrMsg(err)
        }

    }


    return (
        <Card className='w-[600px] max-sm:w-full m-auto sm:mt-12 max-sm:border-none rounded-xl flex flex-col pb-10 mb-10 justify-center items-center'>
            <CardHeader className='text-center'>
                <CardTitle className='text-4xl max-sm:text-3xl max-sm:pb-5 max-sm:pt-5'>Movie Search</CardTitle>
                <CardDescription className='text-gray-400 text-xl'>Made by Huzaifa</CardDescription>
            </CardHeader>
            <CardContent className='w-full relative flex flex-col items-center'>
                <div className='w-full relative max-sm:p-2 flex items-center max-sm:flex-col'>
                    <Input type='text' className='rounded-xl' placeholder='Search Here' onChange={inputHandler}></Input>
                    <Button variant='outline' className="rounded-xl hover:bg-white max-sm:mt-10 max-sm:ml-0  ml-5 hover:text-black" onClick={searchMovie}>Search</Button>
                </div>
                {(details.title !== "NaN" && !loading) && <div className='flex flex-col justify-center items-center w-full'>
                    <Image
                        src={details.poster !== "NaN" ? details.poster : "/static/noimage.png"}
                        alt='No Image Found'
                        width={200}
                        className='mt-9 rounded-xl'
                        height={800}
                    />
                    <h1 className='text-3xl text-center pt-5' >{details.title}</h1>
                    <p className='pt-3 w-[90%] text-gray-300 text-center'>{details.plot}</p>
                    <div className='pt-6 text-lg flex justify-between'>
                        <p>📅{details.year}</p>
                        <p className='pl-5'>⭐{details.imbdRating}</p>
                    </div>
                    <h2 className='pt-3 text-gray-400 text-lg'>Actors: <span className='text-white text-sm'>{details.actors}</span></h2>
                    <h2 className='pt-3 text-gray-400 text-lg'>Genere: <span className='text-white text-sm'>{details.genre}</span></h2>
                    <h2 className='pt-3 text-gray-400 text-lg'>Director: <span className='text-white text-sm'>{details.director}</span></h2>
                    <h2 className='pt-3 text-gray-400 text-lg'>Country: <span className='text-white text-sm'>{details.country}</span></h2>
                    <h2 className='pt-3 text-gray-400 text-lg'>language: <span className='text-white text-sm'>{details.language}</span></h2>
                    <h2 className='pt-3 text-gray-400 text-lg'>Type: <span className='text-white text-sm'>{details.type}</span></h2>
                    <h2 className='pt-3 text-gray-400 text-lg'>Writer: <span className='text-white text-sm'>{details.writer}</span></h2>
                    <h2 className='pt-3 text-gray-400 text-lg'>Released: <span className='text-white text-sm'>{details.released}</span></h2>
                    <h2 className='pt-3 text-gray-400 text-lg'>Runtime: <span className='text-white text-sm'>{details.runtime}</span></h2>

                </div>}
                {errMsg && <h1 className='text-red-600 pt-5 text-xl' >{errMsg}</h1>}
                {loading && <h1 className='text-gray-600 pt-5 text-xl' >Loading...</h1>}
            </CardContent>
        </Card>
    )
}
