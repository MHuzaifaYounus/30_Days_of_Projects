"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function Main() {
    type Question = {
        question: string,
        correct_answer: string,
        incorrect_answers: string[],
    }

    const [questions, setQuestions] = useState<Question[]>()
    const [currentQuestion, setCurrentQuestion] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [showResult, setShowResult] = useState<boolean>(false)
    const [scores, setScores] = useState<number>(0)

    useEffect(() => {
        async function getDate() {
            const response = await fetch("https://opentdb.com/api.php?amount=10&type=multiple")
            const data = await response.json()
            if (data.response_code === 0) {
                setQuestions(data.results)
                data.results.forEach((question: Question) => {
                    question.incorrect_answers.push(question.correct_answer)
                    question.incorrect_answers.sort(() => Math.random() - 0.5)

                })
                console.log(data)
                setIsLoading(false)
            }
        }
        getDate()
    }, [])
    function answerClickHandler(e) {

        if (e.target.innerText === questions[currentQuestion].correct_answer) {
            console.log("correct");
            setScores(prev => prev + 1)
            if (currentQuestion < 9) {
                setCurrentQuestion(prev => prev + 1)
            }
            else if (currentQuestion === 9) {
                console.log("complete");
                setShowResult(true)

            }
        }
        else {
            console.log("Incorrect");
            if (currentQuestion < 9) {
                setCurrentQuestion(prev => prev + 1)
            }
            else if (currentQuestion === 9) {
                console.log("complete");
                setShowResult(true)

            }
        }
    }
    function tryagainHandler() {
        setShowResult(false)
        setCurrentQuestion(0)
        setScores(0)
    }


    return (
        <Card className='w-[600px] max-sm:w-full m-auto sm:mt-32 max-sm:border-none rounded-xl flex flex-col justify-center items-center'>
            <CardHeader className='text-center'>
                <CardTitle className='text-4xl max-sm:text-3xl max-sm:pb-5 max-sm:pt-5'>Quiz App</CardTitle>
                <CardDescription className='text-gray-400 text-xl'>Made by Huzaifa</CardDescription>
            </CardHeader>
            <CardContent className='w-full relative max-sm:p-2 flex flex-col items-center '>
                {isLoading && <h1 className='text-gray-500 text-3xl pt-10 pb-10'>Loading ...</h1>}
                {(!isLoading && !showResult) &&
                    <div className='w-full flex flex-col '>
                        <h1 className='text-2xl text-gray-500 '>Question {currentQuestion + 1}/10</h1>
                        <h2 className='text-xl pt-5 text-center'>{questions[currentQuestion].question}</h2>
                        {questions[currentQuestion].incorrect_answers.map((answer, index) => {
                            return <Button key={index} variant='outline' className='rounded-xl mt-5  hover:bg-white hover:text-black' onClick={answerClickHandler}>{answer}</Button>
                        })}
                        <h2 className='text-gray-500 text-xl text-end pt-5'>Scores: {scores}</h2>
                    </div>
                }
                {showResult && <div className='flex flex-col items-center'>
                    <h1 className='text-2xl'>Result:</h1>
                    <p className='text-gray-500 text-xl pt-5'>Scores: {scores}  out of 10</p>
                    <Button variant='outline' className='rounded-xl mt-5  hover:bg-white hover:text-black' onClick={tryagainHandler}>Try Again</Button>
                </div>}

            </CardContent>
        </Card >
    )
}
