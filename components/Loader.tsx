'use client'

import React, { useEffect, useState } from 'react'
import loadingGif from '@/public/Loader.gif'
import Image from 'next/image'

interface LoaderProps {
  text?: string
}

const Loader: React.FC<LoaderProps> = ({ text = 'Loading' }) => {
  const [dots, setDots] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev % 5) + 1)
    }, 500)

    return () => clearInterval(interval)
  }, [])
  return (
    <div className="fixed inset-0 bg-slate-950 z-50 flex items-center justify-center">
      <div className="relative w-[90%] md:w-[50%] flex flex-col items-center justify-center">
        <Image
          src={loadingGif}
          alt="Loading..."
          className="w-full h-auto mx-auto "
        />
        <p className="flex items-center justify-center text-white text-sm md:text-3xl font-semibold">
          {text}
          <span className="inline-block">{'.'.repeat(dots)}</span>
        </p>
      </div>
    </div>
  )
}

export default Loader
