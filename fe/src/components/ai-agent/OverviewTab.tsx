import { Box, Flex, Text } from '@chakra-ui/react'
import {
  MessageSquare,
  Clock,
  Activity,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import type { AIAgent, PerformanceData } from './types'

interface OverviewTabProps {
  agent: AIAgent
}

const mockPerformanceData: PerformanceData = {
  today: {
    conversations: 45,
    avgResponse: '2.1s',
    satisfaction: 96,
    resolved: 42,
  },
  yesterday: {
    conversations: 38,
    avgResponse: '2.4s',
    satisfaction: 93,
    resolved: 35,
  },
  weeklyTrend: [
    { day: 'Mon', conversations: 32, satisfaction: 92 },
    { day: 'Tue', conversations: 28, satisfaction: 94 },
    { day: 'Wed', conversations: 35, satisfaction: 91 },
    { day: 'Thu', conversations: 41, satisfaction: 95 },
    { day: 'Fri', conversations: 38, satisfaction: 93 },
    { day: 'Sat', conversations: 25, satisfaction: 96 },
    { day: 'Sun', conversations: 22, satisfaction: 97 },
  ],
}

export const OverviewTab = ({ agent: _agent }: OverviewTabProps) => {
  const performanceData = mockPerformanceData

  return (
    <Box>
      <Flex gap={3} mb={3}>
        {[
          {
            label: 'Conversations Today',
            value: performanceData.today.conversations,
            change: '+18%',
            trend: 'up',
            icon: MessageSquare,
          },
          {
            label: 'Avg Response',
            value: performanceData.today.avgResponse,
            change: '-12%',
            trend: 'down',
            icon: Clock,
          },
          {
            label: 'Satisfaction',
            value: `${performanceData.today.satisfaction}%`,
            change: '+3%',
            trend: 'up',
            icon: Activity,
          },
          {
            label: 'Resolved',
            value: performanceData.today.resolved,
            change: '+15%',
            trend: 'up',
            icon: CheckCircle,
          },
        ].map((metric) => {
          const Icon = metric.icon
          return (
            <Box
              key={metric.label}
              bg="white"
              borderRadius="lg"
              p={3}
              borderWidth={1}
              borderColor="gray.200"
              flex={1}
            >
              <Flex alignItems="center" justifyContent="space-between" mb={2}>
                <Icon
                  size={16}
                  style={{
                    color: '#9333EA',
                  }}
                />
                <Text
                  fontSize="xs"
                  display="flex"
                  alignItems="center"
                  gap={0.5}
                  color={metric.trend === 'up' ? 'green.600' : 'blue.600'}
                >
                  {metric.trend === 'up' ? (
                    <ArrowUpRight size={12} />
                  ) : (
                    <ArrowDownRight size={12} />
                  )}
                  {metric.change}
                </Text>
              </Flex>
              <Text fontSize="lg" color="gray.900" mb={0.5}>
                {metric.value}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {metric.label}
              </Text>
            </Box>
          )
        })}
      </Flex>

      <Box
        bg="white"
        borderRadius="lg"
        p={4}
        borderWidth={1}
        borderColor="gray.200"
        mb={3}
      >
        <Flex alignItems="center" justifyContent="space-between" mb={3}>
          <Text fontSize="sm" color="gray.900" fontWeight="medium">
            Weekly Performance
          </Text>
          <Flex gap={2}>
            <Flex alignItems="center" gap={1}>
              <Box w="8px" h="8px" borderRadius="full" bg="purple.500" />
              <Text fontSize="xs" color="gray.600">
                Conversations
              </Text>
            </Flex>
            <Flex alignItems="center" gap={1}>
              <Box w="8px" h="8px" borderRadius="full" bg="green.500" />
              <Text fontSize="xs" color="gray.600">
                Satisfaction
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Box
          h="192px"
          display="flex"
          alignItems="flex-end"
          justifyContent="space-between"
          gap={2}
        >
          {performanceData.weeklyTrend.map((data) => {
            const maxConv = Math.max(
              ...performanceData.weeklyTrend.map((d) => d.conversations),
            )
            const convHeight = (data.conversations / maxConv) * 100

            return (
              <Box
                key={data.day}
                flex={1}
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={2}
              >
                <Box w="100%" display="flex" gap={1}>
                  <Box
                    flex={1}
                    bg="purple.500"
                    borderRadius="sm"
                    _hover={{ bg: 'purple.600' }}
                    style={{ height: `${convHeight * 1.5}px` }}
                    title={`${data.conversations} conversations`}
                  />
                  <Box
                    flex={1}
                    bg="green.500"
                    borderRadius="sm"
                    _hover={{ bg: 'green.600' }}
                    style={{ height: `${data.satisfaction * 1.5}px` }}
                    title={`${data.satisfaction}% satisfaction`}
                  />
                </Box>
                <Text fontSize="xs" color="gray.600">
                  {data.day}
                </Text>
              </Box>
            )
          })}
        </Box>
      </Box>

      <Box
        bg="white"
        borderRadius="lg"
        borderWidth={1}
        borderColor="gray.200"
        overflow="hidden"
        mb={3}
      >
        <Box p={3} borderBottomWidth={1} borderColor="gray.200">
          <Text fontSize="sm" color="gray.900" fontWeight="medium">
            Today vs Yesterday
          </Text>
        </Box>
        <Box as="table" w="100%">
          <Box as="thead" bg="gray.50">
            <Box as="tr">
              <Box
                as="th"
                px={3}
                py={2}
                textAlign="left"
                fontSize="xs"
                color="gray.600"
              >
                Metric
              </Box>
              <Box
                as="th"
                px={3}
                py={2}
                textAlign="right"
                fontSize="xs"
                color="gray.600"
              >
                Today
              </Box>
              <Box
                as="th"
                px={3}
                py={2}
                textAlign="right"
                fontSize="xs"
                color="gray.600"
              >
                Yesterday
              </Box>
              <Box
                as="th"
                px={3}
                py={2}
                textAlign="right"
                fontSize="xs"
                color="gray.600"
              >
                Change
              </Box>
            </Box>
          </Box>
          <Box as="tbody">
            {[
              {
                metric: 'Conversations',
                today: performanceData.today.conversations,
                yesterday: performanceData.yesterday.conversations,
                change: '+18%',
                trend: 'up',
              },
              {
                metric: 'Avg Response Time',
                today: performanceData.today.avgResponse,
                yesterday: performanceData.yesterday.avgResponse,
                change: '-12%',
                trend: 'down',
              },
              {
                metric: 'Satisfaction Rate',
                today: `${performanceData.today.satisfaction}%`,
                yesterday: `${performanceData.yesterday.satisfaction}%`,
                change: '+3%',
                trend: 'up',
              },
              {
                metric: 'Resolved Issues',
                today: performanceData.today.resolved,
                yesterday: performanceData.yesterday.resolved,
                change: '+20%',
                trend: 'up',
              },
            ].map((row) => (
              <Box
                key={row.metric}
                as="tr"
                _hover={{ bg: 'gray.50' }}
                borderTopWidth={1}
                borderColor="gray.100"
              >
                <Box as="td" px={3} py={2} fontSize="xs" color="gray.900">
                  {row.metric}
                </Box>
                <Box
                  as="td"
                  px={3}
                  py={2}
                  textAlign="right"
                  fontSize="xs"
                  color="gray.900"
                  fontWeight="medium"
                >
                  {row.today}
                </Box>
                <Box
                  as="td"
                  px={3}
                  py={2}
                  textAlign="right"
                  fontSize="xs"
                  color="gray.600"
                >
                  {row.yesterday}
                </Box>
                <Box as="td" px={3} py={2} textAlign="right">
                  <Text
                    fontSize="xs"
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                    gap={0.5}
                    color={row.trend === 'up' ? 'green.600' : 'blue.600'}
                  >
                    {row.trend === 'up' ? (
                      <ArrowUpRight size={12} />
                    ) : (
                      <ArrowDownRight size={12} />
                    )}
                    {row.change}
                  </Text>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box
        bg="white"
        borderRadius="lg"
        p={4}
        borderWidth={1}
        borderColor="gray.200"
      >
        <Text fontSize="sm" color="gray.900" fontWeight="medium" mb={3}>
          Recent Activity
        </Text>
        <Box>
          {[
            {
              action: 'Handled conversation with customer #1234',
              time: '5 mins ago',
              status: 'success',
            },
            {
              action: 'Knowledge base queried: Product pricing',
              time: '12 mins ago',
              status: 'info',
            },
            {
              action: 'Escalated technical issue to human agent',
              time: '45 mins ago',
              status: 'warning',
            },
            {
              action: 'Successfully resolved billing inquiry',
              time: '1 hour ago',
              status: 'success',
            },
          ].map((activity, idx) => (
            <Flex
              key={idx}
              alignItems="start"
              gap={2}
              p={2}
              bg="gray.50"
              borderRadius="sm"
              borderWidth={1}
              borderColor="gray.100"
              mb={2}
            >
              <Box
                w="8px"
                h="8px"
                borderRadius="full"
                mt={1}
                bg={
                  activity.status === 'success'
                    ? 'green.500'
                    : activity.status === 'warning'
                      ? 'yellow.500'
                      : 'blue.500'
                }
              />
              <Box flex={1}>
                <Text fontSize="xs" color="gray.700">
                  {activity.action}
                </Text>
                <Text fontSize="xs" color="gray.400">
                  {activity.time}
                </Text>
              </Box>
            </Flex>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
