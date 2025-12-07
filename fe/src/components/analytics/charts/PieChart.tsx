import { Box } from '@chakra-ui/react'
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const COLORS = [
  '#3B82F6',
  '#10B981',
  '#F59E0B',
  '#EF4444',
  '#8B5CF6',
  '#EC4899',
]

interface PieChartProps {
  data: Array<{ name: string; value: number }>
  height?: number
  showLabel?: boolean
}

export const PieChart = ({
  data,
  height = 200,
  showLabel = true,
}: PieChartProps) => {
  return (
    <Box w="100%" h={`${height}px`}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={
              showLabel
                ? ({ name, percent }) =>
                    `${name}: ${((percent || 0) * 100).toFixed(0)}%`
                : false
            }
            outerRadius={60}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              fontSize: 12,
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
            }}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    </Box>
  )
}
