import { Box, Flex, Text, Button, Input } from '@chakra-ui/react'
import { User, Info, Search, X } from 'lucide-react'
import { useState } from 'react'
import type { Conversation } from '../types'

interface ChatHeaderProps {
  conversation: Conversation
  showContactInfo: boolean
  onToggleContactInfo: () => void
  onSearchMessage?: (query: string) => void
}

export const ChatHeader = ({
  conversation,
  showContactInfo,
  onToggleContactInfo,
  onSearchMessage,
}: ChatHeaderProps) => {
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  return (
    <Box
      h="56px"
      px={4}
      borderBottomWidth={1}
      borderColor="gray.200"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      bg="white"
    >
      <Flex alignItems="center" gap={3}>
        <Box
          w={9}
          h={9}
          bg="blue.100"
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <User size={20} color="#2563EB" />
        </Box>
        <Box>
          <Text fontSize="sm" fontWeight="medium" color="gray.900">
            {conversation.customerName}
          </Text>
          <Flex alignItems="center" gap={2}>
            <Text fontSize="xs" color="gray.500">
              {conversation.customerPhone}
            </Text>
            <Box
              px={1.5}
              py={0.5}
              borderRadius="sm"
              bg="gray.100"
              color="gray.700"
              fontSize="xs"
              fontWeight="medium"
            >
              {conversation.inbox}
            </Box>
          </Flex>
        </Box>
      </Flex>
      <Flex alignItems="center" gap={2}>
        {showSearch ? (
          <Flex alignItems="center" gap={2} flex={1} maxW="300px">
            <Box position="relative" flex={1}>
              <Search
                size={14}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9CA3AF',
                }}
              />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  onSearchMessage?.(e.target.value)
                }}
                placeholder="Search messages..."
                pl={9}
                pr={8}
                h={8}
                fontSize="xs"
                borderWidth={1}
                borderColor="gray.200"
                borderRadius="md"
                _focus={{ ring: 1, ringColor: 'blue.500' }}
                autoFocus
              />
              {searchQuery && (
                <Box
                  as="button"
                  position="absolute"
                  right="8px"
                  top="50%"
                  transform="translateY(-50%)"
                  onClick={() => {
                    setSearchQuery('')
                    onSearchMessage?.('')
                  }}
                >
                  <X size={12} color="#9CA3AF" />
                </Box>
              )}
            </Box>
            <Button
              size="sm"
              h={8}
              px={2}
              variant="ghost"
              onClick={() => {
                setShowSearch(false)
                setSearchQuery('')
                onSearchMessage?.('')
              }}
            >
              <X size={14} />
            </Button>
          </Flex>
        ) : (
          <>
            <Button
              size="sm"
              h={8}
              px={3}
              variant="outline"
              borderColor="gray.200"
              _hover={{ bg: 'gray.50' }}
              fontSize="xs"
              onClick={() => setShowSearch(true)}
            >
              <Search size={14} />
            </Button>
            <Button
              size="sm"
              h={8}
              px={3}
              variant="outline"
              borderColor="gray.200"
              _hover={{ bg: 'gray.50' }}
              fontSize="xs"
              onClick={onToggleContactInfo}
            >
              <Flex alignItems="center" gap={1}>
                <Info size={14} />
                {showContactInfo ? 'Hide Info' : 'Show Info'}
              </Flex>
            </Button>
          </>
        )}
      </Flex>
    </Box>
  )
}
