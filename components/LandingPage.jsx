"use client";
import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import Image from 'next/image'
const LandingPage = () => {

  const  imageRef=useRef();

  useEffect(()=>{
    const imageElement=imageRef.current;
    const handleScroll=()=>{
      const scrollPosition=window.scrollY;
      const scrollThreshold=100;

      if(scrollPosition>scrollThreshold){
        imageElement.classList.add("scrolled");
      }
      else{
        imageElement.classList.remove("scrolled");
      }
    }
    window.addEventListener("scroll",handleScroll);
    return()=>window.removeEventListener("scroll",handleScroll);
  },[])

  return (
    <div className='pb-20 px-4'>
        <div className='container mx-auto text-center'>
           <h1 className='text-5xl md:text-8xl lg:text-[105px] pb-6 '> The Future of Personal Finance </h1>
           <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'>
             AI that scans, alerts, analyzes, and optimizes—your all-in-one solution for smarter financial management.</p>
           <div className='flex justify-center space-x-4'>
            <Link href="/dashboard">
                <Button size="lg" className="px-8 hover:cursor-pointer">Get Started</Button>
            </Link>
           </div>
            <div className='banner-wrapper'>
              <div ref={imageRef} className='banner-image'>
                <Image src="/banner.jpg" width={1280} height={720} alt='Dashboard Preview' className='rounded-lg shadow-2xl border mx-auto' priority></Image>
              </div>
            </div>
        </div>
    </div>
  )
}

export default LandingPage