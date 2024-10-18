'use client'

import { useState } from 'react'

const Question = () => {
  const [value, setValue] = useState('')
  const onChange = (e) => {
    setValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // do the thing
  }

  return (
    <div className="w-full mb-4">
      <form
        action=""
        className="w-full flex items-center gap-2 md:gap-4"
        onSubmit={handleSubmit}
      >
        <input
          onChange={onChange}
          value={value}
          type="text"
          placeholder="Ask a question..."
          className="border border-black/20 px-4 py-3 rounded-lg text-sm md:text-xl w-3/4"
        />
        <button
          type="submit"
          className="bg-blue-400 px-4 py-3 rounded-lg text-sm md:text-xl w-1/4 h-full"
        >
          Ask
        </button>
      </form>
    </div>
  )
}

export default Question
