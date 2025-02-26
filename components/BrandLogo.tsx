'use client'

import logo from '/public/Reflectify W logo.gif'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface BrandLogoProps {
  styling: string
}

export function BrandLogo({ styling }: BrandLogoProps) {
  const [mounted, setMounted] = useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  // If the component is not yet mounted, return null or a placeholder
  if (!mounted) {
    return null
  }

  return (
    <div className={`${styling}`}>
      <Image src={logo} className="size-full" alt="Logo in white text" />
    </div>
  )
}
