import HistoryChart from '@/components/HistoryChart'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getData = async () => {
  const user = await getUserByClerkId()
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  const sum = analyses.reduce((all, current) => all + current.sentimentScore, 0)
  const avg = Math.round(sum / analyses.length)
  return { analyses, avg }
}

const History = async () => {
  const { avg, analyses } = await getData()

  return (
    <div className="md:p-2 h-full">
      <div>
        Average Sentiment:{' '}
        {avg
          ? avg
          : 'Nothing to Display. Go to Journal to input your first entry.'}
      </div>
      <div className="w-auto h-full">
        <HistoryChart data={analyses} />
      </div>
    </div>
  )
}

export default History
