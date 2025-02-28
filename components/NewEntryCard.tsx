'use client'

import { createNewEntry } from '@/utils/api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import Loader from '@/components/Loader' // Import the Loader component

const NewEntryCard = () => {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

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
      toast({
        title: 'Failed to create entry. Please try again.',
        description: String(error),
      })
    } finally {
      setLoading(false) // Stop loading after operation
    }
  }

  return (
    <div className="h-full">
      {loading && <Loader text="Creating your journal entry" />}{' '}
      {/* Show loader */}
      <div
        className={`cursor-pointer overflow-hidden rounded-lg border border-slate-400/30 h-full ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={!loading ? handleOnClick : undefined}
      >
        <div className="p-3">
          <span className="text-lg md:text-2xl font-extrabold">New Entry</span>
        </div>
      </div>
    </div>
  )
}

export default NewEntryCard
