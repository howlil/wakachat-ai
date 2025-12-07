import { Box, Flex, Text, Badge } from '@chakra-ui/react'
import {
  MessageSquare,
  Zap,
  TrendingUp,
  DollarSign,
  Bot,
  AlertCircle,
} from 'lucide-react'
import { StatCard } from './StatCard'
import { LineChart } from './charts/LineChart'
import { BarChart } from './charts/BarChart'
import type { StatCardData, AIPerformanceData } from './types'

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

const tokenUsageData = [
  { date: 'Mon', input: 45230, output: 34120 },
  { date: 'Tue', input: 52340, output: 39870 },
  { date: 'Wed', input: 48560, output: 36440 },
  { date: 'Thu', input: 61240, output: 45780 },
  { date: 'Fri', input: 55430, output: 41290 },
  { date: 'Sat', input: 38920, output: 29340 },
  { date: 'Sun', input: 42180, output: 31560 },
]

const aiMessageUsageData = [
  { date: 'Mon', messages: 342, credits: 1240 },
  { date: 'Tue', messages: 398, credits: 1456 },
  { date: 'Wed', messages: 365, credits: 1302 },
  { date: 'Thu', messages: 421, credits: 1589 },
  { date: 'Fri', messages: 389, credits: 1398 },
  { date: 'Sat', messages: 298, credits: 1067 },
  { date: 'Sun', messages: 312, credits: 1121 },
]

const statCards: StatCardData[] = [
  {
    icon: MessageSquare,
    label: 'Total AI Messages',
    value: '5,255',
    change: '+18.2%',
    trend: 'up',
  },
  {
    icon: Zap,
    label: 'Total Credits',
    value: '18,932',
    change: '+15.8%',
    trend: 'up',
  },
  {
    icon: TrendingUp,
    label: 'Input Tokens',
    value: '1.2M',
    change: '+22.4%',
    trend: 'up',
  },
  {
    icon: TrendingUp,
    label: 'Output Tokens',
    value: '892K',
    change: '+19.7%',
    trend: 'up',
  },
  {
    icon: DollarSign,
    label: 'Estimated Cost',
    value: '$52.02',
    change: '+21.1%',
    trend: 'up',
  },
]

const aiPerformanceData: AIPerformanceData[] = [
  {
    agent: 'Sales Bot',
    messagesSent: 1245,
    creditsUsed: 4567,
    sessionsHandled: 89,
    handoffCount: 12,
    handoffRate: 13.5,
    inputTokens: 245680,
    outputTokens: 189340,
    estimatedCost: 12.45,
  },
  {
    agent: 'Support Bot',
    messagesSent: 2134,
    creditsUsed: 7823,
    sessionsHandled: 142,
    handoffCount: 28,
    handoffRate: 19.7,
    inputTokens: 398220,
    outputTokens: 324560,
    estimatedCost: 21.34,
  },
  {
    agent: 'General Bot',
    messagesSent: 1876,
    creditsUsed: 6542,
    sessionsHandled: 118,
    handoffCount: 19,
    handoffRate: 16.1,
    inputTokens: 356780,
    outputTokens: 278940,
    estimatedCost: 18.23,
  },
]

