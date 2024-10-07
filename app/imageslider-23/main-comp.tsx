"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { PlayIcon, PauseIcon } from "lucide-react"
import { useEffect, useRef, useState } from 'react'
import { Carousel, CarouselItem, CarouselContent, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Autoplay from "embla-carousel-autoplay"

export function Example() {
    return (
        <Carousel
            plugins={[
                Autoplay({
                    delay: 2000,
                }),
            ]}
        >
      // ...
        </Carousel>
    )
}


export default function Main() {
    type Image = {
        urls: { full: string },
        alt_description: string,
        height: number,
    }
    const [isplaying, setIsplaying] = useState<boolean>(true)
    const [images, setImages] = useState<Image[]>()
    const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }))

    function buttonHanlder() {
        setIsplaying(!isplaying)
    }
    useEffect(() => {
        async function getData() {
            const response = await fetch(`https://api.unsplash.com/photos?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API_KEY}&per_page=10`)
            const data = await response.json()
            setImages(data)
            console.log(data);
        }
        getData()
    }, [])
    useEffect(() => {
        if (isplaying) { 
            console.log(true);
            plugin.current.reset()
        }
        else { 
            console.log(false);
            plugin.current.stop()
        }
    }, [isplaying])
    return (
        <Card className='w-[800px] max-sm:w-full m-auto sm:mt-12 max-sm:border-none rounded-xl flex flex-col justify-center items-center'>
            <CardHeader className='text-center'>
                <CardTitle className='text-4xl max-sm:text-3xl max-sm:pb-5 max-sm:pt-5'>Image Slider</CardTitle>
                <CardDescription className='text-gray-400 text-xl'>Made by Huzaifa</CardDescription>
            </CardHeader>
            <CardContent className='w-full relative max-sm:p-2 flex flex-col items-center '>
                <Carousel
                    plugins={[plugin.current]}
                    className='h-[600px] w-[90%] max-sm:w-[70%] max-sm:h-[300px]'

                >
                    <CarouselContent>
                        {images?.map((image, index) => {
                            return <CarouselItem key={index} className='flex justify-center items-center'>
                                <Image src={image?.urls.full} alt='no image found' width={400} height={400} className='rounded-xl' />

                            </CarouselItem>
                        })}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>


                {isplaying ? <PauseIcon className='bg-gray-700 rounded-full mt-12 h-10 w-10 p-2 cursor-pointer hover:bg-gray-800 transition-all' onClick={buttonHanlder} /> :
                    <PlayIcon className='bg-gray-700 rounded-full mt-12 h-10 w-10 p-2 cursor-pointer hover:bg-gray-800 transition-all' onClick={buttonHanlder} />
                }

            </CardContent>
        </Card>
    )
}
