'use client'

import { ResponsiveContainer, Line, XAxis, Tooltip, LineChart } from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  const dateLabel = new Date(label).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  if (active) {
    const analysis = payload[0].payload
    return (
      <div className="p-8 custom-tooltip bg-white/5 shadow-md  border border-black/10 rounded-lg">
        <div
          className="absolute left-2 top-2 w-2/3 h-2 rounded-full"
          style={{ background: analysis.color }}
        ></div>
        <p className="label text-sm">{dateLabel}</p>
        <div className="intro text-xl uppercase">{analysis.mood}</div>
      </div>
    )
  }

  return null
}

const HistoryChart = ({ data }) => {
  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <LineChart width={300} height={100} data={data}>
        {' '}
        <Line
          type="monotone"
          dataKey="sentimentScore"
          strokeWidth={2}
          activeDot={{ r: 8 }}
          stroke="#8884d8"
        />
        <XAxis dataKey="createdAt" />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default HistoryChart
