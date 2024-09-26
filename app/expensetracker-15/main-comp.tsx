"use client"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ChangeEvent, useState } from 'react'
import { FilePenIcon, TrashIcon } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


export default function Main() {
    interface Expense {
        id: number,
        title: string,
        amount: number,
        date: Date
    }
    const [mainAmount, setMainAmount] = useState<number>(0.00)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [editingId, setEditingId] = useState<number>()
    const [expenseTitle, setexpenseTitle] = useState<string>()
    const [expenseId, setExpenseId] = useState<number>(1)
    const [expenseDate, setExpenseDate] = useState<Date>(new Date())
    const [expnseAmount, setExpnseAmount] = useState<number>()
    const [showModal, setShowModal] = useState<boolean>(false);
    const [expenses, setExpenses] = useState<Expense[]>([

        {
            id: 0,
            title: "Grocery",
            amount: 0,
            date: new Date()
        }
    ])
    function resetForm() {
        setExpenseDate(new Date())
        setExpnseAmount(0)
        setexpenseTitle('')
    }
    function editHandler(date: Date, amount: number, title: string, id: number) {
        setIsEditing(true)
        setShowModal(true)
        setExpenseDate(date)
        setExpnseAmount(amount)
        setexpenseTitle(title)
        setEditingId(id)

    }
    function saveHandler() {
        setExpenses(
            expenses.map((expense) => {
                if (expense.id === editingId) {
                    setMainAmount(prev => prev - expense.amount)
                    return { ...expense, amount: expnseAmount, title: expenseTitle, date: expenseDate }
                }
                else {
                    return expense
                }
            })
        )
        setMainAmount(prev => prev + expnseAmount)
        setShowModal(false)
        setIsEditing(false)
        resetForm()
    }
    function delHandler(amount: number, id: number) {
        setExpenses(expenses.filter((expense) => expense.id !== id))
        setMainAmount(prev => prev - amount)


    }
    function addBtnHandler() {
        setExpenseId(prev => prev += 1)
        setExpenses([...expenses, {
            id: expenseId,
            title: expenseTitle,
            amount: expnseAmount,
            date: expenseDate
        }])
        console.log(expenses);
        setMainAmount(prev => prev + expnseAmount)
        resetForm()
        setShowModal(false)

    }
    function dateHandler(e: ChangeEvent<HTMLInputElement>) {
        setExpenseDate(new Date(e.target.value))

    }
    function expenseTitleHandler(e: ChangeEvent<HTMLInputElement>) {
        setexpenseTitle(e.target.value)
    }
    function expenseAmountHandler(e: ChangeEvent<HTMLInputElement>) {
        setExpnseAmount(Number(e.target.value))
    }
    return (<>
        <div className='w-full'>
            <div className='bg-green-900 flex justify-between items-center text-3xl max-sm:text-2xl font-bold p-3'>
                <h1>Expense Tracker</h1>
                <h1>Total:${mainAmount}</h1>
            </div>
            <div className='flex flex-col justify-center items-center'>
                {expenses.map((expense) => {
                    return <div key={expense.id} className='w-[90%] border text-4xl max-sm:text-2xl p-5 max-sm:p-3 mt-8 rounded-xl flex justify-between items-center'>
                        <div>
                            <h1>{expense.title}</h1>
                            <p className='text-sm max-sm:text-[0.8rem] pl-2 text-gray-400'>{expense.date.toISOString().slice(0, 10)}</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <h1>${expense.amount}</h1>
                            <FilePenIcon className='ml-4 scale-75 cursor-pointer text-gray-500 hover:text-white' onClick={() => { editHandler(expense.date, expense.amount, expense.title, expense.id) }}></FilePenIcon>
                            <TrashIcon className='ml-4 scale-75 cursor-pointer text-gray-500 hover:text-white' onClick={() => { delHandler(expense.amount, expense.id) }}></TrashIcon>

                        </div>

                    </div>
                })}
            </div>
        </div>
        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogTrigger className='rounded-full absolute bottom-3 right-4 font-extrabold text-xl cursor-pointer hover:bg-green-700 border pt-2 pb-2 pl-4 pr-4'>
                +
            </DialogTrigger>
            <DialogContent >
                <DialogHeader >
                    <DialogTitle className='text-center text-xl'>Add Expense</DialogTitle>
                </DialogHeader>

                <Label>Title:</Label>
                <Input type='text' className='rounded-xl' value={expenseTitle} onChange={expenseTitleHandler}></Input>
                <Label>Amount:</Label>
                <Input type='number' className='rounded-xl' value={expnseAmount} onChange={expenseAmountHandler}></Input>
                <Label>Date:</Label>
                <Input type='date' className='rounded-xl text-black invert' value={expenseDate.toISOString().slice(0, 10)} onChange={dateHandler}></Input>
                <Button variant='outline' className='rounded-xl w-16 mt-5 hover:bg-green-800' onClick={isEditing ? saveHandler : addBtnHandler}>{isEditing ? "Save" : "Add"}</Button>

            </DialogContent>
        </Dialog>
    </>
    )
}
