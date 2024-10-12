'use client'

import { useState } from 'react'

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content)
  return (
    <div className="w-full h-full">
      <textarea value={value} />
    </div>
  )
}

export default Editor
