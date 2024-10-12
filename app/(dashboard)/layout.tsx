'use client'
import { useState, useEffect } from 'react'
import { UserButton } from '@clerk/nextjs'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { ReactNode } from 'react'

interface DashboardLayoutProps {
  children: ReactNode
}

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
          isSidebarOpen ? 'w-[200px]' : 'w-[30px] md:w-[60px]'
        } transition-all duration-300 h-full border-r border-slate-400/30 overflow-hidden`}
      >
        <div className="p-4 text-center">{isSidebarOpen ? 'Mood' : 'M'}</div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full">
        <header className="p-4 h-[60px] border-b border-slate-400/30 flex items-center justify-between">
          <div className="h-full w-auto" onClick={toggleSidebar}>
            <Bars3Icon className="w-8 h-8" />
          </div>
          <div className="px-6 flex items-center justify-end w-full">
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
