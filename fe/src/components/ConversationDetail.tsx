import { Box, Flex, Text, Input, Button } from '@chakra-ui/react'
import {
  Send,
  Smile,
  Paperclip,
  Phone,
  MoreVertical,
  HelpCircle,
} from 'lucide-react'
import { useState } from 'react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai' | 'agent'
  senderName?: string
  timestamp: string
  isRead: boolean
}

interface ConversationDetailProps {
  conversationId?: string
  onBack?: () => void
  onTakeOver?: () => void
  onReturnToAgent?: () => void
  isAdmin?: boolean
  currentAgent?: string
}

export const ConversationDetail = ({
  onBack,
  onTakeOver,
  onReturnToAgent,
  isAdmin = false,
  currentAgent,
}: ConversationDetailProps) => {
  const [message, setMessage] = useState('')

  const messages: Message[] = [
    {
      id: '1',
      text: 'apalah dapat verifikasi dari wa ketika berlangganan?',
      sender: 'user',
      timestamp: '11:41',
      isRead: true,
    },
    {
      id: '2',
      text: 'Iyaa, kak. Saat berlangganan layanan yang melibatkan WhatsApp, biasanya akan ada proses verifikasi dari WhatsApp untuk memastikan akun terhubung dengan baik. Ada yang mau Clara bantu lagi? 😊',
      sender: 'ai',
      senderName: 'AI Response',
      timestamp: '11:41',
      isRead: true,
    },
    {
      id: '3',
      text: 'Halo! Ada yang bisa saya bantu lebih lanjut? 😊',
      sender: 'agent',
      senderName: 'Agent Sarah',
      timestamp: '11:44',
      isRead: true,
    },
  ]

  const handleSend = () => {
    if (!message.trim()) return
    setMessage('')
  }

  const getMessageStyle = (sender: string) => {
    switch (sender) {
      case 'user':
        return {
          bg: 'blue.500',
          color: 'white',
          align: 'flex-end' as const,
          borderRadius: 'lg',
          borderTopRightRadius: 'sm',
        }
      case 'ai':
        return {
          bg: 'purple.500',
          color: 'white',
          align: 'flex-start' as const,
          borderRadius: 'lg',
          borderTopLeftRadius: 'sm',
        }
      case 'agent':
        return {
          bg: 'blue.100',
          color: 'gray.800',
          align: 'flex-start' as const,
          borderRadius: 'lg',
          borderTopLeftRadius: 'sm',
        }
      default:
        return {
          bg: 'gray.200',
          color: 'gray.800',
          align: 'flex-start' as const,
          borderRadius: 'lg',
        }
    }
  }

  return (
    <Flex flexDirection="column" h="100%" bg="white" position="relative">
      <Box p={4} borderBottomWidth={1} borderColor="gray.200" bg="white">
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center" gap={3} flex={1}>
            {onBack && (
              <Button variant="ghost" size="sm" onClick={onBack} p={1}>
                ←
              </Button>
            )}
            <Box>
              <Text fontWeight="bold" fontSize="md">
                Yusuf Arjuna Wibawa
              </Text>
              <Flex alignItems="center" gap={2} mt={1}>
                <Text fontSize="xs" color="gray.600">
                  6287750503114
                </Text>
                {currentAgent && (
                  <>
                    <Text fontSize="xs" color="gray.400">
                      •
                    </Text>
                    <Box
                      px={2}
                      py={0.5}
                      borderRadius="sm"
                      bg="blue.50"
                      color="blue.700"
                      fontSize="xs"
                      fontWeight="medium"
                    >
                      {currentAgent}
                    </Box>
                  </>
                )}
              </Flex>
            </Box>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Button variant="ghost" size="sm" p={2}>
              <Phone size={18} />
            </Button>
            <Button variant="ghost" size="sm" p={2}>
              <MoreVertical size={18} />
            </Button>
          </Flex>
        </Flex>
      </Box>

      <Box flex={1} overflow="auto" p={4} bg="gray.50">
        {messages.map((msg) => {
          const style = getMessageStyle(msg.sender)
          return (
            <Flex key={msg.id} justifyContent={style.align} mb={4}>
              <Box maxW="70%">
                {msg.senderName && (
                  <Text
                    fontSize="xs"
                    color="gray.600"
                    mb={1}
                    ml={msg.sender === 'user' ? 'auto' : 0}
                    mr={msg.sender === 'user' ? 0 : 'auto'}
                    textAlign={msg.sender === 'user' ? 'right' : 'left'}
                  >
                    {msg.senderName}
                  </Text>
                )}
                <Box
                  bg={style.bg}
                  color={style.color}
                  p={3}
                  borderRadius={style.borderRadius}
                  borderTopLeftRadius={style.borderTopLeftRadius}
                  borderTopRightRadius={style.borderTopRightRadius}
                >
                  <Text fontSize="sm">{msg.text}</Text>
                  <Flex
                    justifyContent="flex-end"
                    alignItems="center"
                    gap={1}
                    mt={2}
                  >
                    <Text fontSize="xs" opacity={0.8}>
                      {msg.timestamp}
                    </Text>
                    {msg.isRead && (
                      <Box display="flex" gap={0.5}>
                        <Box
                          w="12px"
                          h="12px"
                          borderRadius="full"
                          bg={msg.sender === 'user' ? 'white' : 'currentColor'}
                          opacity={0.6}
                        />
                        <Box
                          w="12px"
                          h="12px"
                          borderRadius="full"
                          bg={msg.sender === 'user' ? 'white' : 'currentColor'}
                          opacity={0.6}
                        />
                      </Box>
                    )}
                  </Flex>
                </Box>
              </Box>
            </Flex>
          )
        })}
      </Box>

      {currentAgent && (
        <Box
          p={3}
          bg="orange.50"
          borderTopWidth={1}
          borderColor="gray.200"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Flex alignItems="center" gap={2}>
            <Box
              w="16px"
              h="16px"
              borderRadius="full"
              bg="orange.500"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box w="8px" h="8px" borderRadius="full" bg="white" />
            </Box>
            <Text fontSize="sm" color="orange.800" fontWeight="medium">
              Handled by {currentAgent}
            </Text>
          </Flex>
          {isAdmin && (
            <Button
              size="sm"
              bg="orange.500"
              color="white"
              _hover={{ bg: 'orange.600' }}
              onClick={onTakeOver}
            >
              Take Over
            </Button>
          )}
        </Box>
      )}
      {!currentAgent && isAdmin && onReturnToAgent && (
        <Box
          p={3}
          bg="blue.50"
          borderTopWidth={1}
          borderColor="gray.200"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text fontSize="sm" color="blue.800" fontWeight="medium">
            Currently handled by Admin
          </Text>
          <Button
            size="sm"
            bg="blue.500"
            color="white"
            _hover={{ bg: 'blue.600' }}
            onClick={onReturnToAgent}
          >
            Return to Agent
          </Button>
        </Box>
      )}

      <Box p={4} borderTopWidth={1} borderColor="gray.200" bg="white">
        <Flex gap={2} alignItems="flex-end">
          <Box flex={1} position="relative">
            <Input
              placeholder="Reply as Admin..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSend()
                }
              }}
              pr={20}
            />
            <Flex
              position="absolute"
              right={2}
              bottom="50%"
              transform="translateY(50%)"
              gap={1}
            >
              <Box as="button" p={1} _hover={{ opacity: 0.7 }} cursor="pointer">
                <Smile size={18} color="#9CA3AF" />
              </Box>
              <Box as="button" p={1} _hover={{ opacity: 0.7 }} cursor="pointer">
                <Paperclip size={18} color="#9CA3AF" />
              </Box>
            </Flex>
          </Box>
          <Button colorScheme="blue" onClick={handleSend} px={4}>
            <Send size={18} />
          </Button>
        </Flex>
      </Box>

      <Box
        position="absolute"
        bottom={20}
        right={4}
        w="48px"
        h="48px"
        borderRadius="full"
        bg="blue.500"
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        _hover={{ bg: 'blue.600' }}
        boxShadow="lg"
      >
        <HelpCircle size={24} />
      </Box>
    </Flex>
  )
}
