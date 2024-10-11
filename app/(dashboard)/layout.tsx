'use client'
import { useState, useEffect } from 'react'
import { UserButton } from '@clerk/nextjs'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { ReactNode } from 'react'

interface DashboardLayoutProps {
  children: ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false) // Initially closed

  // Set sidebar open on larger screens and closed on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true) // Open sidebar on larger screens (md and above)
      } else {
        setIsSidebarOpen(false) // Closed on smaller screens (below md)
      }
    }

    // Initialize on mount
    handleResize()

    // Add resize event listener
    window.addEventListener('resize', handleResize)

    // Clean up the event listener on unmount
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="h-screen w-screen relative bg-slate-950 text-slate-300 flex">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-[200px]' : 'w-[30px] md:w-[60px]'
        } transition-all duration-300 h-full border-r border-slate-400/30 overflow-hidden`}
      >
        <div className="p-4 text-center">{isSidebarOpen ? 'Mood' : 'M'}</div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="p-4 h-[60px] border-b border-slate-400/30 flex items-center justify-between">
          <div className="h-full w-auto" onClick={toggleSidebar}>
            <Bars3Icon className="w-8 h-8" />
          </div>
          <div className="px-6 flex items-center justify-end w-full">
            <UserButton />
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
