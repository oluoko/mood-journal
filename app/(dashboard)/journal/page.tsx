import JournalFilter from '@/components/JournalFilter'
import NewEntryCard from '@/components/NewEntryCard'
import Question from '@/components/Question'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { useRouter } from 'next/navigation'

const getEntries = async () => {
  const user = await getUserByClerkId()

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  // also get the analysis for each entry
  const entriesWithAnalysis = await Promise.all(
    entries.map(async (entry) => {
      const analysis = await prisma.analysis.findUnique({
        where: {
          entryId: entry.id,
        },
      })
      return { ...entry, analysis }
    })
  )

  return entriesWithAnalysis
}

const JournalPage = async () => {
  const entries = await getEntries()

  return (
    <div className=" md:p-2">
      <h2 className="text-2xl md:text-3xl mb-1 md:mb-2">Your Entries</h2>
      <div className=" w-full">
        <Question />
      </div>

      <JournalFilter entries={entries} />
    </div>
  )
}

export default JournalPage
