'use client'

import { updateEntry } from '@/utils/api'
import { use, useState } from 'react'
import { useAutosave } from 'react-autosave'

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)
  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true)
      const updated = await updateEntry(entry.id, _value)
      setIsLoading(false)
    },
  })

  return (
    <div className="w-full h-full">
      {isLoading && <div>...saving</div>}
      <textarea
        title="Entry Content"
        placeholder="Write your entry here..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="bg-slate-700/40 w-full h-[calc(100vh-100px)] p-3 md:p-7 text-sm md:text-xl rounded-lg outline-none"
      />
    </div>
  )
}

export default Editor
