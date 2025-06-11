import React from 'react'
import {
  SignInButton,SignUpButton,SignedIn,SignedOut,UserButton,
} from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { LayoutDashboard, PenBox } from 'lucide-react'

const Header = async() => {
  return (
    <div className='fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b '>
      <nav className='container mx-auto px-4 py-3 flex items-center justify-between'>
        <Link href="/">
          <Image src={"/logo.png"} alt="Xpense logo" height={50} width={75}
          className='object-contain ' priority/>
        </Link>
      
          <div className='flex items-center space-x-4'>
             {/* If the user is Signedin */}
            <SignedIn>
              <Link href={"/dashboard"} className='text-gray-600 hover:text-blue-600 flex items-center gap-2'>
                <Button variant="outline">
                  <LayoutDashboard size={18}/>
                  <span className='hidden md:inline'>Dashboard</span>
                </Button>
              </Link>
              <Link href={"/transaction/create"}>
                <Button className="flex items-center gap-2">
                  <PenBox size={18}/>
                  <span className='hidden md:inline'>Add Transaction</span>
                </Button>
              </Link>
            </SignedIn>

             {/* If the user is signed out */}

            <SignedOut>
              <SignInButton forceRedirectUrl='/dashboard'>
                <Button variant="outline">Login</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
                <UserButton appearance={{
                  elements:{
                    avatarBox: {
                      width: '2.5rem',
                      height: '2.5rem',
                    },
                  },
                }}/>
            </SignedIn>
          </div>
        </nav>
    </div>
  )
}

export default Header