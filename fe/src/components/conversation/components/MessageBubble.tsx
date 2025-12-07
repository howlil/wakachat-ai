import { Box, Flex, Text } from '@chakra-ui/react'
import { Shield, Sparkles, Edit2, Check, CheckCheck } from 'lucide-react'
import { useState } from 'react'
import type { Message } from '../types'
import { EvaluateAIMessageModal } from '../modals/EvaluateAIMessageModal'

interface MessageBubbleProps {
  message: Message
  onEvaluate?: (
    rating: 'good' | 'bad',
    feedback?: string,
    correctedResponse?: string,
  ) => void
}

export const MessageBubble = ({ message, onEvaluate }: MessageBubbleProps) => {
  const [showEvaluateModal, setShowEvaluateModal] = useState(false)
  const isCustomer = message.sender === 'customer'

  const getMessageStyle = () => {
    switch (message.sender) {
      case 'customer':
        return {
          bg: 'gray.100',
          borderColor: 'gray.200',
          align: 'flex-start' as const,
        }
      case 'ai':
        return {
          bg: 'purple.50',
          borderColor: 'purple.200',
          align: 'flex-end' as const,
        }
      case 'admin':
        return {
          bg: 'orange.50',
          borderColor: 'orange.200',
          align: 'flex-end' as const,
        }
      case 'agent':
        return {
          bg: 'blue.50',
          borderColor: 'blue.200',
          align: 'flex-end' as const,
        }
      default:
        return {
          bg: 'gray.50',
          borderColor: 'gray.200',
          align: 'flex-end' as const,
        }
    }
  }

  const style = getMessageStyle()

  return (
    <Flex justifyContent={isCustomer ? 'flex-start' : 'flex-end'} mb={3}>
      <Box maxW="70%" minW="120px">
        {(message.sender === 'agent' || message.sender === 'admin') &&
          message.senderName && (
            <Flex
              alignItems="center"
              gap={1.5}
              mb={1}
              fontSize="xs"
              color="blue.600"
              justifyContent={style.align}
            >
              <Shield size={12} />
              <Text fontWeight="medium">{message.senderName}</Text>
            </Flex>
          )}
        {message.sender === 'ai' && (
          <Flex
            alignItems="center"
            gap={1.5}
            mb={1}
            fontSize="xs"
            color="purple.600"
            justifyContent={style.align}
          >
            <Sparkles size={12} />
            <Text fontWeight="medium">AI Assistant</Text>
            {onEvaluate && (
              <Box
                as="button"
                w={4}
                h={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
                _hover={{ bg: 'purple.100', borderRadius: 'sm' }}
                transition="all 0.2s"
                onClick={() => setShowEvaluateModal(true)}
                title="Evaluate this response"
              >
                <Edit2 size={10} color="#9333EA" />
              </Box>
            )}
          </Flex>
        )}
        <Box
          bg={style.bg}
          borderWidth={1}
          borderColor={style.borderColor}
          borderRadius="lg"
          p={3}
          _hover={{
            borderColor:
              style.borderColor === 'gray.200' ? 'gray.300' : style.borderColor,
            boxShadow: 'sm',
          }}
          transition="all 0.2s"
        >
          <Text fontSize="xs" color="gray.900" lineHeight="1.5">
            {message.content}
          </Text>
        </Box>
        <Flex
          alignItems="center"
          gap={2}
          mt={1}
          px={2}
          justifyContent={style.align}
        >
          <Text fontSize="xs" color="gray.400">
            {message.timestamp}
          </Text>
          {message.status && message.sender !== 'customer' && (
            <Flex alignItems="center" gap={1}>
              {message.status === 'read' ? (
                <CheckCheck size={12} color="#2563EB" />
              ) : message.status === 'delivered' ? (
                <CheckCheck size={12} color="#9CA3AF" />
              ) : (
                <Check size={12} color="#9CA3AF" />
              )}
              <Text fontSize="xs" color="gray.400" textTransform="capitalize">
                {message.status}
              </Text>
            </Flex>
          )}
        </Flex>
      </Box>

      {onEvaluate && (
        <EvaluateAIMessageModal
          isOpen={showEvaluateModal}
          onClose={() => setShowEvaluateModal(false)}
          message={message}
          onEvaluate={onEvaluate}
        />
      )}
    </Flex>
  )
}
