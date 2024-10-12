const EntryCard = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString()
  return (
    <div className="divide-y divide-slate-400/30 overflow-hidden rounded-lg border border-slate-400/30 bg-slate-700/40 ">
      <div className="px-4 py-5 sm:px-6">{date}</div>
      <div className="px-4 py-5 sm:px-6">summary</div>
      <div className="px-4 py-5 sm:px-6">mood</div>
      <div className="px-4 py-4 sm:px-6 max-h-[70px] overflow-hidden">
        {entry.content}
      </div>
    </div>
  )
}

export default EntryCard
