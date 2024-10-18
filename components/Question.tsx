'use client'

import { useState } from 'react'

const Question = () => {
  const [value, setValue] = useState('')
  const onChange = (e) => {
    e.preventDefault()

    // do the thing
  }

  return (
    <div className="">
      <form action="">
        <input
          onChange={onChange}
          value={value}
          type="text"
          placeholder="Ask a question..."
          className="border border-black/20 px-4 py-6 rounded-lg text-sm md:text-xl"
        />
        <button
          type="submit"
          className="bg-blue-400 px-2 py-2 rounded-lg text-sm md:text:xl"
        >
          Ask
        </button>
      </form>
    </div>
  )
}

export default Question
