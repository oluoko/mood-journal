'use client'

import { useState } from 'react'

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content)
  return (
    <div className="w-full h-full">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="bg-slate-700/40 w-full h-[calc(100vh-100px)] p-3 md:p-7 text-sm md:text-xl rounded-lg outline-none"
      />
    </div>
  )
}

export default Editor
