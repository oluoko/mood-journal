import EntryCard from '@/components/EntryCard'
import NewEntryCard from '@/components/NewEntryCard'
import Question from '@/components/Question'
import { analyze } from '@/utils/ai'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import Link from 'next/link'

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

  const firstentry = `Welcome back! Take a moment to reflect on your day. The more honest and detailed you are, the better insight you'll gain into how you're feeling. Write about anything on your mind—what made you smile, what frustrated you, or anything in between.`

  await analyze(`${firstentry} `)

  return entries
}

const JournalPage = async () => {
  const entries = await getEntries()

  return (
    <div className=" md:p-8">
      <h2 className="text-2xl md:text-3xl mb-4 md:mb-6">Journal</h2>
      <div className=" w-5/6 md:w-1/2">
        <Question />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard key={entry.id} entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default JournalPage
