import { Box, Text } from '@chakra-ui/react'
import { MessageSquare, Users, Clock, CheckCircle } from 'lucide-react'
import { StatCard } from './StatCard'
import { LineChart } from './charts/LineChart'
import { PieChart } from './charts/PieChart'
import type { StatCardData } from './types'

const conversationData = [
  { date: 'Mon', conversations: 45 },
  { date: 'Tue', conversations: 52 },
  { date: 'Wed', conversations: 48 },
  { date: 'Thu', conversations: 61 },
  { date: 'Fri', conversations: 55 },
  { date: 'Sat', conversations: 38 },
  { date: 'Sun', conversations: 42 },
]

const peakHourData = [
  { hour: '00:00', messages: 12 },
  { hour: '03:00', messages: 8 },
  { hour: '06:00', messages: 15 },
  { hour: '09:00', messages: 45 },
  { hour: '12:00', messages: 68 },
  { hour: '15:00', messages: 52 },
  { hour: '18:00', messages: 72 },
  { hour: '21:00', messages: 35 },
]

const returningRateData = [
  { name: 'New Customer', value: 65 },
  { name: 'Returning Customer', value: 35 },
]

const resolutionRateData = [
  { name: 'Resolved by AI', value: 72 },
  { name: 'Resolved by Human', value: 28 },
]

const conversationSourceData = [
  { name: 'WhatsApp', value: 45 },
  { name: 'Instagram', value: 25 },
  { name: 'Messenger', value: 18 },
  { name: 'Live Chat', value: 12 },
]

const statCards: StatCardData[] = [
  {
    icon: MessageSquare,
    label: 'Total Conversations',
    value: '341',
    change: '+12.5%',
    trend: 'up',
  },
  {
    icon: Users,
    label: 'Unique Customers (MAU)',
    value: '278',
    change: '+8.3%',
    trend: 'up',
  },
  {
    icon: Clock,
    label: 'Avg Response Time',
    value: '2m 34s',
    change: '-15.2%',
    trend: 'down',
  },
  {
    icon: CheckCircle,
    label: 'Resolution Rate',
    value: '94.2%',
    change: '+3.1%',
    trend: 'up',
  },
]

export const ConversationAnalytics = () => {
  return (
    <Box>
      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={4} mb={4}>
        {statCards.map((stat, index) => (
          <StatCard key={index} data={stat} />
        ))}
      </Box>

      <Box display="grid" gridTemplateColumns="1fr 1fr" gap={4} mb={4}>
        <Box
          bg="white"
          borderRadius="lg"
          borderWidth={1}
          borderColor="gray.200"
          p={4}
        >
          <Text fontSize="xs" color="gray.700" mb={3}>
            Total Conversation (MAU)
          </Text>
          <LineChart
            data={conversationData}
            dataKey="conversations"
            xAxisKey="date"
            color="#3B82F6"
            height={200}
          />
        </Box>

        <Box
          bg="white"
          borderRadius="lg"
          borderWidth={1}
          borderColor="gray.200"
          p={4}
        >
          <Text fontSize="xs" color="gray.700" mb={3}>
            Peak Chat Hour
          </Text>
          <LineChart
            data={peakHourData}
            dataKey="messages"
            xAxisKey="hour"
            color="#10B981"
            height={200}
          />
        </Box>
      </Box>

      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={4}>
        <Box
          bg="white"
          borderRadius="lg"
          borderWidth={1}
          borderColor="gray.200"
          p={4}
        >
          <Text fontSize="xs" color="gray.700" mb={3}>
            Returning Rate
          </Text>
          <PieChart data={returningRateData} height={200} />
        </Box>

        <Box
          bg="white"
          borderRadius="lg"
          borderWidth={1}
          borderColor="gray.200"
          p={4}
        >
          <Text fontSize="xs" color="gray.700" mb={3}>
            Resolution Rate
          </Text>
          <PieChart data={resolutionRateData} height={200} />
        </Box>

        <Box
          bg="white"
          borderRadius="lg"
          borderWidth={1}
          borderColor="gray.200"
          p={4}
        >
          <Text fontSize="xs" color="gray.700" mb={3}>
            Conversation Source
          </Text>
          <PieChart data={conversationSourceData} height={200} />
        </Box>
      </Box>
    </Box>
  )
}
