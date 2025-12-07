import { Box, Text } from '@chakra-ui/react'
import { Inbox as InboxIcon } from 'lucide-react'
import { useState } from 'react'
import type { Conversation, FilterStatus } from './types'
import { ConversationTabs } from './components/ConversationTabs'
import { ConversationToolbar } from './components/ConversationToolbar'
import { BatchActions } from './components/BatchActions'
import { ConversationListItem } from './components/ConversationListItem'

interface ConversationListProps {
  conversations: Conversation[]
  selectedId?: string | null
  userRole: 'admin' | 'agent' | 'supervisor' | 'super_agent'
  onSelect: (id: string) => void
  onBatchResolve?: () => void
  onBatchAssign?: () => void
  onBatchLabel?: () => void
  onFilterClick?: () => void
  onStartNewChat?: () => void
}

export const ConversationList = ({
  conversations,
  selectedId,
  userRole,
  onSelect,
  onBatchResolve,
  onBatchAssign,
  onBatchLabel,
  onFilterClick,
  onStartNewChat,
}: ConversationListProps) => {
  const [activeTab, setActiveTab] = useState<FilterStatus>('assigned')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAgent, setSelectedAgent] = useState('all')
  const [showUnrepliedOnly, setShowUnrepliedOnly] = useState(false)
  const [selectedChats, setSelectedChats] = useState<string[]>([])

  const getFilteredConversations = () => {
    let filtered = conversations

    if (activeTab === 'unassigned') {
      filtered = filtered.filter(
        (c) => c.status === 'open' || c.status === 'pending',
      )
    } else if (activeTab === 'assigned') {
      filtered = filtered.filter((c) => c.status === 'assigned')
    } else if (activeTab === 'resolved') {
      filtered = filtered.filter((c) => c.status === 'resolved')
    }

    if (selectedAgent !== 'all') {
      filtered = filtered.filter((c) => c.assignedTo === selectedAgent)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (c) =>
          c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.customerPhone.includes(searchQuery) ||
          c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (showUnrepliedOnly) {
      filtered = filtered.filter((c) => c.unreplied)
    }

    return filtered
  }

  const filteredConversations = getFilteredConversations()

  const unassignedCount = conversations.filter(
    (c) => c.status === 'open' || c.status === 'pending',
  ).length
  const assignedCount = conversations.filter(
    (c) => c.status === 'assigned',
  ).length
  const resolvedCount = conversations.filter(
    (c) => c.status === 'resolved',
  ).length

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedChats(filteredConversations.map((c) => c.id))
    } else {
      setSelectedChats([])
    }
  }

  const handleSelectChat = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedChats([...selectedChats, id])
    } else {
      setSelectedChats(selectedChats.filter((cid) => cid !== id))
    }
  }

  return (
    <Box
      w="320px"
      bg="white"
      borderRightWidth={1}
      borderColor="gray.200"
      display="flex"
      flexDirection="column"
      h="100%"
    >
      <Box borderBottomWidth={1} borderColor="gray.200">
        <Box p={3} borderBottomWidth={1} borderColor="gray.200">
          <Text fontSize="sm" fontWeight="medium" color="gray.900">
            Conversations
          </Text>
        </Box>

        <ConversationTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          unassignedCount={unassignedCount}
          assignedCount={assignedCount}
          resolvedCount={resolvedCount}
        />

        <ConversationToolbar
          userRole={userRole}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedAgent={selectedAgent}
          onAgentChange={setSelectedAgent}
          showUnrepliedOnly={showUnrepliedOnly}
          onToggleUnreplied={() => setShowUnrepliedOnly(!showUnrepliedOnly)}
          onFilterClick={onFilterClick || (() => {})}
          onStartNewChat={onStartNewChat || (() => {})}
          selectedChatsCount={selectedChats.length}
          totalChatsCount={filteredConversations.length}
          onSelectAll={handleSelectAll}
        />

        <BatchActions
          selectedCount={selectedChats.length}
          onBatchResolve={onBatchResolve || (() => {})}
          onBatchAssign={onBatchAssign || (() => {})}
          onBatchLabel={onBatchLabel || (() => {})}
        />
      </Box>

      <Box flex={1} overflow="auto">
        {filteredConversations.length === 0 ? (
          <Box p={8} textAlign="center">
            <InboxIcon
              size={40}
              color="#D1D5DB"
              style={{ margin: '0 auto 8px' }}
            />
            <Text fontSize="xs" color="gray.500">
              No conversations found
            </Text>
          </Box>
        ) : (
          filteredConversations.map((conv) => (
            <ConversationListItem
              key={conv.id}
              conversation={conv}
              isSelected={selectedId === conv.id}
              isChecked={selectedChats.includes(conv.id)}
              onClick={() => onSelect(conv.id)}
              onCheck={(checked) => handleSelectChat(conv.id, checked)}
            />
          ))
        )}
      </Box>
    </Box>
  )
}
