import { Box, Flex, Text, Input } from '@chakra-ui/react'
import {
  Search,
  Filter,
  Plus,
  List,
  Clock,
  ChevronDown,
  Camera,
} from 'lucide-react'
import { useState } from 'react'

interface Conversation {
  id: string
  username: string
  message: string
  agent: string
  agentTag?: string
  timestamp: string
  status: 'assigned' | 'transferred' | 'pending' | 'unassigned'
  unreadCount?: number
  hasCamera?: boolean
  aiSummary?: string
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    username: 'Yusuf Arjuna Wibawa',
    message: 'AI Summary',
    agent: 'Agent Sarah',
    agentTag: 'Agent Sarah',
    timestamp: '11:42',
    status: 'assigned',
    hasCamera: true,
  },
  {
    id: '2',
    username: 'Dila',
    message: 'Hi mau connected pla...',
    agent: 'Admin John',
    agentTag: 'Admin John',
    timestamp: '11:42',
    status: 'assigned',
  },
  {
    id: '3',
    username: 'Pak Heri',
    message: 'Mau tanya ngalamin lagi...',
    agent: 'Unassigned',
    timestamp: '11:37',
    status: 'unassigned',
    unreadCount: 2,
  },
  {
    id: '4',
    username: 'Nisaaa1111',
    message: 'Indah G. assigned this c...',
    agent: 'Cekat AI Dev',
    agentTag: 'Cekat AI Dev',
    timestamp: '11:02',
    status: 'assigned',
    unreadCount: 5,
  },
  {
    id: '5',
    username: 'hamzzz',
    message: 'hai',
    agent: 'Cekat AI Dev',
    agentTag: 'Cekat AI Dev',
    timestamp: '01:21',
    status: 'assigned',
    unreadCount: 1,
  },
  {
    id: '6',
    username: 'bujang ani',
    message: 'Voice Call: No Answer',
    agent: 'Cekat AI Dev',
    agentTag: 'Cekat AI Dev',
    timestamp: 'Yesterday 20:52',
    status: 'transferred',
  },
]

interface ConversationListProps {
  onSelect?: (id: string) => void
  selectedId?: string | null
}

