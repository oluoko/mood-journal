'use client'

import { createNewEntry } from '@/utils/api'
import { useRouter } from 'next/navigation'

const NewEntryCard = () => {
  const router = useRouter()

  const handleOnClick = async () => {
    const data = await createNewEntry()
    router.push(`/journal/${data.id}`)
  }
  return (
    <div
      className="cursor-pointer overflow-hidden rounded-lg border border-slate-400/30"
      onClick={handleOnClick}
    >
      <div className="p-3 md:p-6">
        <span className="text-lg md:text-2xl">New Entry</span>
      </div>
    </div>
  )
}

export default NewEntryCard
