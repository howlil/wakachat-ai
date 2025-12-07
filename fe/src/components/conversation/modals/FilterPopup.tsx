import { Box, Flex, Text, Button, Input } from '@chakra-ui/react'
import { X } from 'lucide-react'

interface FilterPopupProps {
  isOpen: boolean
  onClose: () => void
}

export const FilterPopup = ({ isOpen, onClose }: FilterPopupProps) => {
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
              Filter Conversations
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

        <Box
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          maxH="96"
          overflow="auto"
        >
          <Box>
            <Text fontSize="xs" color="gray.700" mb={1}>
              Date Range
            </Text>
            <Flex gap={2}>
              <Input
                type="date"
                h={8}
                px={3}
                fontSize="xs"
                borderWidth={1}
                borderColor="gray.200"
                borderRadius="md"
              />
              <Input
                type="date"
                h={8}
                px={3}
                fontSize="xs"
                borderWidth={1}
                borderColor="gray.200"
                borderRadius="md"
              />
            </Flex>
          </Box>

          <Box>
            <Text fontSize="xs" color="gray.700" mb={1}>
              Inbox
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
              <option>All Inboxes</option>
              <option>Main WhatsApp</option>
              <option>Sales WhatsApp</option>
              <option>Support WhatsApp</option>
            </Box>
          </Box>

          <Box>
            <Text fontSize="xs" color="gray.700" mb={1}>
              Label
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
              <option>All Labels</option>
              <option>VIP</option>
              <option>Hot Lead</option>
              <option>Urgent</option>
            </Box>
          </Box>

          <Box>
            <Text fontSize="xs" color="gray.700" mb={1}>
              Resolve By
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
              <option>All Agents</option>
              <option>Agent Sarah</option>
              <option>Admin John</option>
            </Box>
          </Box>

          <Box>
            <Text fontSize="xs" color="gray.700" mb={1}>
              Agent
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
              <option>All Agents</option>
              <option>Agent Sarah</option>
              <option>Admin John</option>
            </Box>
          </Box>

          <Box>
            <Text fontSize="xs" color="gray.700" mb={1}>
              AI Agent
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
              <option>All AI Agents</option>
              <option>Sales Bot</option>
              <option>Support Bot</option>
            </Box>
          </Box>

          <Box>
            <Text fontSize="xs" color="gray.700" mb={1}>
              Status
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
              <option>All Status</option>
              <option>Open</option>
              <option>Pending</option>
              <option>Resolved</option>
            </Box>
          </Box>

          <Box>
            <Text fontSize="xs" color="gray.700" mb={1}>
              Pipeline Status
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
              <option>All Pipeline Status</option>
              <option>New Lead</option>
              <option>Qualified</option>
              <option>Negotiation</option>
              <option>Won</option>
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
              Apply Filters
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}
