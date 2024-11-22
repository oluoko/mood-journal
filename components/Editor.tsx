'use client'

import { deleteEntry, updateEntry } from '@/utils/api'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import DeleteConfirmation from './DeleteConfirmation'
import { useRouter } from 'next/navigation'

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState(entry.analysis)
  const [entryDate, setEntryDate] = useState(entry.createdAt)
  const [usePrompts, setUsePrompts] = useState(false)
  const [startedTyping, setStartedTyping] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const prompts = [
    `What would I do if money  were no object?`,
    `What activities have recently energized or drained me?`,
    `If I knew I'd die in 2  years, how would I  spend my time?`,
    `Rating myself out  of  10 in work, health and relationships. What's one step to improve each?`,
    `What am I grateful for today?`,
    `What is a boundary I need to  set in my life?`,
    `What did I  learn from my last relationship or  an observed one?`,
    `What's a small frustration I can  improve or let go of?`,
    `A letter to someone I miss or thanking someone who impacted my life.`,
    `What excites me? What drains me? What did  I learn this week?`,
  ]

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

  // function to format date in the format mm/dd/yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = (1 + date.getMonth()).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const convertToISOString = (inputDate) => {
    // Ensure the input is in the format yyyy-mm-dd
    const [year, month, day] = inputDate.split('-')

    // Create a Date object
    const date = new Date(`${year}-${month}-${day}T00:00:00.000Z`)

    // Ensure the time zone offset is applied correctly
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format. Please use yyyy-mm-dd.')
    }

    return date
  }

  const handleDateChange = async (e) => {
    const newDate = convertToISOString(e.target.value)

    setEntryDate(newDate)
    setIsLoading(true)
    const updatedEntry = await updateEntry(entry.id, { createdAt: newDate })

    setEntryDate(updatedEntry.createdAt)
    setIsLoading(false)
  }

  const handleTyping = (e) => {
    if (!startedTyping) {
      setStartedTyping(true)
    }
    setValue(e.target.value)
  }

  const truncate = (str, words) => {
    const truncatedWords = str.split(' ').slice(0, words).join(' ')
    return truncatedWords
  }
  const handleDelete = async () => {
    try {
      await deleteEntry(entry.id)
      router.push('/journal')
      setIsDeleting(false)
    } catch (error) {
      console.error(error)
      setIsDeleting(false)
    }
  }

  useAutosave({
    data: { id: entry.id, content: value },
    onSave: async ({ content }) => {
      setIsLoading(true)
      const data = await updateEntry(entry.id, { content })
      setAnalysis(data.analysis)
      setIsLoading(false)
    },
  })

  return (
    <>
      {isDeleting && (
        <DeleteConfirmation
          subject={truncate(entry.analysis.subject, 4)}
          onConfirm={handleDelete}
          onCancel={() => setIsDeleting(false)}
        />
      )}
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 text-sm md:text-xl">
        <div className="col-span-2">
          <div className="flex justify-between mb-2">
            <label htmlFor="entry-date" className="sr-only">
              Entry Date
            </label>
            <input
              id="entry-date"
              type="date"
              value={formatDate(entryDate)}
              onChange={handleDateChange}
              className="bg-slate-700/40 rounded-lg p-1 text-sm"
            />
            <div className="flex justify-between gap-2">
              <div
                className="p-1 bg-red-700/70 hover:bg-red-800/70 text-sm rounded-lg border-black border-2 cursor-pointer"
                onClick={() => setIsDeleting(true)}
              >
                Delete
              </div>
              <div className="bg-green-400/50 rounded-lg p-1 text-sm">
                {isLoading ? <div>Saving...</div> : <div>Saved</div>}
              </div>
            </div>
          </div>

          <textarea
            title="Entry Content"
            placeholder={`Welcome! Take a moment to reflect on your day. The more honest and detailed you are, the better insight you'll gain into how you're feeling. Write about anything on your mind
            ${prompts
              .map((prompt, index) => `\n   ${index + 1}.   ${prompt}`)
              .join('')}
            \nWrite your entry here...`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="bg-slate-700/40 w-full h-[calc(60vh-70px)] md:h-[calc(100vh-100px)] p-2 rounded-lg outline-none text-sm md:text-lg"
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
                  <span className="font-extrabold text-lg w-1/3">
                    {item.name}
                  </span>
                  <span className="text-sm w-3/4 flex justify-end">
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Editor
