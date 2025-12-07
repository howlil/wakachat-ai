import { Box, Flex, Text, Button, Input } from '@chakra-ui/react'
import { X, AlertCircle } from 'lucide-react'

interface StartNewChatModalProps {
  isOpen: boolean
  onClose: () => void
}

export const StartNewChatModal = ({
  isOpen,
  onClose,
}: StartNewChatModalProps) => {
  if (!isOpen) return null

  return (
    <Box
      position="fixed"
      inset={0}
      bg="blackAlpha.500"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
      zIndex={50}
    >
      <Box bg="white" borderRadius="lg" boxShadow="xl" w="100%" maxW="md">
        <Box p={4} borderBottomWidth={1} borderColor="gray.200">
          <Flex alignItems="center" justifyContent="space-between">
            <Text fontSize="sm" fontWeight="medium" color="gray.900">
              Start New Chat
            </Text>
            <Box
              as="button"
              w={7}
              h={7}
              display="flex"
              alignItems="center"
              justifyContent="center"
              _hover={{ bg: 'gray.100' }}
              borderRadius="md"
              transition="all 0.2s"
              onClick={onClose}
            >
              <X size={16} color="#9CA3AF" />
            </Box>
          </Flex>
        </Box>

        <Box p={4} display="flex" flexDirection="column" gap={3}>
          <Box bg="blue.50" borderWidth={1} borderColor="blue.200" borderRadius="lg" p={3}>
            <Flex alignItems="start" gap={2}>
              <AlertCircle size={16} color="#2563EB" style={{ marginTop: '2px' }} />
              <Text fontSize="xs" color="blue.700">
                You must use a Meta-approved template message to start a
                conversation.
              </Text>
            </Flex>
          </Box>

          <Box>
            <Text fontSize="xs" color="gray.700" mb={1}>
              Customer Phone Number
            </Text>
            <Input
              type="tel"
              placeholder="+62812345678"
              w="100%"
              h={8}
              px={3}
              fontSize="xs"
              borderWidth={1}
              borderColor="gray.200"
              borderRadius="md"
            />
          </Box>

          <Box>
            <Text fontSize="xs" color="gray.700" mb={1}>
              Select Template
            </Text>
            <Box
              as="select"
              w="100%"
              h={8}
              px={3}
              fontSize="xs"
              borderWidth={1}
              borderColor="gray.200"
              borderRadius="md"
            >
              <option>Welcome Message</option>
              <option>Order Confirmation</option>
              <option>Appointment Reminder</option>
              <option>Payment Request</option>
            </Box>
          </Box>

          <Box>
            <Text fontSize="xs" color="gray.700" mb={1}>
              Preview
            </Text>
            <Box
              p={3}
              bg="gray.50"
              borderWidth={1}
              borderColor="gray.200"
              borderRadius="md"
              fontSize="xs"
              color="gray.700"
            >
              Hello! Welcome to our service. How can we help you today?
            </Box>
          </Box>
        </Box>

        <Box p={4} borderTopWidth={1} borderColor="gray.200">
          <Flex justifyContent="flex-end" gap={2}>
            <Button
              size="sm"
              h={8}
              px={4}
              variant="outline"
              borderColor="gray.200"
              _hover={{ bg: 'gray.50' }}
              fontSize="xs"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              h={8}
              px={4}
              bg="blue.500"
              color="white"
              _hover={{ bg: 'blue.600' }}
              fontSize="xs"
            >
              Send Message
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}

