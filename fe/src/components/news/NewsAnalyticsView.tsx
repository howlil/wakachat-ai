import { Box, Flex, Text } from '@chakra-ui/react'
import { Newspaper, Send, Users, TrendingUp } from 'lucide-react'

export const NewsAnalyticsView = () => {
  return (
    <Box p={6}>
      <Box
        display="grid"
        gridTemplateColumns="repeat(4, 1fr)"
        gap={4}
        mb={6}
      >
        <Box
          bg="white"
          borderRadius="lg"
          borderWidth={1}
          borderColor="gray.200"
          p={4}
        >
          <Flex alignItems="center" gap={2} mb={2}>
            <Newspaper size={16} color="#2563EB" />
            <Text fontSize="xs" color="gray.700">
              Total Articles
            </Text>
          </Flex>
          <Text fontSize="xl" color="gray.900">
            1,245
          </Text>
          <Text fontSize="xs" color="green.600" mt={1}>
            +12.5%
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
            <Send size={16} color="#10B981" />
            <Text fontSize="xs" color="gray.700">
              Broadcasts Sent
            </Text>
          </Flex>
          <Text fontSize="xl" color="gray.900">
            342
          </Text>
          <Text fontSize="xs" color="green.600" mt={1}>
            +8.3%
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
            <Users size={16} color="#9333EA" />
            <Text fontSize="xs" color="gray.700">
              Total Recipients
            </Text>
          </Flex>
          <Text fontSize="xl" color="gray.900">
            45,678
          </Text>
          <Text fontSize="xs" color="green.600" mt={1}>
            +15.2%
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
            <TrendingUp size={16} color="#F97316" />
            <Text fontSize="xs" color="gray.700">
              Avg. Open Rate
            </Text>
          </Flex>
          <Text fontSize="xl" color="gray.900">
            68.4%
          </Text>
          <Text fontSize="xs" color="green.600" mt={1}>
            +3.1%
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

