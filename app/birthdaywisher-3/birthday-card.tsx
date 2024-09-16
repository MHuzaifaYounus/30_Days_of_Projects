"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { FaBirthdayCake, FaGift } from 'react-icons/fa'
import { GiBalloons } from 'react-icons/gi'


export default function BirthdayCard() {
    type ConfettiProps = {
        width: number
        height: number
    }
    const DynamicConfetti = dynamic(() => import('react-confetti'), { ssr: false })
    const [candlesLit, setCandlesLit] = useState<number>(0)
    const [ballonsPoped, setBallonsPoped] = useState<number>(0)
    const [showConfetti, setShowConfetti] = useState<boolean>(false)
    const [windowSize, setWindowSize] = useState<ConfettiProps>({ width: 0, height: 0 })
    const totalcandles = 7
    const totalBallons = 7
    const candleaudioRef = useRef()
    const ballonaudioRef = useRef()
    const colors: string[] = ['#eb4034', '#eb9b34', '#e5eb34', '#34eb43', '#34ebe1', '#3464eb', '#c334eb']
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight })
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {

        if (candlesLit === totalcandles && ballonsPoped === totalBallons) {
            setShowConfetti(true)
            playAudio('/static/Confetti.mp3')
            playAudio('/static/birthdaysong.mp3')

        }
    }, [candlesLit, ballonsPoped])

    function playAudio(src: string): void {
        let audio = new Audio()
        audio.src = src
        audio.play()
    }
    function lightCandle(index: number): void {
        if (index === candlesLit) {
            setCandlesLit(candlesLit + 1)
            playAudio('/static/candlelit.mp3')
        }

    }
    function popBallons(index: number): void {
        if (index === ballonsPoped) {
            setBallonsPoped(ballonsPoped + 1)
            playAudio('/static/Balloonpop.mp3')
        }

    }
    function celebrate() {
         function litAll() {
            const intervalForCandles =  setInterval(() => {
                setCandlesLit(prev => {
                    if (prev < totalcandles) {
                        playAudio('/static/candlelit.mp3')
                        return prev + 1
                    }
                    if(prev === totalcandles){
                        popAll()
                    }
                    clearInterval(intervalForCandles)
                    return prev
                })

            },300)
            
        }
        function popAll() {
             const intervalForballons = setInterval(() => {
            setBallonsPoped(prev => {
                if (prev < totalBallons) {
                    playAudio('/static/Balloonpop.mp3')
                    return prev + 1
                }
                clearInterval(intervalForballons)
                return prev
            })

        }, 300)
        }
        litAll()    
    }

    return <>
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="border max-sm:border-none max-md:w-full flex items-center flex-col rounded-2xl text-center m-auto max-sm:mt-10 mt-72 w-[600px] max-sm:h-[600px] max-sm:justify-around">
                <CardHeader>
                    <CardTitle className="text-3xl max-[400px]:text-4xl">Happy <span className="text-red-500">18th</span> Birthday</CardTitle>
                    <CardDescription className="text-xl text-gray-500">Huzaifa - May <span className="text-red-800">14</span></CardDescription>
                </CardHeader>
                <CardContent className="max-sm:w-full max-sm:h-[600px] max-sm:justify-around  max-sm:flex max-sm:flex-col max-sm:items-center">
                    <p className="text-2xl pb-5">Light the Candles: </p>
                    <div className='flex max-sm:w-full max-sm:justify-center'>
                        {[...Array(totalcandles)].map((_, index) => (
                            (index < candlesLit) ? (
                                <FaBirthdayCake
                                    key={index}
                                    className="w-8 h-8 hover:scale-110 transition-all ml-3 cursor-pointer duration-300 ease-in-out"
                                    style={{ color: colors[index] }}
                                    onClick={() => { lightCandle(index) }}
                                />
                            ) : (
                                <FaBirthdayCake
                                    key={index}
                                    className="w-8 h-8 hover:scale-110 transition-all ml-3 cursor-pointer duration-300 ease-in-out text-gray-500"
                                    onClick={() => { lightCandle(index) }}

                                />
                            )
                        ))}
                    </div>
                    <p className="text-2xl pb-5 pt-5">Pop The Ballons: </p>
                    <div className='flex max-sm:w-full max-sm:justify-center'>
                        {[...Array(totalBallons)].map((_, index) => (
                            (index < ballonsPoped) ? (
                                <GiBalloons
                                    key={index}
                                    className="w-8 h-8 hover:scale-110 transition-all ml-3 cursor-pointer duration-500 ease-in-out text-gray-500"
                                    style={{ scale: 0 }}
                                    onClick={() => { popBallons(index) }}
                                />
                            ) : (
                                <GiBalloons
                                    key={index}
                                    className="w-8 h-8 hover:scale-110 transition-all ml-3 cursor-pointer duration-300 ease-in-out text-gray-500"
                                    style={{ color: colors[index] }}
                                    onClick={() => { popBallons(index) }}
                                />
                            )
                        ))}

                    </div>
                    <Button className="border border-white rounded-3xl mt-8 hover:bg-white hover:text-black font-bold"
                        onClick={celebrate}
                    >Celebrate
                        <FaGift
                            className="ml-2 w-4 h-4"
                        />
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
        {showConfetti && (
            <DynamicConfetti
                width={windowSize.width}
                height={windowSize.height}
                recycle={true}
                numberOfPieces={500}
                colors={colors}
            />
        )}
    </>
}