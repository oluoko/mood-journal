'use client'

import { updateEntry } from '@/utils/api'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState(entry.analysis)

  const { mood, summary, subject, negative, color } = analysis
  const analysisData = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative ? 'True' : 'False' },
  ]

  const setOpacity = (color, opacity) => {
    return `${color}80`
  }

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true)
      const data = await updateEntry(entry.id, _value)
      setAnalysis(data.analysis)
      setIsLoading(false)
    },
  })

  return (
    <div className="w-full h-full grid grid-cols-3 text-sm md:text-xl">
      <div className="col-span-2">
        {isLoading && <div>...saving</div>}
        <textarea
          title="Entry Content"
          placeholder="Write your entry here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="bg-slate-700/40 w-full h-[calc(100vh-100px)] p-3 md:p-7 rounded-lg outline-none"
        />
      </div>

      <div className="border border-slate-400/30 mx-2 md:mx-4 rounded-lg ">
        <div
          className="m-1 md:m-2 px-1 md:px-2 py-2 md:py-4 rounded-lg"
          style={{ backgroundColor: setOpacity(color, 0.1) }}
        >
          <h2 className="text-[15px] md:text-xl">Analysis</h2>
        </div>
        <div className="m-1 md:m-2 px-1 md:px-2 py-2 md:py-4 rounded-lg">
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="flex items-center  justify-between py-2 border-t border-slate-400/30"
              >
                <span className="font-extrabold text-sm">{item.name}</span>
                <span className="text-sm">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Editor
