'use client'

import EntryCard from './EntryCard'
import NewEntryCard from './NewEntryCard'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const JournalFilter = ({ entries }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(3)
  const [error, setError] = useState<string | null>(null)

  // Handle screen resizing to adjust the number of entries per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setEntriesPerPage(7) // Large screens
      } else {
        setEntriesPerPage(3) // Small screens
      }
    }

    handleResize() // Initial check
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const totalPages = Math.ceil(entries.length / entriesPerPage)

  const currentEntries = entries.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  )

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  if (error) return <div>{error}</div>

  return (
    <>
      {' '}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
        <NewEntryCard />
        {currentEntries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg hover:bg-slate-800/50 disabled:opacity-50 border border-slate-400/30 bg-slate-700/40 text-sm md:text-lg"
        >
          Previous
        </button>{' '}
        <span className="text-sm md:text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg hover:bg-slate-800/50 disabled:opacity-50 border border-slate-400/30 bg-slate-700/40 text-sm md:text-lg"
        >
          Next
        </button>
      </div>
    </>
  )
}

export default JournalFilter
