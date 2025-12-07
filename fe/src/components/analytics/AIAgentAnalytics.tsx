import { Box, Flex, Text, Badge, Button } from '@chakra-ui/react'
import { Bot, Zap, TrendingUp, Star, Eye } from 'lucide-react'
import { StatCard } from './StatCard'
import { LineChart } from './charts/LineChart'
import { BarChart } from './charts/BarChart'
import type { StatCardData, FAQData } from './types'

const aiMessageUsageData = [
  { date: 'Mon', messages: 342, credits: 1240 },
  { date: 'Tue', messages: 398, credits: 1456 },
  { date: 'Wed', messages: 365, credits: 1302 },
  { date: 'Thu', messages: 421, credits: 1589 },
  { date: 'Fri', messages: 389, credits: 1398 },
  { date: 'Sat', messages: 298, credits: 1067 },
  { date: 'Sun', messages: 312, credits: 1121 },
]

const handoffRateData = [
  { agent: 'Sales Bot', handoff: 15, resolved: 85 },
  { agent: 'Support Bot', handoff: 22, resolved: 78 },
  { agent: 'General Bot', handoff: 18, resolved: 82 },
]

const statCards: StatCardData[] = [
  {
    icon: Bot,
    label: 'AI Messages Sent',
    value: '5,255',
    change: '+18.2%',
    trend: 'up',
  },
  {
    icon: Zap,
    label: 'Credits Used',
    value: '18,932',
    change: '+15.8%',
    trend: 'up',
  },
  {
    icon: TrendingUp,
    label: 'Avg Credit/Message',
    value: '3.6',
    change: '-2.5%',
    trend: 'down',
  },
  {
    icon: Star,
    label: 'AI Accuracy (CSAT)',
    value: '4.6/5',
    change: '+0.3',
    trend: 'up',
  },
]

const faqData: FAQData[] = [
  { question: 'Bagaimana cara melakukan pembayaran?', count: 156 },
  { question: 'Apakah bisa COD?', count: 142 },
  { question: 'Berapa lama pengiriman?', count: 128 },
  { question: 'Bagaimana cara tracking pesanan?', count: 98 },
  { question: 'Apakah ada diskon?', count: 87 },
]

export const AIAgentAnalytics = () => {
  return (
    <Box>
      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={4} mb={4}>
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
          AI Message Usage & Credit Use
        </Text>
        <LineChart
          data={aiMessageUsageData}
          dataKey="messages"
          xAxisKey="date"
          height={250}
          showLegend={true}
          rightYAxis={true}
          lines={[
            {
              dataKey: 'messages',
              color: '#3B82F6',
              name: 'Messages Sent',
              yAxisId: 'left',
            },
            {
              dataKey: 'credits',
              color: '#10B981',
              name: 'Credits Used',
              yAxisId: 'right',
            },
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
          Agent Handoff Rate
        </Text>
        <BarChart
          data={handoffRateData}
          xAxisKey="agent"
          height={250}
          bars={[
            {
              dataKey: 'resolved',
              color: '#10B981',
              name: 'Resolved by AI',
              stackId: 'a',
            },
            {
              dataKey: 'handoff',
              color: '#EF4444',
              name: 'Handoff to Human',
              stackId: 'a',
            },
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
        <Flex alignItems="center" justifyContent="space-between" mb={3}>
          <Text fontSize="xs" color="gray.700">
            AI Accuracy Rate (CSAT)
          </Text>
          <Badge
            h="20px"
            px={2}
            fontSize="xs"
            bg="yellow.100"
            color="yellow.700"
            borderWidth={0}
          >
            Beta - In Development
          </Badge>
        </Flex>
        <Flex alignItems="center" gap={2} mb={3}>
          <Flex gap={0.5}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={24}
                style={{
                  color: star <= 4 ? '#FBBF24' : '#D1D5DB',
                  fill: star <= 4 ? '#FBBF24' : 'none',
                }}
              />
            ))}
          </Flex>
          <Text fontSize="sm" color="gray.900">
            4.6 / 5.0
          </Text>
          <Text fontSize="xs" color="gray.500">
            (142 reviews)
          </Text>
        </Flex>
        <Box>
          {[5, 4, 3, 2, 1].map((rating) => {
            const percentage =
              rating === 5
                ? 68
                : rating === 4
                  ? 22
                  : rating === 3
                    ? 7
                    : rating === 2
                      ? 2
                      : 1
            return (
              <Flex key={rating} alignItems="center" gap={2} mb={2}>
                <Text fontSize="xs" color="gray.600" w="32px">
                  {rating} ★
                </Text>
                <Box
                  flex={1}
                  h="8px"
                  bg="gray.200"
                  borderRadius="full"
                  overflow="hidden"
                >
                  <Box
                    h="100%"
                    bg="yellow.400"
                    style={{ width: `${percentage}%` }}
                  />
                </Box>
                <Text fontSize="xs" color="gray.500" w="40px" textAlign="right">
                  {percentage}%
                </Text>
              </Flex>
            )
          })}
        </Box>
      </Box>

      <Box
        bg="white"
        borderRadius="lg"
        borderWidth={1}
        borderColor="gray.200"
        p={4}
      >
        <Text fontSize="xs" color="gray.700" mb={3}>
          Frequently Asked Questions
        </Text>
        <Box>
          {faqData.map((faq, index) => (
            <Flex
              key={index}
              alignItems="center"
              justifyContent="space-between"
              p={3}
              borderWidth={1}
              borderColor="gray.200"
              borderRadius="lg"
              _hover={{ bg: 'gray.50' }}
              mb={2}
            >
              <Box flex={1}>
                <Text fontSize="xs" color="gray.900">
                  {faq.question}
                </Text>
              </Box>
              <Flex alignItems="center" gap={3}>
                <Badge
                  h="20px"
                  px={2}
                  fontSize="xs"
                  bg="blue.100"
                  color="blue.700"
                  borderWidth={0}
                >
                  {faq.count} times
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  fontSize="xs"
                  color="blue.600"
                  _hover={{ textDecoration: 'underline' }}
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <Eye size={12} />
                  View Examples
                </Button>
              </Flex>
            </Flex>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
