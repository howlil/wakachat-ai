import { Box, Flex, Text, Badge, Input, Button } from '@chakra-ui/react'
import { Users, Clock, CheckCircle, AlertCircle, Eye } from 'lucide-react'
import { StatCard } from './StatCard'
import { LineChart } from './charts/LineChart'
import { PieChart } from './charts/PieChart'
import type { StatCardData, SessionListItem } from './types'

const sessionData = [
  { date: 'Mon', firstSession: 32, returningSession: 45 },
  { date: 'Tue', firstSession: 38, returningSession: 52 },
  { date: 'Wed', firstSession: 35, returningSession: 48 },
  { date: 'Thu', firstSession: 42, returningSession: 61 },
  { date: 'Fri', firstSession: 39, returningSession: 55 },
  { date: 'Sat', firstSession: 28, returningSession: 38 },
  { date: 'Sun', firstSession: 30, returningSession: 42 },
]

const conversationSourceData = [
  { name: 'WhatsApp', value: 45 },
  { name: 'Instagram', value: 25 },
  { name: 'Messenger', value: 18 },
  { name: 'Live Chat', value: 12 },
]

const resolutionRateData = [
  { name: 'Resolved by AI', value: 72 },
  { name: 'Resolved by Human', value: 28 },
]

const sessionStatusData = [
  { name: 'Open', value: 24 },
  { name: 'Pending', value: 18 },
  { name: 'Assigned', value: 32 },
  { name: 'Resolved', value: 126 },
]

const statCards: StatCardData[] = [
  {
    icon: Users,
    label: 'Total Sessions',
    value: '341',
    change: '+12.5%',
    trend: 'up',
  },
  {
    icon: Clock,
    label: 'Avg Session Duration',
    value: '18m 45s',
    change: '-5.2%',
    trend: 'down',
  },
  {
    icon: CheckCircle,
    label: 'SLA In',
    value: '87.3%',
    change: '+4.1%',
    trend: 'up',
  },
  {
    icon: AlertCircle,
    label: 'SLA Out',
    value: '12.7%',
    change: '-4.1%',
    trend: 'down',
  },
]

const sessionListData: SessionListItem[] = [
  {
    id: 'S-001',
    customer: 'John Doe',
    platform: 'WhatsApp',
    inbox: 'Main WA',
    phone: '+6281234567890',
    sessionNumber: 3,
    status: 'Resolved',
    agent: 'Agent Sarah',
    createdAt: '2024-12-06 09:15',
    handoffAt: '2024-12-06 09:18',
    resolvedAt: '2024-12-06 09:35',
    aiDuration: '3m 20s',
    agentDuration: '14m 40s',
    slaStatus: 'In',
  },
  {
    id: 'S-002',
    customer: 'Jane Smith',
    platform: 'Instagram',
    inbox: 'IG Support',
    phone: '+6281234567891',
    sessionNumber: 1,
    status: 'Open',
    agent: '-',
    createdAt: '2024-12-06 10:22',
    handoffAt: '-',
    resolvedAt: '-',
    aiDuration: '8m 15s',
    agentDuration: '-',
    slaStatus: 'In',
  },
  {
    id: 'S-003',
    customer: 'Bob Wilson',
    platform: 'WhatsApp',
    inbox: 'Sales WA',
    phone: '+6281234567892',
    sessionNumber: 2,
    status: 'Assigned',
    agent: 'Agent John',
    createdAt: '2024-12-06 10:45',
    handoffAt: '2024-12-06 10:52',
    resolvedAt: '-',
    aiDuration: '7m 10s',
    agentDuration: '12m 30s',
    slaStatus: 'Out',
  },
]

