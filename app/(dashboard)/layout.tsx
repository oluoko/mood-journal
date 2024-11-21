'use client'
import { useState, useEffect } from 'react'
import { UserButton } from '@clerk/nextjs'
import {
  HomeIcon,
  BookOpenIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'
import {
  EllipsisVertical,
  List,
} from "lucide-react";
import { ReactNode } from 'react'
import smallLogo from '/public/Rlogo w.svg'
import largeLogo from '/public/Reflectify W Animinate Logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import CreatorImage from '@/components/CreatorImage'

interface DashboardLayoutProps {
  children: ReactNode
}

const links = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/journal', label: 'Journal', icon: BookOpenIcon },
  { href: '/history', label: 'History', icon: ClockIcon },
  { href: '/creator', label: 'Creator', icon: CreatorImage },
]

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // always close sidebar on load
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(false)
    }

    handleResize()
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="h-screen w-screen relative bg-slate-950 text-slate-300 flex">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-[27%] md:w-[170px]' : 'w-[10%] md:w-[5%]'
        } transition-all duration-300 h-full border-r border-slate-400/30 overflow-hidden`}
      >
        <Link href="/" className="w-11/12 p-4 text-center">
          <Image
            className="w-full h-auto p-2 md:p-4"
            src={isSidebarOpen ? largeLogo : smallLogo}
            alt="logo"
          />
        </Link>

        <ul>
          {links.map((link) => (
            <li
              key={link.href}
              className="px-2 md:px-4 py-3 md:py-6 text-sm md:text-xl"
            >
              <Link
                href={link.href}
                className="flex justify-between items-center "
              >
                <link.icon className="w-4 md:w-8 h-4 md:h-8" />

                {isSidebarOpen && (
                  <span className="pr-3 md:pr-6"> {link.label} </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full">
        <header className="p-2 md:p-4 h-[60px] border-b border-slate-400/30 flex items-center justify-between">
          <div
            className="h-full flex items-center justify-end cursor-pointer"
            onClick={toggleSidebar}
          >
 {isSidebarOpen ? <List className="size-6 md:size-8" /> : <EllipsisVertical className="size-6 md:size-8" />}
          </div>
          <div className="px-0 md:px-6 h-full flex items-center justify-end">
            <UserButton />
          </div>
        </header>

        <div className="flex-1 overflow-auto p-2 md:p-4 h-[calc(100vh-60px)]">
          {children}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
