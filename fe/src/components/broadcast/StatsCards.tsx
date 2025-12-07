import { Box, Text, Flex } from '@chakra-ui/react'
import { Send, CheckCheck, Eye, TrendingUp } from 'lucide-react'

export const StatsCards = () => {
  const stats = [
    {
      label: 'Total Sent',
      value: '5,106',
      icon: Send,
      color: 'blue',
      change: '+12%',
    },
    {
      label: 'Delivery Rate',
      value: '97.2%',
      icon: CheckCheck,
      color: 'green',
      change: '+12%',
    },
    {
      label: 'Read Rate',
      value: '62.4%',
      icon: Eye,
      color: 'purple',
      change: '+8%',
    },
    {
      label: 'Response Rate',
      value: '8.2%',
      icon: TrendingUp,
      color: 'orange',
      change: '+15%',
    },
  ]

  return (
    <Flex gap={3}>
      {stats.map((stat) => {
        const Icon = stat.icon
        const colorMap: Record<string, string> = {
          blue: '#2563EB',
          green: '#10B981',
          purple: '#9333EA',
          orange: '#F59E0B',
        }
        return (
          <Box
            key={stat.label}
            bg="white"
            borderRadius="lg"
            p={3}
            borderWidth={1}
            borderColor="gray.200"
            flex={1}
          >
            <Flex alignItems="center" justifyContent="space-between" mb={2}>
              <Icon size={16} style={{ color: colorMap[stat.color] }} />
              <Text fontSize="xs" color="green.600">
                {stat.change}
              </Text>
            </Flex>
            <Text fontSize="lg" color="gray.900" mb={0.5}>
              {stat.value}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {stat.label}
            </Text>
          </Box>
        )
      })}
    </Flex>
  )
}
