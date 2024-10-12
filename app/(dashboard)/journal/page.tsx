import EntryCard from '@/components/EntryCard'
import NewEntryCard from '@/components/NewEntryCard'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

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

  return entries
}

const JournalPage = async () => {
  const entries = await getEntries()

  return (
    <div className=" md:p-8">
      <h2 className="text-2xl md:text-3xl mb-6 md:mb-10">Journal</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  )
}

export default JournalPage
