"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ChangeEvent, useState } from "react"
import { CrossIcon, EditIcon } from "lucide-react";

export default function Main() {
    type Note = {
        title: string,
        content: string,
    }
    const [title, settitle] = useState<string>()
    const [content, setcontent] = useState<string>()
    const [editingNote, seteditingNote] = useState<number|null>(null)
    const [isEditting, setIsEditting] = useState<boolean>(false)
    const [Notes, setNotes] = useState<Note[]>([])
    function titleHandler(e: ChangeEvent<HTMLInputElement>) {
        settitle(e.target.value)
    }
    function contentHandler(e: ChangeEvent<HTMLTextAreaElement>) {
        setcontent(e.target.value)
    }
    function addNote() {
        if (title) {
            setNotes([...Notes, { title: title, content: content }])
            settitle('')
            setcontent('')
        }
    }
    function delHandler(i: number) {
        setNotes(Notes.filter((note, index) => index !== i))
    }
    function editHandler(title: string, content: string, index:number) {
        setIsEditting(true)
        seteditingNote(index)
        settitle(title)
        setcontent(content)
    }
    function updateNote() {
        setNotes(
            Notes.map((note,index) => { 
                if(index === editingNote){
                    return {...note,title:title,content:content}
                }
                else{
                    return note
                }
             })
        )
        settitle('')
        setcontent('')
        setIsEditting(false)
        seteditingNote(null)
    }
    return (
        <div className="w-[1100px] border rounded-xl p-10 m-auto mt-10 max-lg:w-full">
            <div >
                <h1 className="text-4xl ">Notes Taker</h1>
                <Input type="text" placeholder="Title" className="mt-10 rounded-xl mr-10" value={title} onChange={titleHandler}></Input>
                <Textarea className="rounded-xl h-10 mt-10" placeholder="Content" value={content} onChange={contentHandler}></Textarea>
                <Button variant="outline" className="rounded-xl hover:text-black hover:bg-white mt-10" onClick={isEditting ? updateNote : addNote}>{isEditting ? "Update Note" : "Add Note"}</Button>
            </div>
            <div className="w-full pt-10 flex flex-wrap justify-center">
                {Notes.map((note, index) => {
                    return <div className="border sm:ml-5 mt-5 relative p-5 w-[250px] rounded-xl h-[250px]" key={index}>
                        <CrossIcon className="rotate-45 top-2 right-2 absolute hover:scale-75 transition-all cursor-pointer" onClick={() => { delHandler(index) }}></CrossIcon>

                        <h1 className="text-xl">{note.title}</h1>
                        <p className="pt-2">{note.content}</p>
                        <EditIcon className="bottom-5 left-6 absolute hover:scale-110 transition-all cursor-pointer  " onClick={() => { editHandler(note.title,note.content,index) }}></EditIcon>
                    </div>
                })}
            </div>
        </div>
    )
}
