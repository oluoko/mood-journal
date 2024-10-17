import Editor from '@/components/Editor'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getEntry = async (id) => {
  const user = await getUserByClerkId()
  const entry = prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  })

  return entry
}

const EntryPage = async ({ params }) => {
  const entry = await getEntry(params.id)
  const { mood, summary, subject, negative, color } = entry.analysis
  const analysisData = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative ? 'True' : 'False' },
  ]

  const setOpacity = (color, opacity) => {
    return `${color}80`
  }

  console.log('color', color)

  return (
    <div className="w-full h-full grid grid-cols-3 text-sm md:text-xl">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <div className="border border-slate-400/30 mx-2 md:mx-4 rounded-lg ">
        <div
          className="m-1 md:m-2 px-1 md:px-2 py-2 md:py-4 rounded-lg"
          style={{ backgroundColor: setOpacity(color, 0.1) }}
        >
          <h2 className="text-[15px] md:text-xl">Analysis</h2>
        </div>
        <div className="m-1 md:m-2 px-1 md:px-2 py-2 md:py-4 rounded-lg">
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="flex items-center  justify-between py-2 border-t border-slate-400/30"
              >
                <span className="font-extrabold text-sm">{item.name}</span>
                <span className="text-sm">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default EntryPage
