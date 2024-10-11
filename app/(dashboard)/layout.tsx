import { UserButton } from '@clerk/nextjs'

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen relative bg-slate-950 text-slate-300 ">
      <aside className="absolute top-0 left-0 h-full w-[200px] border-r border-slate-400/30">
        Mood
      </aside>
      <div className="ml-[200px]">
        <header className="p-4 h-[60px] border-b border-slate-400/30">
          <div className="h-full w-full px-6 flex items-center justify-end">
            <UserButton />
          </div>
        </header>
        <div className="">{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout
