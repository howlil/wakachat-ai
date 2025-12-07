import { Box, Flex, Text } from '@chakra-ui/react'
import { Inbox as InboxIcon } from 'lucide-react'

interface ConversationTabsProps {
  activeTab: 'unassigned' | 'assigned' | 'resolved'
  onTabChange: (tab: 'unassigned' | 'assigned' | 'resolved') => void
  unassignedCount: number
  assignedCount: number
  resolvedCount: number
}

export const ConversationTabs = ({
  activeTab,
  onTabChange,
  unassignedCount,
  assignedCount,
  resolvedCount,
}: ConversationTabsProps) => {
  return (
    <Flex borderBottomWidth={1} borderColor="gray.200">
      <Box
        as="button"
        flex={1}
        px={3}
        py={2}
        fontSize="xs"
        transition="all 0.2s"
        borderBottomWidth={activeTab === 'unassigned' ? 2 : 0}
        borderBottomColor={activeTab === 'unassigned' ? 'blue.600' : 'transparent'}
        color={activeTab === 'unassigned' ? 'blue.600' : 'gray.600'}
        _hover={{ color: 'gray.900' }}
        onClick={() => onTabChange('unassigned')}
      >
        <Flex alignItems="center" justifyContent="center" gap={1}>
          <Text>Unassigned</Text>
          <Box
            px={1.5}
            py={0.5}
            borderRadius="md"
            bg="orange.100"
            color="orange.700"
            fontSize="xs"
            fontWeight="medium"
          >
            {unassignedCount}
          </Box>
        </Flex>
      </Box>
      <Box
        as="button"
        flex={1}
        px={3}
        py={2}
        fontSize="xs"
        transition="all 0.2s"
        borderBottomWidth={activeTab === 'assigned' ? 2 : 0}
        borderBottomColor={activeTab === 'assigned' ? 'blue.600' : 'transparent'}
        color={activeTab === 'assigned' ? 'blue.600' : 'gray.600'}
        _hover={{ color: 'gray.900' }}
        onClick={() => onTabChange('assigned')}
      >
        <Flex alignItems="center" justifyContent="center" gap={1}>
          <Text>Assigned</Text>
          <Box
            px={1.5}
            py={0.5}
            borderRadius="md"
            bg="blue.100"
            color="blue.700"
            fontSize="xs"
            fontWeight="medium"
          >
            {assignedCount}
          </Box>
        </Flex>
      </Box>
      <Box
        as="button"
        flex={1}
        px={3}
        py={2}
        fontSize="xs"
        transition="all 0.2s"
        borderBottomWidth={activeTab === 'resolved' ? 2 : 0}
        borderBottomColor={activeTab === 'resolved' ? 'blue.600' : 'transparent'}
        color={activeTab === 'resolved' ? 'blue.600' : 'gray.600'}
        _hover={{ color: 'gray.900' }}
        onClick={() => onTabChange('resolved')}
      >
        <Flex alignItems="center" justifyContent="center" gap={1}>
          <Text>Resolved</Text>
          <Box
            px={1.5}
            py={0.5}
            borderRadius="md"
            bg="green.100"
            color="green.700"
            fontSize="xs"
            fontWeight="medium"
          >
            {resolvedCount}
          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}

