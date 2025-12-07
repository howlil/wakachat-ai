import { Box, Flex, Text, Badge } from '@chakra-ui/react'
import type { StatCardData } from './types'

interface StatCardProps {
  data: StatCardData
}

export const StatCard = ({ data }: StatCardProps) => {
  const { icon: Icon, label, value, change, trend } = data

  return (
    <Box
      bg="white"
      borderRadius="lg"
      borderWidth={1}
      borderColor="gray.200"
      p={4}
    >
      <Flex alignItems="center" justifyContent="space-between" mb={2}>
        <Box color="gray.500">
          <Icon size={16} />
        </Box>
        <Badge
          h="16px"
          px={1.5}
          fontSize="xs"
          borderWidth={0}
          bg={trend === 'up' ? 'green.100' : 'red.100'}
          color={trend === 'up' ? 'green.700' : 'red.700'}
        >
          {change}
        </Badge>
      </Flex>
      <Text fontSize="xl" color="gray.900" mb={1}>
        {value}
      </Text>
      <Text fontSize="xs" color="gray.600">
        {label}
      </Text>
    </Box>
  )
}
