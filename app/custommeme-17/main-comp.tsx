"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { ChangeEvent, Fragment, useEffect, useState, useRef } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Draggable from "react-draggable";
import html2canvas from "html2canvas";
import Image from "next/image"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


export default function Main() {
    type Meme = {
        box_count: number,
        captions: number,
        height: number,
        id: string,
        name: string,
        url: string,
        width: number,
    }
    type Position = {
        x: number,
        y: number
    }
    const [memes, setMemes] = useState<Meme[]>()
    const [editingMeme, setEditingMeme] = useState<string>('')
    const [customText, setCustomText] = useState<string>('')
    const [textPosition, setTextPosition] = useState<Position[]>([])
    const [textArray, setTextArray] = useState<string[]>([])
    const memeRef = useRef<HTMLDivElement>()
    useEffect(() => {
        async function getdata() {
            const response = await fetch("https://api.imgflip.com/get_memes")
            const data = await response.json()
            setMemes(data.data.memes)
        }
        getdata()
    }, [])
    useEffect(() => {
        console.log(textPosition);
    }, [textPosition])
    function memeClickHandler(memeUrl: string) {
        setTextArray([])
        setEditingMeme(memeUrl)
    }
    function customtextHandler(e: ChangeEvent<HTMLTextAreaElement>) {
        setCustomText(e.target.value)
    }
    async function downloadHandler(): Promise<void> {
        if (memeRef.current) {
            const canvas = await html2canvas(memeRef.current, {
                scale: window.devicePixelRatio,
                width: memeRef.current.offsetWidth,
                height: memeRef.current.offsetHeight
            });

            const dataURL = canvas.toDataURL("image/png")
            const link = document.createElement("a");
            link.href = dataURL;
            link.download = "meme.png";
            link.click();
        }

    }
    function addAnotherText() {
        setTextArray(prevArray => [...prevArray, customText]);
        setTextPosition(prevArray => [...prevArray, { x: 0, y: -50 }]);
        setCustomText('')
    }
    return (
        <Fragment>
            <Card className='w-[800px] max-sm:w-full m-auto sm:mt-12 max-sm:border-none rounded-xl flex flex-col justify-center items-center'>
                <CardHeader className='text-center'>
                    <CardTitle className='text-4xl max-sm:text-xl max-sm:pb-2 max-sm:pt-2'>Custom Memes generator</CardTitle>
                    <CardDescription className='text-gray-400 text-xl'>Made by Huzaifa</CardDescription>
                </CardHeader>
                <CardContent className='w-full relative max-sm:p-2 flex flex-col items-center '>
                    <Carousel className='w-[90%] max-sm:w-[70%] '>
                        <CarouselContent className='h-[700px] max-sm:h-[400px]'>
                            {memes?.map(((meme) => {
                                return <CarouselItem key={meme.id} className='flex justify-center items-center flex-col hover:scale-110 transition-all duration-300 cursor-pointer' onClick={() => memeClickHandler(meme?.url)}>
                                    <Image
                                        src={meme?.url}
                                        alt={meme?.name}
                                        width={400}
                                        height={30}
                                    />
                                    <h1 className='text-xl pt-10 text-gray-500 text-center'>{meme?.name}</h1>
                                </CarouselItem>
                            }))}

                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </CardContent>
            </Card>
            {editingMeme && <div className='w-[800px] max-sm:w-full m-auto sm:mt-12 max-sm:border-none rounded-xl flex flex-col justify-center items-center pb-10'>
                <h1 className='text-center text-3xl pb-5 max-sm:w-[90%]'>Customize Your Meme</h1>
                <p className='text-gray-600 text-xl text-center pb-4'>Drag the text to customize the position</p>
                <div className='bg-muted overflow-hidden' ref={memeRef}>

                    <Image
                        src={editingMeme}
                        alt={"No Found"}
                        layout='responsive'
                        width={400}
                        height={10}
                        className='object-cover'
                    />
                    {textArray.map((text, index) => {
                        return <Draggable
                            key={index}
                            position={textPosition[index]}
                            onStop={(_, data) => {
                                setTextPosition(prev => {
                                    const updatedPositions = [...prev];
                                    updatedPositions[index] = { x: data.x, y: data.y };
                                    return updatedPositions;
                                });
                            }}
                        >
                            <div className='text-xl text-black font-extrabold cursor-pointer '
                                style={{ left: textPosition[index].x, top: textPosition[index].y }}>
                                {text}
                            </div>
                        </Draggable>
                    })}
                </div>
                <Textarea className='mt-10 rounded-xl max-sm:w-[90%]' placeholder='Enter Your Text ' value={customText} onChange={customtextHandler}></Textarea>
                <div className='flex '>
                    <Button variant='outline' className='rounded-xl mt-5 hover:bg-white hover:text-black' onClick={addAnotherText}>Add</Button>
                    <Button variant='outline' className='rounded-xl mt-5 hover:bg-white hover:text-black ml-5' onClick={downloadHandler}>Download</Button>
                </div>
            </div>}
        </Fragment>
    )
}
