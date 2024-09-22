"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ChangeEvent, useState } from "react"
import { demoCode } from "./demo";
export default function Main() {
    const [htmlCode, sethtmlCode] = useState<string>('')
    const [previewCode, setPreviewCode] = useState<string>('')
   


    function codeChangeHandler(e:ChangeEvent<HTMLTextAreaElement>) {
        sethtmlCode(e.target.value)
    }
    function showPreview() {
        setPreviewCode(htmlCode)
    }
    function demoHtmlHandler() {
        sethtmlCode(demoCode)
    }
    return (
        <Card className='w-[600px] max-sm:w-full m-auto sm:mt-20 max-sm:border-none rounded-xl flex flex-col justify-center items-center'>
            <CardHeader className='text-center'>
                <CardTitle className='text-4xl max-sm:text-3xl max-sm:pb-5 max-sm:pt-5'>HTML Previewer</CardTitle>
                <CardDescription className='text-gray-400 text-xl'>Made by Huzaifa</CardDescription>
            </CardHeader>
            <CardContent className='w-full relative max-sm:p-2 flex flex-col items-center '>
                <Textarea
                    placeholder="Type your text here..."
                    className="min-h-[100px] rounded-xl text-white placeholder-gray-400 border-gray-700 focus:border-gray-600 focus:ring-gray-600"
                    value={htmlCode}
                    onChange={codeChangeHandler}
                    
                />
                <div className="flex space-x-4 p-6">
                    <Button
                        variant="outline"
                        className="border-white rounded-xl text-white hover:bg-white hover:text-gray-900 transition-colors duration-300"
                        onClick={showPreview}
                    >
                        Show Preview
                    </Button>
                    <Button
                        variant="outline"
                        className="border-white rounded-xl text-white hover:bg-white hover:text-gray-900 transition-colors duration-300"
                        onClick={demoHtmlHandler}
                    >
                        Demo Html
                    </Button>
                </div>
                <div>
                    <div dangerouslySetInnerHTML={{__html: previewCode}}/>
                </div>
            </CardContent>
        </Card>
    )
}
