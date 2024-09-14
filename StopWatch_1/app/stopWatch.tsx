"use client"
import { useState, useEffect, useRef, ChangeEvent } from "react"

export default function StopWatch() {
    const inputRef = useRef()
    const timeRef = useRef<NodeJS.Timeout | null>(null)
    let [duration, setDuration] = useState<number | string>()
    let [timerValue, setTimerValue] = useState<number>(0)
    let [isRunning, setIsRunning] = useState<boolean>(false)
    let [isPause, setIsPause] = useState<boolean>(false)
    let startBtnRef = useRef()
    let pauseBtnRef = useRef()
    let audioRef = useRef()
    let alarmImgRef = useRef()
    let startbtn = startBtnRef.current as HTMLButtonElement
    let pausebtn = pauseBtnRef.current as HTMLButtonElement

    function handleDuration(e: ChangeEvent<HTMLInputElement>): void {
        setDuration(Number(e.target.value) || "")
    }
    function formatTime(time: number): string {
        let hour = Math.floor(time / 3600);
        let minutes = Math.floor((time % 3600) / 60);
        let seconds = time % 60;
        return `${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }

    function inputHandler() {
        if (typeof duration === "number" && duration > 0) {
            setIsRunning(false);
            setIsPause(false);
            startbtn.classList.remove("bg-white", "text-black");
            pausebtn.classList.remove("bg-white", "text-black");
            setTimerValue(duration)
            if (timeRef.current) {
                clearInterval(timeRef.current);
            }
        }
    }
    function startHandler() {
        if (timerValue > 0) {
            setIsRunning(true)
            setIsPause(false)
            startbtn.classList.add("bg-white", "text-black");
            pausebtn.classList.remove("bg-white", "text-black");

        }
    }
    function pauseHandler() {
        if (isRunning) {
            setIsRunning(false)
            setIsPause(true)
            pausebtn.classList.add("bg-white", "text-black");
            startbtn.classList.remove("bg-white", "text-black");
        }
    }
    function resetHandler() {
        setIsPause(false)
        setIsRunning(false)
        setTimerValue(typeof duration === "number" ? duration : 0)
        startbtn.classList.remove("bg-white", "text-black");
        pausebtn.classList.remove("bg-white", "text-black");
        if (timeRef.current) {
            clearInterval(timeRef.current)
        }
    }
    function startAlarm() {
        let audioSrc = audioRef.current as HTMLAudioElement
        let alarmImg = alarmImgRef.current as HTMLElement
        audioSrc.play()
        alarmImg.classList.remove("hidden")
    }
    useEffect(() => {
        if (isRunning && !isPause) {
            timeRef.current = setInterval(() => {
                setTimerValue((prevTimerValue) => {
                    if (prevTimerValue <= 1) {
                        startAlarm()
                        clearInterval(timeRef.current)
                    }


                    return prevTimerValue - 1
                })
            }, 1000)
            return () => {
                if (timeRef.current) {
                    clearInterval(timeRef.current)
                }
            }
        }
    }, [isPause, isRunning])

    return <div className="flex relative flex-col items-center h-96 w-full max-sm:h-3/4  md:custom-width bg-gray-950 m-auto mt-80 max-sm:border-none max-sm:mt-4 rounded-lg border ">
        <div ref={alarmImgRef} className="h-full hidden filter backdrop-blur absolute top-0 left-0 w-full animate-ping">
            <img className="filter invert h-full w-full" src="/static/alarm.svg" alt="not found" />
        </div>
        <h1 className="text-center p-3 max-sm:text-3xl max-sm:pb-9 font-bold text-2xl">Countdown Timer App</h1>
        <div className="w-full flex justify-around max-sm:flex-col max-sm:items-center sm:w-3/4">
            <input ref={inputRef} onChange={handleDuration} className="w-3/4 max-sm:w-3/4 bg-transparent border rounded-lg pt-2 pb-2 pr-5 pl-5" type="text" placeholder="Enter Duration in seconds" />
            <button onClick={inputHandler} className="pt-2 pb-2 pr-5 pl-5 max-sm:mt-5 rounded-lg border bg-transparent text-white hover:bg-white transition-all hover:text-black">Set</button>
        </div>
        <div className="h-52 w-full sm:w-1/2  text-white font-extrabold text-7xl pt-16 text-center">{formatTime(timerValue)}</div>
        <div className="w-3/4 sm:w-1/2 flex justify-between max-[340px]:justify-center">
            <button onClick={pauseHandler} ref={pauseBtnRef} className="pt-2 pb-2 pl-5 pr-5 bg-transparent border rounded-lg hover:bg-white transition-all hover:text-black" >Pause</button>
            <button onClick={startHandler} ref={startBtnRef} className="pt-2 max-[340px]:ml-4 max-[340px]:mr-4 pb-2 pl-5 pr-5 bg-transparent border rounded-lg hover:bg-white transition-all hover:text-black ">Start</button>
            <button onClick={resetHandler} className="pt-2 pb-2 pl-5 pr-5 bg-transparent border rounded-lg hover:bg-white transition-all hover:text-black">Reset</button>

        </div>
        <audio ref={audioRef} loop src="/static/alarm.mp3"></audio>
    </div>

}