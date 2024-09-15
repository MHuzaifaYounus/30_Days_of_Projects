"use client"
import { ChangeEvent, MouseEventHandler, useRef, useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CloudIcon, Clock, AlertCircle, MapPinIcon, ThermometerIcon } from "lucide-react";


export default function Main() {
    const api = '14e6d3c55bc842c185a55913241509'
    const [query, setQuery] = useState<string>("")
    const [tempMsg, setTempMsg] = useState<string>('')
    const [locationMsg, setLocationMsg] = useState<string>('')
    const [weatherMsg, setWeatherMsg] = useState<string>('')
    const [timeMsg, setTimeMsg] = useState<string>('')
    const [errMsg, setErrMsg] = useState<string>('')
    const [isdata, setIsdata] = useState<boolean>(false)
    const url = `http://api.weatherapi.com/v1/current.json?key=${api}&q=${query}&aqi=yes`

    async function getData() {
        const res = await fetch(url)
        const data = await res.json()
        return data

    }
    async function searchHandler() {
        try {
            const Data = await getData()
            setTempMsg(getTempMsg(Data.current.temp_c))
            setWeatherMsg(getWeatherMsg(Data.current.condition.text))
            setLocationMsg(getLocationMsg(Data.current.is_day,Data.location.name))
            setTimeMsg(Data.location.localtime)
            setErrMsg('')
            console.log(Data.location);
            
            setIsdata(true)


        }
        catch (err) {
            console.log(err)
            setErrMsg("City not found in this world")
            setIsdata(false)
        }


    }
    function changeQueryHandler(e: ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value)
    }
    function getTempMsg(temperature: number): string {
        if (temperature < 0) {
            return `Brrr! It's freezing at ${temperature}°C. Stay warm inside!`;
        } else if (temperature < 10) {
            return `Chilly weather at ${temperature}°C. A heavy jacket would be a good idea.`;
        } else if (temperature < 20) {
            return `Mild at ${temperature}°C. A sweater or light jacket should do.`;
        } else if (temperature < 30) {
            return `Nice and warm at ${temperature}°C. Perfect for outdoor activities!`;
        } else {
            return `Scorching hot at ${temperature}°C. Make sure to keep cool and drink plenty of water.`;
        }

    }
    function getWeatherMsg(description: string): string {
        switch (description.toLowerCase()) {
            case "sunny":
                return "What a bright and sunny day! Perfect for outdoor fun.";
            case "partly cloudy":
                return "A mix of sun and clouds today. Great weather for a stroll.";
            case "cloudy":
                return "Clouds are covering the sky, but no rain just yet.";
            case "overcast":
                return "The sky is completely overcast. Looks like a grey day.";
            case "rain":
                return "It's raining! Grab your raincoat and stay dry.";
            case "thunderstorm":
                return "Stay indoors if possible, thunderstorms are rolling in!";
            case "snow":
                return "Snow is falling! Time to build a snowman!";
            case "mist":
                return "A misty morning—take it slow and enjoy the calm.";
            case "fog":
                return "Thick fog ahead. Drive carefully!";
            default:
                return `Weather: ${description}`;
        }

    }
    function getLocationMsg(value: number,location:string): string {
        if (value === 1) {
            return `Day in the ${location}`
        }
        else {
            return `Night at ${location}`
        }
    }
    return <Card className='w-[700px] max-md:w-full pb-2 m-auto mt-60 border-black rounded-xl'>
        <CardHeader>
            <CardTitle className='text-4xl font-mono text-center'>Weather App</CardTitle>
            <CardDescription className='text-xl font-mono text-center'>Made By Huzaifa</CardDescription>
        </CardHeader>
        <CardContent className='max-sm:w-full p-2'>
            <div className='flex justify-around max-sm:flex-col'>
                <Input onChange={changeQueryHandler} className='w-[80%] max-sm:w-full max-sm:mb-3' type='text' name='city' placeholder='Enter Your City Here'></Input>
                <Button onClick={searchHandler}>Search</Button>
            </div>
            {isdata && (<div className='w-[95%] mt-8 max-sm:w-full flex justify-center max-sm:justify-between items-center flex-col m-auto'>
                <div className='w-[100%] h-10 mt-2 flex max-sm:h-[5rem] items-center'>
                    <ThermometerIcon width={screen.width <= 500 ? 100 : 30} />
                    <p className=' pl-2 max-sm:w-[350px]'>{tempMsg}</p>
                </div>
                <div className='w-[100%] h-10 mt-2 flex max-sm:h-[5rem] items-center'>
                    <MapPinIcon width={screen.width <= 500 ? 100 : 30} />
                    <p className='pl-2 max-sm:w-[350px]'>{locationMsg}</p>
                </div>
                <div className=' w-[100%] h-10 mt-2 flex max-sm:h-[5rem] items-center'>
                    <CloudIcon width={screen.width <= 500 ? 100 : 30} />
                    <p className='pl-2 max-sm:w-[350px]'>{weatherMsg}</p>
                </div>
                <div className=' w-[100%] h-10 mt-2 flex max-sm:h-[5rem] items-center'>
                    <Clock width={screen.width <= 500 ? 100 : 30} />
                    <p className='pl-2 max-sm:w-[350px]'>{timeMsg}</p>
                </div>

            </div>)}
            {errMsg && (<div className='w-[95%] mt-8 max-sm:w-full flex justify-center max-sm:justify-between items-center flex-col m-auto'>
                <div className='w-[100%] h-10 mt-2 flex max-sm:h-[5rem] items-center'>
                    <AlertCircle width={screen.width <= 500 ? 100 : 30} color='red' />
                    <p className=' pl-2 max-sm:w-[350px] text-red-600'> {errMsg}</p>
                </div>
            </div>)}


        </CardContent>
    </Card>
}