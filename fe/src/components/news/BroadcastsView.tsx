import { Box, Text, Button } from '@chakra-ui/react'
import { Send } from 'lucide-react'

export const BroadcastsView = () => {
  return (
    <Box p={6}>
      <Box textAlign="center" py={12}>
        <Send
          size={48}
          style={{ color: '#D1D5DB', margin: '0 auto 12px' }}
        />
        <Text fontSize="sm" color="gray.500" mb={3}>
          No broadcasts yet
        </Text>
        <Button
          h="32px"
          px={4}
          bg="blue.500"
          color="white"
          _hover={{ bg: 'blue.600' }}
          fontSize="xs"
        >
          Create First Broadcast
        </Button>
      </Box>
    </Box>
  )
}