export const ConversationList = ({
  onSelect,
  selectedId,
}: ConversationListProps) => {
  const [activeTab, setActiveTab] = useState<'all' | 'assigned' | 'unassigned'>(
    'all',
  )
  const [searchQuery, setSearchQuery] = useState('')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned':
        return 'blue'
      case 'transferred':
        return 'orange'
      case 'pending':
        return 'red'
      default:
        return 'gray'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'assigned':
        return 'Assigned'
      case 'transferred':
        return 'Transferred'
      case 'pending':
        return 'Pending'
      default:
        return status
    }
  }

  const filteredConversations = mockConversations.filter((conv) => {
    if (activeTab === 'all') return true
    if (activeTab === 'assigned') {
      return conv.status === 'assigned' || conv.status === 'transferred'
    }
    return conv.status === 'unassigned' || conv.status === 'pending'
  })

  return (
    <Box
      w="400px"
      bg="white"
      borderRightWidth={1}
      borderColor="gray.200"
      display="flex"
      flexDirection="column"
      h="100%"
    >
      <Box p={4} borderBottomWidth={1} borderColor="gray.200">
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          Inbox
        </Text>

        <Flex gap={2} mb={4}>
          <Box
            as="button"
            onClick={() => setActiveTab('all')}
            px={3}
            py={1.5}
            borderRadius="md"
            fontSize="sm"
            fontWeight="medium"
            bg={activeTab === 'all' ? 'blue.50' : 'transparent'}
            color={activeTab === 'all' ? 'blue.600' : 'gray.600'}
            _hover={{ bg: 'gray.50' }}
          >
            All
          </Box>
          <Box
            as="button"
            onClick={() => setActiveTab('assigned')}
            px={3}
            py={1.5}
            borderRadius="md"
            fontSize="sm"
            fontWeight="medium"
            bg={activeTab === 'assigned' ? 'blue.50' : 'transparent'}
            color={activeTab === 'assigned' ? 'blue.600' : 'gray.600'}
            _hover={{ bg: 'gray.50' }}
          >
            Assigned
          </Box>
          <Box
            as="button"
            onClick={() => setActiveTab('unassigned')}
            px={3}
            py={1.5}
            borderRadius="md"
            fontSize="sm"
            fontWeight="medium"
            bg={activeTab === 'unassigned' ? 'blue.50' : 'transparent'}
            color={activeTab === 'unassigned' ? 'blue.600' : 'gray.600'}
            _hover={{ bg: 'gray.50' }}
          >
            Unassigned
          </Box>
        </Flex>

        <Box position="relative" mb={4}>
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9CA3AF',
            }}
          />
          <Input
            placeholder="Search conversations..."
            pl={10}
            size="sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>

        <Flex alignItems="center" gap={2}>
          <Box
            as="button"
            display="flex"
            alignItems="center"
            gap={2}
            px={3}
            py={2}
            borderRadius="md"
            borderWidth={1}
            borderColor="gray.300"
            fontSize="sm"
            _hover={{ bg: 'gray.50' }}
          >
            <Text>All Agents</Text>
            <ChevronDown size={16} />
          </Box>
          <Box
            as="button"
            p={2}
            borderRadius="md"
            _hover={{ bg: 'gray.50' }}
            title="Filter"
          >
            <Filter size={18} />
          </Box>
          <Box
            as="button"
            p={2}
            borderRadius="md"
            _hover={{ bg: 'gray.50' }}
            title="Add New"
          >
            <Plus size={18} />
          </Box>
          <Box
            as="button"
            p={2}
            borderRadius="md"
            _hover={{ bg: 'gray.50' }}
            title="List View"
          >
            <List size={18} />
          </Box>
          <Box
            as="button"
            p={2}
            borderRadius="md"
            _hover={{ bg: 'gray.50' }}
            title="Clock"
          >
            <Clock size={18} />
          </Box>
        </Flex>
      </Box>

      <Box flex={1} overflow="auto">
        {filteredConversations.map((conv) => {
          const isSelected = selectedId === conv.id
          return (
            <Box
              key={conv.id}
              as="button"
              w="100%"
              p={4}
              borderBottomWidth={1}
              borderColor="gray.100"
              textAlign="left"
              bg={isSelected ? 'blue.50' : 'white'}
              _hover={{ bg: isSelected ? 'blue.50' : 'gray.50' }}
              cursor="pointer"
              onClick={() => onSelect?.(conv.id)}
              borderLeftWidth={isSelected ? 3 : 0}
              borderLeftColor={isSelected ? 'blue.500' : 'transparent'}
            >
              <Flex justifyContent="space-between" alignItems="start" mb={2}>
                <Flex alignItems="center" gap={2} flex={1}>
                  {conv.hasCamera && (
                    <Box
                      w="16px"
                      h="16px"
                      borderRadius="sm"
                      bg="purple.500"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Camera size={10} color="white" />
                    </Box>
                  )}
                  <Text fontSize="sm" fontWeight="medium" flex={1}>
                    {conv.username}
                  </Text>
                </Flex>
                <Text fontSize="xs" color="gray.500">
                  {conv.timestamp}
                </Text>
              </Flex>

              <Text
                fontSize="sm"
                color="gray.600"
                mb={2}
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                {conv.message}
              </Text>

              <Flex alignItems="center" gap={2} justifyContent="space-between">
                {conv.agentTag && (
                  <Box
                    px={2}
                    py={0.5}
                    borderRadius="sm"
                    bg="blue.50"
                    color="blue.700"
                    fontSize="xs"
                    fontWeight="medium"
                  >
                    {conv.agentTag}
                  </Box>
                )}
                {!conv.agentTag && (
                  <Text fontSize="xs" color="gray.600">
                    {conv.agent}
                  </Text>
                )}

                <Flex alignItems="center" gap={2}>
                  {conv.unreadCount && (
                    <Box
                      w="20px"
                      h="20px"
                      borderRadius="full"
                      bg="blue.500"
                      color="white"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="xs"
                      fontWeight="bold"
                    >
                      {conv.unreadCount}
                    </Box>
                  )}
                  <Box
                    px={2}
                    py={1}
                    borderRadius="sm"
                    bg={`${getStatusColor(conv.status)}.50`}
                    color={`${getStatusColor(conv.status)}.700`}
                    fontSize="xs"
                    fontWeight="medium"
                  >
                    {getStatusLabel(conv.status)}
                  </Box>
                </Flex>
              </Flex>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
