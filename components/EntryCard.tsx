'use client'

import Link from 'next/link'
import DeleteConfirmation from './DeleteConfirmation'
import { deleteEntry } from '@/utils/api'
import { useState } from 'react'
import Loader from './Loader'

const EntryCard = ({ entry }) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [loading, setIsloading] = useState(false)
  const date = new Date(entry.createdAt).toDateString()

  const truncate = (str, words) => {
    const truncatedWords = str.split(' ').slice(0, words).join(' ')
    return truncatedWords
  }

  const handleDelete = async () => {
    setIsloading(true)
    await deleteEntry(entry.id)
    setIsloading(false)
    window.location.reload()
    setIsDeleting(false)
  }

  const setOpacity = (color, opacity) => {
    return `${color}80`
  }

  return (
    <>
      {isDeleting && (
        <DeleteConfirmation
          subject={truncate(entry.analysis.subject, 4)}
          onConfirm={handleDelete}
          onCancel={() => setIsDeleting(false)}
        />
      )}
      {loading && <Loader text="Deleting the journal entry, please wait" />}
      <div
        className={` overflow-hidden rounded-lg border border-slate-400/30 bg-slate-700/40 text-sm md:text-xl`}
      >
        <div
          className="p-2 flex justify-between items-center border-b"
          style={{
            borderBottom: `4px solid ${setOpacity(entry.analysis.color, 0.1)}`,
          }}
        >
          <div className="text-lg">{date}</div>
          <div
            className="p-2 bg-red-700/70 hover:bg-red-800/70 text-sm rounded-lg border-black border-2 cursor-pointer"
            onClick={() => setIsDeleting(true)}
          >
            Delete
          </div>
        </div>
        <Link href={`/journal/${entry.id}`}>
          <div
            className="p-2 text-lg w-full border-b border-slate-400/30
         "
          >
            {entry.analysis.subject}
          </div>
          <div
            className="p-2 text-lg w-full h-[60px] overflow-hidden
         "
          >
            {entry.content}
          </div>{' '}
        </Link>
      </div>{' '}
    </>
  )
}

export default EntryCard
