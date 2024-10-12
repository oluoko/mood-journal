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
  })

  return entry
}

const EntryPage = async ({ params }) => {
  const entry = await getEntry(params.id)
  const analysisData = [
    { name: 'Summary', value: '' },
    { name: 'Subject', value: '' },
    { name: 'Mood', value: '' },
    { name: 'Negative', value: 'False' },
  ]

  return (
    <div className="w-full h-full grid grid-cols-3 text-sm md:text-xl">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <div className="border border-slate-400/30 mx-2 md:mx-4 rounded-lg ">
        <div className="bg-slate-700/40 m-1 md:m-2 px-1 md:px-2 py-2 md:py-4 rounded-lg">
          <h2 className="text-[15px] md:text-xl">Analysis</h2>
        </div>
        <div className="bg-slate-700/40 m-1 md:m-2 px-1 md:px-2 py-2 md:py-4 rounded-lg">
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="flex items-center  justify-between"
              >
                <span className="font-extrabold text-lg md:text-xl">
                  {item.name}
                </span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default EntryPage
