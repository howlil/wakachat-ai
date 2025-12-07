import { Box } from '@chakra-ui/react'
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface BarChartProps {
  data: Array<Record<string, string | number>>
  xAxisKey: string
  height?: number
  bars: Array<{
    dataKey: string
    color: string
    name: string
    stackId?: string
  }>
  yAxisId?: string | 'left' | 'right'
  rightYAxis?: boolean
}

export const BarChart = ({
  data,
  xAxisKey,
  height = 200,
  bars,
  yAxisId = 'left',
  rightYAxis = false,
}: BarChartProps) => {
  return (
    <Box w="100%" h={`${height}px`}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey={xAxisKey} tick={{ fontSize: 10 }} stroke="#9CA3AF" />
          <YAxis yAxisId={yAxisId} tick={{ fontSize: 10 }} stroke="#9CA3AF" />
          {rightYAxis && (
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 10 }}
              stroke="#9CA3AF"
            />
          )}
          <Tooltip
            contentStyle={{
              fontSize: 12,
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          {bars.map((bar) => (
            <Bar
              key={bar.dataKey}
              yAxisId={
                bar.stackId
                  ? yAxisId
                  : bar.dataKey === bars[1]?.dataKey && rightYAxis
                    ? 'right'
                    : yAxisId
              }
              dataKey={bar.dataKey}
              fill={bar.color}
              name={bar.name}
              stackId={bar.stackId}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </Box>
  )
}
