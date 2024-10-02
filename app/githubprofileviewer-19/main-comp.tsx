"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChangeEvent, useState } from 'react'
import Image from "next/image"
import Link from "next/link"

import {
    ExternalLinkIcon,
    RecycleIcon,
    StarIcon,
    UsersIcon,
} from "lucide-react";




export default function Main() {
    const [username, setUsername] = useState<string>()
    const [error, setError] = useState<string>()
    const [UserDetails, setUserDetails] = useState<UserDetails>()
    const [repoDetails, setRepoDetails] = useState<RepoDetails[]>()
    type UserDetails = {
        avatar_url: string;
        bio: string | null;
        blog: string;
        created_at: string;
        followers: number;
        followers_url: string;
        following: number;
        following_url: string;
        gravatar_id: string;
        html_url: string;
        login: string;
        name: string;
        public_repos: number;
        repos_url: string;
    };
    type RepoDetails = {
        name: string;
        description: string;
        stargazers_count: number;
        html_url: string

    }




    function usernameHandler(e: ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value)

    }
    async function getData() {
        try {
            const response = await fetch(`https://api.github.com/users/${username}`)
            if (!response.ok) {
                setError("User Not Found")
            }
            else {
                const data = await response.json()
                console.log(data);
                setUserDetails(data)
            }
            const repoResponse = await fetch(`https://api.github.com/users/${username}/repos`)
            if (!repoResponse.ok) {
                setError("Repositries Not Found")
            }
            else {
                const repoData = await repoResponse.json()
                console.log(repoData);

                setRepoDetails(repoData)

            }
        }
        catch (err) {
            setError(err)
        }
    }

    return (
        <Card className='w-[800px] max-sm:w-full m-auto sm:mt-12 max-sm:border-none rounded-xl flex flex-col justify-center items-center mb-10'>
            <CardHeader className='text-center'>
                <CardTitle className='text-4xl max-sm:text-3xl max-sm:pb-5 max-sm:pt-5'>GitHub Profile Viewer</CardTitle>
                <CardDescription className='text-gray-400 text-xl'>Made by Huzaifa</CardDescription>
            </CardHeader>
            <CardContent className='w-full relative max-sm:p-2 flex flex-col items-center '>
                <div className='w-full relative max-sm:p-2 flex  items-center  max-sm:flex-col '>
                    <Input type='text' className='rounded-xl' placeholder='Enter the github username here' onChange={usernameHandler}></Input>
                    <Button variant='outline' className='hover:text-black ml-5 max-sm:mt-5 hover:bg-white rounded-xl' onClick={getData}>Search</Button>
                </div>
                {(UserDetails && !error) &&
                    <div className='flex flex-col justify-center items-center'>
                        <div className='flex max-sm:flex-col  items-center  w-full pt-10'>
                            <Image
                                src={UserDetails?.avatar_url}
                                alt='no profile photo found'
                                className='rounded-full m-5'
                                width={150}
                                height={100}
                            />
                            <div className='flex flex-col max-sm:items-center '>
                                <div className='flex'>
                                    <h1 className='text-4xl '>{UserDetails?.login}</h1>
                                    <Link target='blank' href={UserDetails?.html_url}> <ExternalLinkIcon className='cursor-pointer hover:scale-110 transition-all'></ExternalLinkIcon></Link>

                                </div>
                                <h2 className='text-gray-400 text-xl'>{UserDetails?.name}</h2>
                                <p className='pt-3 w-[90%]'>{UserDetails?.bio}</p>
                                <div className='flex pt-8' >
                                    <div className='flex justify-center items-center'>
                                        <UsersIcon width={20} height={20} ></UsersIcon>
                                        <h1 className='text-sm pl-3'>{UserDetails?.followers} Followers</h1>
                                    </div>
                                    <div className='flex justify-center items-center pl-10'>
                                        <UsersIcon width={20} height={20} ></UsersIcon>
                                        <h1 className='text-sm pl-3'>{UserDetails?.following} Following</h1>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <h1 className='text-3xl pt-10 '>Repositries:</h1>
                        <div className='flex w-full  flex-wrap justify-between max-sm:justify-center items-center'>
                            {repoDetails?.map((repo,index) => {
                                return <div key={index} className='border rounded-xl w-[350px] h-[200px] max-sm-[350px]:w-[90%] mt-5 flex flex-col pl-5 relative' >
                                    <div className='flex pt-5'>
                                    <RecycleIcon></RecycleIcon>
                                    <h1 className='text-xl pl-5'>{repo?.name}</h1>
                                    </div>
                                    <p className='text-lg pt-5 text-gray-400'>{repo?.description}</p>
                                        <div className='flex absolute bottom-5 justify-center items-center'>
                                        <StarIcon width={15}></StarIcon>
                                        <p className='pl-3 text-lg'>{repo?.stargazers_count}</p>
                                        </div>
                                        <Link target='blank' className='absolute bottom-5 right-5 hover:underline transition-all' href={repo?.html_url}>view On GitHub</Link>
                                </div>
                            })}
                        </div>
                    </div>
                }
                {error && <h1 className='text-red-600 pt-10 text-3xl'>{error}</h1>}
            </CardContent>
        </Card>
    )
}
