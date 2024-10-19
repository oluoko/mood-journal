const EntryCard = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString()
  return (
    <div
      className={`divide-y divide-slate-400/30 overflow-hidden rounded-lg border ${
        entry.color ? `border-[${entry.color}]` : 'border-slate-400/30'
      } bg-slate-700/40 text-sm md:text-xl`}
    >
      <div className="px-4 py-5 sm:px-6">{date}</div>
      {/* <div className="px-4 py-5 sm:px-6 flex justify-center items-center">
        <div>Title</div>
        <div>{entry.subject}</div>
      </div>
      <div className="px-4 py-5 sm:px-6 flex justify-center items-center">
        <div>Mood</div>
        <div className="uppercase">{entry.mood}</div>
      </div> */}
      <div className="px-4 py-4 sm:px-6 max-h-[70px] overflow-hidden">
        {entry.content}
      </div>
    </div>
  )
}

export default EntryCard
