import { Box, Flex, Text } from '@chakra-ui/react'
import { Bot } from 'lucide-react'
import type { Conversation } from '../types'

interface ConversationListItemProps {
  conversation: Conversation
  isSelected: boolean
  isChecked: boolean
  onClick: () => void
  onCheck: (checked: boolean) => void
}

export const ConversationListItem = ({
  conversation,
  isSelected,
  isChecked,
  onClick,
  onCheck,
}: ConversationListItemProps) => {
  const getStatusBadge = () => {
    switch (conversation.status) {
      case 'open':
        return (
          <Box
            px={1.5}
            py={0.5}
            borderRadius="sm"
            bg="green.100"
            color="green.700"
            fontSize="xs"
            fontWeight="medium"
          >
            Open
          </Box>
        )
      case 'pending':
        return (
          <Box
            px={1.5}
            py={0.5}
            borderRadius="sm"
            bg="orange.100"
            color="orange.700"
            fontSize="xs"
            fontWeight="medium"
          >
            Pending
          </Box>
        )
      case 'assigned':
        if (conversation.assignedTo) {
          return (
            <Box
              px={1.5}
              py={0.5}
              borderRadius="sm"
              bg={
                conversation.assignedToRole === 'admin'
                  ? 'blue.100'
                  : 'purple.100'
              }
              color={
                conversation.assignedToRole === 'admin'
                  ? 'blue.700'
                  : 'purple.700'
              }
              fontSize="xs"
              fontWeight="medium"
            >
              {conversation.assignedTo}
            </Box>
          )
        }
        return null
      default:
        return null
    }
  }

  return (
    <Box
      borderBottomWidth={1}
      borderColor="gray.100"
      _hover={{ bg: 'gray.50' }}
      transition="all 0.2s"
      bg={isSelected ? 'blue.50' : 'white'}
      borderLeftWidth={isSelected ? 2 : 0}
      borderLeftColor={isSelected ? 'blue.500' : 'transparent'}
    >
      <Box p={2} display="flex" alignItems="start" gap={2}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => {
            e.stopPropagation()
            onCheck(e.target.checked)
          }}
          style={{
            width: '14px',
            height: '14px',
            marginTop: '4px',
            cursor: 'pointer',
          }}
        />

        <Box as="button" flex={1} textAlign="left" minW={0} onClick={onClick}>
          <Flex alignItems="start" justifyContent="space-between" mb={1}>
            <Flex flex={1} minW={0} alignItems="center" gap={1.5}>
              <Text
                fontSize="xs"
                fontWeight="medium"
                color="gray.900"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                {conversation.customerName}
              </Text>
              {conversation.isAIHandled && (
                <Box
                  w={3.5}
                  h={3.5}
                  bg="purple.500"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <Bot size={8} color="white" />
                </Box>
              )}
              {conversation.isCollaborator && (
                <Box
                  px={1.5}
                  py={0.5}
                  borderRadius="sm"
                  bg="blue.100"
                  color="blue.700"
                  fontSize="xs"
                  fontWeight="medium"
                >
                  Collab
                </Box>
              )}
            </Flex>
            <Flex flexDirection="column" alignItems="end" gap={0.5} ml={2}>
              <Text fontSize="xs" color="gray.400">
                {conversation.timestamp}
              </Text>
              {conversation.unreadCount && (
                <Box
                  px={1.5}
                  py={0.5}
                  borderRadius="sm"
                  bg="blue.500"
                  color="white"
                  fontSize="xs"
                  fontWeight="bold"
                >
                  {conversation.unreadCount}
                </Box>
              )}
            </Flex>
          </Flex>

          <Text
            fontSize="xs"
            color="gray.500"
            mb={1}
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {conversation.lastMessage}
          </Text>

          <Flex alignItems="center" gap={1} flexWrap="wrap">
            {getStatusBadge()}
            {conversation.unreplied && (
              <Box
                px={1.5}
                py={0.5}
                borderRadius="sm"
                bg="red.100"
                color="red.700"
                fontSize="xs"
                fontWeight="medium"
              >
                Unreplied
              </Box>
            )}
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}
