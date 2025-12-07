import { Box, Flex, Text, Input } from '@chakra-ui/react'
import { Filter, Plus, Clock } from 'lucide-react'
import type { UserRole } from '../types'

interface ConversationToolbarProps {
  userRole: UserRole
  searchQuery: string
  onSearchChange: (value: string) => void
  selectedAgent: string
  onAgentChange: (agent: string) => void
  showUnrepliedOnly: boolean
  onToggleUnreplied: () => void
  onFilterClick: () => void
  onStartNewChat: () => void
  selectedChatsCount: number
  totalChatsCount: number
  onSelectAll: (checked: boolean) => void
}

export const ConversationToolbar = ({
  userRole,
  searchQuery,
  onSearchChange,
  selectedAgent,
  onAgentChange,
  showUnrepliedOnly,
  onToggleUnreplied,
  onFilterClick,
  onStartNewChat,
  selectedChatsCount,
  totalChatsCount,
  onSelectAll,
}: ConversationToolbarProps) => {
  return (
    <Box p={2} borderTopWidth={1} borderColor="gray.200">
      <Box mb={2}>
        <Box position="relative">
          <Box
            position="absolute"
            left={2.5}
            top="50%"
            transform="translateY(-50%)"
            zIndex={1}
          >
            <Text fontSize="xs" color="gray.400">
              🔍
            </Text>
          </Box>
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search conversations..."
            pl={8}
            h={8}
            fontSize="xs"
            borderColor="gray.200"
            borderRadius="md"
          />
        </Box>
      </Box>

      <Flex alignItems="center" gap={1.5}>
        {userRole === 'super_agent' && (
          <select
            value={selectedAgent}
            onChange={(e) => onAgentChange(e.target.value)}
            style={{
              height: '28px',
              padding: '0 8px',
              fontSize: '12px',
              borderWidth: '1px',
              borderColor: '#E5E7EB',
              borderRadius: '6px',
              backgroundColor: 'white',
            }}
          >
            <option value="all">All Agents</option>
            <option value="Agent Sarah">Agent Sarah</option>
            <option value="Admin John">Admin John</option>
          </select>
        )}

        <Box
          as="button"
          h={7}
          px={2}
          borderWidth={1}
          borderColor="gray.200"
          borderRadius="md"
          _hover={{ bg: 'gray.50' }}
          fontSize="xs"
          display="flex"
          alignItems="center"
          gap={1}
          onClick={onFilterClick}
        >
          <Filter size={12} />
        </Box>

        <Box
          as="button"
          h={7}
          px={2}
          borderWidth={1}
          borderColor="gray.200"
          borderRadius="md"
          _hover={{ bg: 'gray.50' }}
          fontSize="xs"
          display="flex"
          alignItems="center"
          gap={1}
          onClick={onStartNewChat}
          title="Start New Chat"
        >
          <Plus size={12} />
        </Box>

        <Box
          as="button"
          h={7}
          px={2}
          borderRadius="md"
          fontSize="xs"
          display="flex"
          alignItems="center"
          gap={1}
          borderWidth={1}
          borderColor={showUnrepliedOnly ? 'red.300' : 'gray.200'}
          bg={showUnrepliedOnly ? 'red.100' : 'white'}
          color={showUnrepliedOnly ? 'red.700' : 'gray.600'}
          _hover={{ bg: showUnrepliedOnly ? 'red.100' : 'gray.50' }}
          transition="all 0.2s"
          onClick={onToggleUnreplied}
          title="Unreplied Chat"
        >
          <Clock size={12} />
        </Box>

        <Box ml="auto" display="flex" alignItems="center" gap={1}>
          <input
            type="checkbox"
            checked={
              selectedChatsCount === totalChatsCount && totalChatsCount > 0
            }
            onChange={(e) => onSelectAll(e.target.checked)}
            style={{
              width: '14px',
              height: '14px',
              cursor: 'pointer',
            }}
          />
          <Text fontSize="xs" color="gray.600">
            All
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}
