const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen relative">
      <aside className="absolute top-0 left-0 h-full w-screen border-r border-black/10">
        {' '}
        Mood
      </aside>
      {children}
    </div>
  )
}

export default DashboardLayout
