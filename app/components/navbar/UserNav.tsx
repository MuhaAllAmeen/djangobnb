'use client';

import { useEffect, useState } from "react";
import MenuLink from "./MenuLink";
import useLoginModal from "@/app/hooks/useLoginModal";
import useSignUpModal from "@/app/hooks/useSignUpModal";
import LogoutButton from "../LogoutButton";
import { useRouter } from "next/navigation";

interface userNavProps{
    userId: string | null;
}

const UserNav: React.FC<userNavProps> = ({userId}) => {
    const loginModal = useLoginModal()
    const signupModal = useSignUpModal()
    const router = useRouter()
    const [isOpen,setIsOPen]= useState(false)
    return (
        <div className="p-2 relative inline-block border rounded-full">
            <button  className="flex items-center"
            onClick={()=>setIsOPen(!isOpen)}>
            <svg  fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <svg  fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            </button>

            {isOpen && (
                <div className="w-[220px] flex flex-col cursor-pointer absolute top-[60px] right-0 bg-white border rounded-xl shadow-md">
                    {userId ? (
                        <>
                        <MenuLink label="My Properties" onClick={()=> {setIsOPen(false); router.push('/myproperties')}}/>
                        <MenuLink label="My Reservations" onClick={()=> {setIsOPen(false); router.push('/myreservations')}}/>
                        <MenuLink label="My Favorites" onClick={()=> {setIsOPen(false); router.push('/myfavorites')}}/>
                        <MenuLink label="My Inbox" onClick={()=> {setIsOPen(false); router.push('/inbox')}}/>

                        <LogoutButton />
                        </>
                    ): (
                        <>
                            <MenuLink label='Log In' onClick={()=> {console.log('click'); setIsOPen(false); loginModal.open()}}/>
                            <MenuLink label='Sign Up' onClick={()=> {console.log('click'); setIsOPen(false); signupModal.open()}}/>
                        </>
                    )
                }
                </div>
            )}
        </div>
    )
}

export default UserNav;