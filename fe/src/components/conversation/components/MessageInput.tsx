import { Box, Flex, Button, Input, Text } from '@chakra-ui/react'
import { Send, Smile, Paperclip } from 'lucide-react'
import { useState, useRef } from 'react'
import type { QuickReply } from '../types'
import { QuickRepliesDropdown } from './QuickRepliesDropdown'

interface MessageInputProps {
  quickReplies: QuickReply[]
  onSend: (message: string) => void
}

export const MessageInput = ({ quickReplies, onSend }: MessageInputProps) => {
  const [message, setMessage] = useState('')
  const [showQuickReplies, setShowQuickReplies] = useState(false)
  const [quickReplySearch, setQuickReplySearch] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleMessageChange = (value: string) => {
    setMessage(value)

    if (value.startsWith('/')) {
      setShowQuickReplies(true)
      setQuickReplySearch(value.slice(1))
    } else {
      setShowQuickReplies(false)
      setQuickReplySearch('')
    }
  }

  const handleSelectQuickReply = (quickReply: QuickReply) => {
    setMessage(quickReply.content)
    setShowQuickReplies(false)
    setQuickReplySearch('')
    inputRef.current?.focus()
  }

  const handleSend = () => {
    if (message.trim() && !showQuickReplies) {
      onSend(message)
      setMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !showQuickReplies) {
      handleSend()
    }
  }

  return (
    <Box p={3} bg="white" position="relative" flexShrink={0}>
      <Flex gap={2}>
        <Box
          as="button"
          w={9}
          h={9}
          display="flex"
          alignItems="center"
          justifyContent="center"
          _hover={{ bg: 'gray.100' }}
          borderRadius="md"
          transition="all 0.2s"
        >
          <Paperclip size={16} color="#6B7280" />
        </Box>
        <Input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => handleMessageChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message... (/ for quick replies)"
          flex={1}
          h={9}
          px={3}
          fontSize="xs"
          borderWidth={1}
          borderColor="gray.200"
          borderRadius="md"
        />
        <Box
          as="button"
          w={9}
          h={9}
          display="flex"
          alignItems="center"
          justifyContent="center"
          _hover={{ bg: 'gray.100' }}
          borderRadius="md"
          transition="all 0.2s"
        >
          <Smile size={16} color="#6B7280" />
        </Box>
        <Button
          size="sm"
          w={9}
          h={9}
          p={0}
          bg="blue.500"
          color="white"
          _hover={{ bg: 'blue.600' }}
          onClick={handleSend}
        >
          <Send size={16} />
        </Button>
      </Flex>
      <Text fontSize="xs" color="gray.400" mt={1} px={1}>
        Tip: Type{' '}
        <Box
          as="kbd"
          px={1}
          bg="gray.100"
          borderRadius="sm"
          borderWidth={1}
          borderColor="gray.300"
        >
          /
        </Box>{' '}
        to access quick replies
      </Text>

      <QuickRepliesDropdown
        isOpen={showQuickReplies}
        quickReplies={quickReplies}
        searchQuery={quickReplySearch}
        onSelect={handleSelectQuickReply}
      />
    </Box>
  )
}
