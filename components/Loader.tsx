'use client'

import React, { useEffect, useState } from 'react'

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
    <div className="fixed inset-0 bg-black/80  z-50 flex items-center justify-center">
      <div className="relative w-full h-full">
        <p className="absolute inset-0 flex items-center justify-center text-white text-lg md:text-3xl font-semibold">
          {text}
          <span className="inline-block">{'.'.repeat(dots)}</span>
        </p>
      </div>
    </div>
  )
}

export default Loader
