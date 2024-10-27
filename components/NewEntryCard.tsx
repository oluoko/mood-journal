'use client'

import { createNewEntry } from '@/utils/api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Loader from '@/components/Loader' // Import the Loader component

const NewEntryCard = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false) // Track loading state
  const [message, setMessage] = useState('')

  const handleOnClick = async () => {
    try {
      setLoading(true) // Start loading

      const data = await createNewEntry()

      if (!data?.id) {
        throw new Error('Entry creation failed: Invalid response from server.')
      }

      router.push(`/journal/${data.id}`) // Redirect after success
    } catch (error) {
      console.error('Error creating entry:', error)
      setMessage('Failed to create entry. Please try again.')
    } finally {
      setLoading(false) // Stop loading after operation
    }
  }

  return (
    <div>
      {loading && <Loader text="Creating your journal entry..." />}{' '}
      {/* Show loader */}
      <div
        className={`cursor-pointer overflow-hidden rounded-lg border border-slate-400/30 ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={!loading ? handleOnClick : undefined}
      >
        <div className="p-3 md:p-6">
          <span className="text-lg md:text-2xl">New Entry</span>
        </div>
      </div>
      {/* Error or Success Message */}
      {message && <div className="mt-2 text-sm text-slate-400">{message}</div>}
    </div>
  )
}

export default NewEntryCard
