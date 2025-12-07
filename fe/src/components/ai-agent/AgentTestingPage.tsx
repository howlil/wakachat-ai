import { Box, Flex, Text, Button, Input, Textarea, Badge } from '@chakra-ui/react'
import {
  Send,
  Bot,
  Sparkles,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Edit2,
} from 'lucide-react'
import { useState } from 'react'
import type { TestMessage } from './types'
import { EvaluationModal } from './modals/EvaluationModal'

interface AgentTestingPageProps {
  agentName: string
}

export const AgentTestingPage = ({ agentName }: AgentTestingPageProps) => {
  const [messages, setMessages] = useState<TestMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showEvaluation, setShowEvaluation] = useState<number | null>(null)

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: TestMessage = {
      id: Date.now(),
      sender: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }

    setMessages([...messages, userMessage])
    setInput('')
    setIsLoading(true)

    setTimeout(() => {
      const aiMessage: TestMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        content: `Terima kasih atas pertanyaan Anda! Sebagai ${agentName}, saya siap membantu. Ini adalah simulasi jawaban AI berdasarkan knowledge base yang telah diupload.`,
        timestamp: new Date().toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        confidence: 0.87,
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleClearChat = () => {
    setMessages([])
  }

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Box bg="purple.50" borderWidth={1} borderColor="purple.200" borderRadius="lg" p={3}>
        <Flex alignItems="start" gap={3}>
          <Box
            w="40px"
            h="40px"
            bg="purple.100"
            borderRadius="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Sparkles size={20} color="#9333EA" />
          </Box>
          <Box flex={1}>
            <Text fontSize="sm" color="purple.900" fontWeight="medium" mb={1}>
              Test AI Agent
            </Text>
            <Text fontSize="xs" color="purple.700">
              Test {agentName} responses menggunakan knowledge base dan prompts
              yang sudah dikonfigurasi. Evaluasi jawaban AI secara langsung.
            </Text>
          </Box>
          {messages.length > 0 && (
            <Button
              size="sm"
              variant="outline"
              borderColor="purple.300"
              color="purple.700"
              _hover={{ bg: 'purple.100' }}
              h="28px"
              px={3}
              fontSize="xs"
              display="flex"
              alignItems="center"
              gap={1}
              onClick={handleClearChat}
            >
              <RotateCcw size={12} />
              Clear
            </Button>
          )}
        </Flex>
      </Box>

      <Box
        bg="white"
        borderWidth={1}
        borderColor="gray.200"
        borderRadius="lg"
        overflow="hidden"
        display="flex"
        flexDirection="column"
        h="600px"
      >
        <Box flex={1} overflow="auto" p={4} display="flex" flexDirection="column" gap={3} bg="gray.50" minH={0}>
          {messages.length === 0 ? (
            <Box
              h="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box textAlign="center">
                <Bot
                  size={48}
                  color="#D1D5DB"
                  style={{ margin: '0 auto 12px' }}
                />
                <Text fontSize="xs" color="gray.500" mb={1}>
                  Start testing {agentName}
                </Text>
                <Text fontSize="xs" color="gray.400">
                  Type a message below to begin
                </Text>
              </Box>
            </Box>
          ) : (
            <>
              {messages.map((message) => (
                <Flex
                  key={message.id}
                  justifyContent={message.sender === 'user' ? 'flex-start' : 'flex-end'}
                >
                  <Box maxW="xl">
                    <Box
                      borderRadius="lg"
                      p={3}
                      bg={message.sender === 'user' ? 'white' : 'purple.50'}
                      borderWidth={1}
                      borderColor={message.sender === 'user' ? 'gray.200' : 'purple.200'}
                    >
                      {message.sender === 'ai' && (
                        <Flex
                          alignItems="center"
                          justifyContent="space-between"
                          mb={2}
                        >
                          <Flex alignItems="center" gap={1} fontSize="xs" color="purple.600">
                            <Sparkles size={12} />
                            <Text>AI Response</Text>
                          </Flex>
                          {message.confidence && (
                            <Text fontSize="xs" color="purple.600">
                              Confidence: {(message.confidence * 100).toFixed(0)}%
                            </Text>
                          )}
                        </Flex>
                      )}
                      <Text fontSize="xs" color="gray.900">
                        {message.content}
                      </Text>
                    </Box>
                    <Flex
                      alignItems="center"
                      gap={2}
                      mt={1}
                      px={2}
                      justifyContent={message.sender === 'user' ? 'flex-start' : 'flex-end'}
                    >
                      <Text fontSize="xs" color="gray.400">
                        {message.timestamp}
                      </Text>
                      {message.sender === 'ai' && (
                        <Flex alignItems="center" gap={1}>
                          <Box
                            as="button"
                            w={6}
                            h={6}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            _hover={{ bg: 'gray.100' }}
                            borderRadius="md"
                            transition="all 0.2s"
                            title="Good response"
                          >
                            <ThumbsUp size={12} color="#9CA3AF" />
                          </Box>
                          <Box
                            as="button"
                            w={6}
                            h={6}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            _hover={{ bg: 'gray.100' }}
                            borderRadius="md"
                            transition="all 0.2s"
                            title="Bad response"
                          >
                            <ThumbsDown size={12} color="#9CA3AF" />
                          </Box>
                          <Box
                            as="button"
                            w={6}
                            h={6}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            _hover={{ bg: 'gray.100' }}
                            borderRadius="md"
                            transition="all 0.2s"
                            title="Evaluate & improve"
                            onClick={() => setShowEvaluation(message.id)}
                          >
                            <Edit2 size={12} color="#9CA3AF" />
                          </Box>
                        </Flex>
                      )}
                    </Flex>
                  </Box>
                </Flex>
              ))}

              {isLoading && (
                <Flex justifyContent="flex-end">
                  <Box maxW="xl">
                    <Box
                      borderRadius="lg"
                      p={3}
                      bg="purple.50"
                      borderWidth={1}
                      borderColor="purple.200"
                    >
                      <Flex alignItems="center" gap={2} fontSize="xs" color="purple.600">
                        <Sparkles size={12} style={{ animation: 'pulse 1s infinite' }} />
                        <Text>AI sedang mengetik...</Text>
                      </Flex>
                    </Box>
                  </Box>
                </Flex>
              )}
            </>
          )}
        </Box>

        <Box p={3} borderTopWidth={1} borderColor="gray.200" bg="white" flexShrink={0}>
          <Flex gap={2}>
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your test message..."
              flex={1}
              h="36px"
              px={3}
              fontSize="xs"
              borderWidth={1}
              borderColor="gray.200"
              borderRadius="md"
              _focus={{ ring: 1, ringColor: 'blue.500' }}
            />
            <Button
              size="sm"
              bg="blue.500"
              color="white"
              _hover={{ bg: 'blue.600' }}
              h="36px"
              px={4}
              fontSize="xs"
              display="flex"
              alignItems="center"
              gap={1.5}
              disabled={!input.trim() || isLoading}
              opacity={!input.trim() || isLoading ? 0.5 : 1}
              cursor={!input.trim() || isLoading ? 'not-allowed' : 'pointer'}
              onClick={handleSendMessage}
            >
              <Send size={14} />
              Send
            </Button>
          </Flex>
        </Box>
      </Box>

      {showEvaluation && (
        <EvaluationModal
          message={messages.find((m) => m.id === showEvaluation)!}
          onClose={() => setShowEvaluation(null)}
        />
      )}
    </Box>
  )
}

