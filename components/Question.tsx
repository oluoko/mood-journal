'use client'

import { askQuestion } from '@/utils/api'
import { useState } from 'react'

const Question = () => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState('')

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const answer = await askQuestion(value)
    setResponse(answer)

    setValue('')
    setLoading(false)
  }

  return (
    <div className="w-full mb-4">
      <form
        action=""
        className="w-5/6 md:w-2/3 flex items-center gap-2 md:gap-4"
        onSubmit={handleSubmit}
      >
        <input
          disabled={loading}
          onChange={onChange}
          value={value}
          type="text"
          placeholder="Ask the AI(gpt-3.5-turbo) a question about your entries..."
          className="border border-black/20 px-2 py-1 rounded-xl text-sm md:text-xl w-3/4 text-black"
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700/40 border border-slate-400/30 px-2 py-1 rounded-xl text-sm md:text-xl w-1/4 h-full"
        >
          Ask
        </button>
      </form>
      {loading && <div>Loading...</div>}
      {response && (
        <div className="w-11/12 md:w-full my-3 pb-2 md:pb-4 border-b border-slate-400/35">
          {response}
        </div>
      )}
    </div>
  )
}

export default Question
