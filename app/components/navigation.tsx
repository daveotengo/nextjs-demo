"use client"

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'



export const Navigation = () => {
    const pathname = usePathname();

    return (
        <nav className='flex justify-center items-center p-4'>
            <Link href="/" className={pathname == "/"? "mr-4 font-bold":"text-blue-500 mr-4"}>Home</Link>
            <Link href="/about" className={pathname == "/about"? "mr-4 font-bold":"text-blue-500 mr-4"}>About</Link>
            <Link href="/products/1" className={pathname == "/products/1"? "mr-4 font-bold":"text-blue-500 mr-4"}>Product 1</Link>
            <SignedOut >
                <SignInButton mode="modal"/>
            </SignedOut>
            <SignedIn>
                <UserButton  />
            </SignedIn>
        </nav>
    )
} 