export const AIPerformanceAnalytics = () => {
  const totalMessages = aiPerformanceData.reduce(
    (sum, ai) => sum + ai.messagesSent,
    0,
  )
  const totalCredits = aiPerformanceData.reduce(
    (sum, ai) => sum + ai.creditsUsed,
    0,
  )
  const totalSessions = aiPerformanceData.reduce(
    (sum, ai) => sum + ai.sessionsHandled,
    0,
  )
  const totalHandoffs = aiPerformanceData.reduce(
    (sum, ai) => sum + ai.handoffCount,
    0,
  )
  const totalInputTokens = aiPerformanceData.reduce(
    (sum, ai) => sum + ai.inputTokens,
    0,
  )
  const totalOutputTokens = aiPerformanceData.reduce(
    (sum, ai) => sum + ai.outputTokens,
    0,
  )
  const totalCost = aiPerformanceData.reduce(
    (sum, ai) => sum + ai.estimatedCost,
    0,
  )

  return (
    <Box>
      <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={4} mb={4}>
        {statCards.map((stat, index) => (
          <StatCard key={index} data={stat} />
        ))}
      </Box>

      <Box
        bg="white"
        borderRadius="lg"
        borderWidth={1}
        borderColor="gray.200"
        p={4}
        mb={4}
      >
        <Text fontSize="xs" color="gray.700" mb={3}>
          AI Message Sent by Hour
        </Text>
        <LineChart
          data={peakHourData}
          dataKey="messages"
          xAxisKey="hour"
          color="#3B82F6"
          height={250}
        />
      </Box>

      <Box
        bg="white"
        borderRadius="lg"
        borderWidth={1}
        borderColor="gray.200"
        p={4}
        mb={4}
      >
        <Text fontSize="xs" color="gray.700" mb={3}>
          Token Usage (Input vs Output)
        </Text>
        <BarChart
          data={tokenUsageData}
          xAxisKey="date"
          height={250}
          bars={[
            { dataKey: 'input', color: '#3B82F6', name: 'Input Tokens' },
            { dataKey: 'output', color: '#10B981', name: 'Output Tokens' },
          ]}
        />
      </Box>

      <Box
        bg="white"
        borderRadius="lg"
        borderWidth={1}
        borderColor="gray.200"
        p={4}
        mb={4}
      >
        <Text fontSize="xs" color="gray.700" mb={3}>
          AI Credit Use
        </Text>
        <LineChart
          data={aiMessageUsageData}
          dataKey="credits"
          xAxisKey="date"
          color="#8B5CF6"
          height={250}
        />
      </Box>

      <Box
        bg="white"
        borderRadius="lg"
        borderWidth={1}
        borderColor="gray.200"
        p={4}
        mb={4}
      >
        <Text fontSize="xs" color="gray.700" mb={3}>
          AI Performance Comparison
        </Text>
        <Box overflowX="auto">
          <Box as="table" w="100%" fontSize="xs">
            <Box
              as="thead"
              bg="gray.50"
              borderBottomWidth={1}
              borderColor="gray.200"
            >
              <Box as="tr">
                {[
                  'AI Agent',
                  'Messages Sent',
                  'Credits Used',
                  'Sessions Handled',
                  'Handoff Count',
                  'Handoff Rate',
                  'Input Tokens',
                  'Output Tokens',
                  'Est. Cost',
                ].map((header) => (
                  <Box
                    key={header}
                    as="th"
                    textAlign="left"
                    p={2}
                    color="gray.700"
                    fontWeight="medium"
                  >
                    {header}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box as="tbody">
              {aiPerformanceData.map((ai, index) => (
                <Box
                  key={index}
                  as="tr"
                  borderBottomWidth={1}
                  borderColor="gray.100"
                  _hover={{ bg: 'gray.50' }}
                >
                  <Box as="td" p={2}>
                    <Flex alignItems="center" gap={2}>
                      <Bot size={16} color="#9333EA" />
                      {ai.agent}
                    </Flex>
                  </Box>
                  <Box as="td" p={2} color="gray.900">
                    {ai.messagesSent.toLocaleString()}
                  </Box>
                  <Box as="td" p={2} color="gray.900">
                    {ai.creditsUsed.toLocaleString()}
                  </Box>
                  <Box as="td" p={2} color="gray.900">
                    {ai.sessionsHandled}
                  </Box>
                  <Box as="td" p={2} color="gray.900">
                    {ai.handoffCount}
                  </Box>
                  <Box as="td" p={2}>
                    <Badge
                      h="16px"
                      px={1.5}
                      fontSize="xs"
                      borderWidth={0}
                      bg={
                        ai.handoffRate < 15
                          ? 'green.100'
                          : ai.handoffRate < 20
                            ? 'yellow.100'
                            : 'red.100'
                      }
                      color={
                        ai.handoffRate < 15
                          ? 'green.700'
                          : ai.handoffRate < 20
                            ? 'yellow.700'
                            : 'red.700'
                      }
                    >
                      {ai.handoffRate}%
                    </Badge>
                  </Box>
                  <Box as="td" p={2} color="gray.900">
                    {ai.inputTokens.toLocaleString()}
                  </Box>
                  <Box as="td" p={2} color="gray.900">
                    {ai.outputTokens.toLocaleString()}
                  </Box>
                  <Box as="td" p={2}>
                    <Text color="green.600">
                      ${ai.estimatedCost.toFixed(2)}
                    </Text>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box
              as="tfoot"
              bg="gray.50"
              borderTopWidth={2}
              borderColor="gray.300"
            >
              <Box as="tr">
                <Box as="td" p={2} color="gray.900" fontWeight="medium">
                  Total
                </Box>
                <Box as="td" p={2} color="gray.900">
                  {totalMessages.toLocaleString()}
                </Box>
                <Box as="td" p={2} color="gray.900">
                  {totalCredits.toLocaleString()}
                </Box>
                <Box as="td" p={2} color="gray.900">
                  {totalSessions}
                </Box>
                <Box as="td" p={2} color="gray.900">
                  {totalHandoffs}
                </Box>
                <Box as="td" p={2}>
                  -
                </Box>
                <Box as="td" p={2} color="gray.900">
                  {totalInputTokens.toLocaleString()}
                </Box>
                <Box as="td" p={2} color="gray.900">
                  {totalOutputTokens.toLocaleString()}
                </Box>
                <Box as="td" p={2}>
                  <Text color="green.600">${totalCost.toFixed(2)}</Text>
                </Box>
              </Box>
            </Box>
          </Box>
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
          <Flex alignItems="center" gap={2} mb={2}>
            <DollarSign size={16} color="#10B981" />
            <Text fontSize="xs" color="gray.700">
              Total Cost (7 days)
            </Text>
          </Flex>
          <Text fontSize="xl" color="gray.900">
            $52.02
          </Text>
          <Text fontSize="xs" color="gray.500" mt={1}>
            Based on token usage
          </Text>
        </Box>

        <Box
          bg="white"
          borderRadius="lg"
          borderWidth={1}
          borderColor="gray.200"
          p={4}
        >
          <Flex alignItems="center" gap={2} mb={2}>
            <TrendingUp size={16} color="#2563EB" />
            <Text fontSize="xs" color="gray.700">
              Avg Cost per Message
            </Text>
          </Flex>
          <Text fontSize="xl" color="gray.900">
            $0.0099
          </Text>
          <Text fontSize="xs" color="gray.500" mt={1}>
            Calculated from total spend
          </Text>
        </Box>

        <Box
          bg="white"
          borderRadius="lg"
          borderWidth={1}
          borderColor="gray.200"
          p={4}
        >
          <Flex alignItems="center" gap={2} mb={2}>
            <AlertCircle size={16} color="#F97316" />
            <Text fontSize="xs" color="gray.700">
              Projected Monthly Cost
            </Text>
          </Flex>
          <Text fontSize="xl" color="gray.900">
            $223.23
          </Text>
          <Text fontSize="xs" color="gray.500" mt={1}>
            Based on current usage
          </Text>
        </Box>
      </Box>
    </Box>
  )
}
