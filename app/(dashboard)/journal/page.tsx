import EntryCard from '@/components/EntryCard'
import NewEntryCard from '@/components/NewEntryCard'
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

  const firstentry =
    "I just got them. I'm so happy. I can't wait to wear them. I'm going to wear them all the time. I'm going to wear them to work. I'm going to wear them to the store. I'm going to wear them to the gym. I'm going to wear them to the park. I'm going to wear them to the beach. I'm going to wear them to the movies. I'm going to wear them to the club. I'm going to wear them to the bar. I'm going to wear them to the restaurant. I'm going to wear them to the party. I'm going to wear them to the concert. I'm going to wear them to the game. I'm going to wear them to the show. I'm going to wear them to the festival. I'm going to wear them to the fair. I'm going to wear them to the carnival. I'm going to wear them to the parade. I'm going to"

  await analyze(
    `I'm going to give you a journal entry, I want you to analyze it for a few things. I need the mood, a summary, what the subject is, and a color representing the mood. You need to respond back with a formatted JSON , like so: {"mood": "", "subject": "", "color": "" "negative": "" }.
   
   entrry: ${firstentry}
   `
  )

  return entries
}

const JournalPage = async () => {
  const entries = await getEntries()

  return (
    <div className=" md:p-8">
      <h2 className="text-2xl md:text-3xl mb-6 md:mb-10">Journal</h2>
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
