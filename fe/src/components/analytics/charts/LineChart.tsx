import { Box } from '@chakra-ui/react'
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface LineChartProps {
  data: Array<Record<string, string | number>>
  dataKey: string
  xAxisKey: string
  color?: string
  height?: number
  showLegend?: boolean
  lines?: Array<{
    dataKey: string
    color: string
    name: string
    yAxisId?: 'left' | 'right'
  }>
  rightYAxis?: boolean
}

export const LineChart = ({
  data,
  dataKey,
  xAxisKey,
  color = '#3B82F6',
  height = 200,
  showLegend = false,
  lines,
  rightYAxis = false,
}: LineChartProps) => {
  return (
    <Box w="100%" h={`${height}px`}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey={xAxisKey} tick={{ fontSize: 10 }} stroke="#9CA3AF" />
          <YAxis yAxisId="left" tick={{ fontSize: 10 }} stroke="#9CA3AF" />
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
          {showLegend && <Legend wrapperStyle={{ fontSize: 12 }} />}
          {lines && lines.length > 0 ? (
            lines.map((line) => (
              <Line
                key={line.dataKey}
                yAxisId={line.yAxisId || 'left'}
                type="monotone"
                dataKey={line.dataKey}
                stroke={line.color}
                strokeWidth={2}
                name={line.name}
              />
            ))
          ) : (
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
            />
          )}
        </RechartsLineChart>
      </ResponsiveContainer>
    </Box>
  )
}
