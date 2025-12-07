import { Box, Flex, Text } from '@chakra-ui/react'
import { UserCheck } from 'lucide-react'

interface TakeoverBannerProps {
  takenOverBy?: string
  takenOverAt?: string
}

export const TakeoverBanner = ({
  takenOverBy,
  takenOverAt,
}: TakeoverBannerProps) => {
  if (!takenOverBy) return null

  return (
    <Box
      px={4}
      py={2}
      bg="blue.50"
      borderBottomWidth={1}
      borderColor="blue.200"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center" gap={2}>
          <UserCheck size={16} color="#2563EB" />
          <Box>
            <Text fontSize="xs" color="blue.900" fontWeight="medium">
              Conversation taken over by {takenOverBy}
            </Text>
            {takenOverAt && (
              <Text fontSize="xs" color="blue.600">
                {takenOverAt}
              </Text>
            )}
          </Box>
        </Flex>
        <Box
          px={2}
          py={1}
          borderRadius="md"
          bg="blue.500"
          color="white"
          fontSize="xs"
          fontWeight="medium"
        >
          AI Stopped
        </Box>
      </Flex>
    </Box>
  )
}