export const SessionAnalytics = () => {
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
            First vs Returning Customer Session
          </Text>
          <LineChart
            data={sessionData}
            dataKey="firstSession"
            xAxisKey="date"
            height={200}
            showLegend
            lines={[
              {
                dataKey: 'firstSession',
                color: '#3B82F6',
                name: 'First Session',
              },
              {
                dataKey: 'returningSession',
                color: '#10B981',
                name: 'Returning Session',
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
        >
          <Text fontSize="xs" color="gray.700" mb={3}>
            Session Source
          </Text>
          <PieChart data={conversationSourceData} height={200} />
        </Box>
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
            Session Resolution Rate
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
            Session Status
          </Text>
          <PieChart data={sessionStatusData} height={200} />
        </Box>
      </Box>

      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={4} mb={4}>
        <Box
          bg="white"
          borderRadius="lg"
          borderWidth={1}
          borderColor="gray.200"
          p={4}
        >
          <Flex alignItems="center" gap={2} mb={2}>
            <Clock size={16} color="#2563EB" />
            <Text fontSize="xs" color="gray.700">
              Avg Session Duration
            </Text>
          </Flex>
          <Text fontSize="xl" color="gray.900">
            18m 45s
          </Text>
          <Text fontSize="xs" color="gray.500" mt={1}>
            From start to resolve
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
            <CheckCircle size={16} color="#10B981" />
            <Text fontSize="xs" color="gray.700">
              SLA In
            </Text>
          </Flex>
          <Text fontSize="xl" color="gray.900">
            87.3%
          </Text>
          <Text fontSize="xs" color="gray.500" mt={1}>
            Resolved within SLA
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
            <AlertCircle size={16} color="#EF4444" />
            <Text fontSize="xs" color="gray.700">
              SLA Out
            </Text>
          </Flex>
          <Text fontSize="xl" color="gray.900">
            12.7%
          </Text>
          <Text fontSize="xs" color="gray.500" mt={1}>
            Exceeded SLA target
          </Text>
        </Box>
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
          Historical MAU (Monthly Active Users)
        </Text>
        <LineChart
          data={sessionData.map((d) => ({
            date: d.date,
            conversations: d.firstSession + d.returningSession,
          }))}
          dataKey="conversations"
          xAxisKey="date"
          color="#8B5CF6"
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
        <Flex alignItems="center" justifyContent="space-between" mb={3}>
          <Text fontSize="xs" color="gray.700">
            Session List
          </Text>
          <Flex alignItems="center" gap={2}>
            <Input
              type="text"
              placeholder="Search sessions..."
              h="28px"
              px={2}
              fontSize="xs"
              borderWidth={1}
              borderColor="gray.200"
              borderRadius="md"
              w="200px"
              _focus={{
                ring: 1,
                ringColor: 'blue.500',
              }}
            />
            <Button
              h="28px"
              px={2}
              fontSize="xs"
              borderWidth={1}
              borderColor="gray.200"
              borderRadius="md"
              _hover={{ bg: 'gray.50' }}
            >
              Export
            </Button>
          </Flex>
        </Flex>
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
                  'Session ID',
                  'Customer',
                  'Platform',
                  'Phone',
                  'Session #',
                  'Status',
                  'Agent',
                  'AI Duration',
                  'Agent Duration',
                  'SLA',
                  'Action',
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
              {sessionListData.map((session) => (
                <Box
                  key={session.id}
                  as="tr"
                  borderBottomWidth={1}
                  borderColor="gray.100"
                  _hover={{ bg: 'gray.50' }}
                >
                  <Box as="td" p={2}>
                    {session.id}
                  </Box>
                  <Box as="td" p={2}>
                    {session.customer}
                  </Box>
                  <Box as="td" p={2}>
                    <Badge
                      h="16px"
                      px={1.5}
                      fontSize="xs"
                      bg="gray.100"
                      color="gray.700"
                      borderWidth={0}
                    >
                      {session.platform}
                    </Badge>
                  </Box>
                  <Box as="td" p={2} color="gray.600">
                    {session.phone}
                  </Box>
                  <Box as="td" p={2}>
                    <Badge
                      h="16px"
                      px={1.5}
                      fontSize="xs"
                      bg="blue.100"
                      color="blue.700"
                      borderWidth={0}
                    >
                      #{session.sessionNumber}
                    </Badge>
                  </Box>
                  <Box as="td" p={2}>
                    <Badge
                      h="16px"
                      px={1.5}
                      fontSize="xs"
                      borderWidth={0}
                      bg={
                        session.status === 'Resolved'
                          ? 'green.100'
                          : session.status === 'Assigned'
                            ? 'blue.100'
                            : session.status === 'Open'
                              ? 'orange.100'
                              : 'gray.100'
                      }
                      color={
                        session.status === 'Resolved'
                          ? 'green.700'
                          : session.status === 'Assigned'
                            ? 'blue.700'
                            : session.status === 'Open'
                              ? 'orange.700'
                              : 'gray.700'
                      }
                    >
                      {session.status}
                    </Badge>
                  </Box>
                  <Box as="td" p={2} color="gray.600">
                    {session.agent}
                  </Box>
                  <Box as="td" p={2} color="gray.600">
                    {session.aiDuration}
                  </Box>
                  <Box as="td" p={2} color="gray.600">
                    {session.agentDuration}
                  </Box>
                  <Box as="td" p={2}>
                    <Badge
                      h="16px"
                      px={1.5}
                      fontSize="xs"
                      borderWidth={0}
                      bg={session.slaStatus === 'In' ? 'green.100' : 'red.100'}
                      color={
                        session.slaStatus === 'In' ? 'green.700' : 'red.700'
                      }
                    >
                      {session.slaStatus}
                    </Badge>
                  </Box>
                  <Box as="td" p={2}>
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
                      View
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
