import { Box, Flex, Text, Textarea, Button, Badge } from '@chakra-ui/react'
import { X, ThumbsUp, ThumbsDown, Edit2, Sparkles } from 'lucide-react'
import { useState } from 'react'
import type { Message } from '../types'

interface EvaluateAIMessageModalProps {
  isOpen: boolean
  onClose: () => void
  message: Message
  onEvaluate: (rating: 'good' | 'bad', feedback?: string, correctedResponse?: string) => void
}

export const EvaluateAIMessageModal = ({
  isOpen,
  onClose,
  message,
  onEvaluate,
}: EvaluateAIMessageModalProps) => {
  const [rating, setRating] = useState<'good' | 'bad' | null>(null)
  const [feedback, setFeedback] = useState('')
  const [correctedResponse, setCorrectedResponse] = useState('')
  const [showCorrection, setShowCorrection] = useState(false)

  if (!isOpen) return null

  const handleSubmit = () => {
    if (rating) {
      onEvaluate(rating, feedback, showCorrection ? correctedResponse : undefined)
      setRating(null)
      setFeedback('')
      setCorrectedResponse('')
      setShowCorrection(false)
      onClose()
    }
  }

  return (
    <Flex
      position="fixed"
      inset={0}
      bg="blackAlpha.500"
      alignItems="center"
      justifyContent="center"
      p={4}
      zIndex={50}
    >
      <Box bg="white" borderRadius="lg" boxShadow="xl" w="full" maxW="2xl">
        <Flex
          p={4}
          borderBottomWidth={1}
          borderColor="gray.200"
          alignItems="center"
          justifyContent="space-between"
        >
          <Flex alignItems="center" gap={2}>
            <Sparkles size={16} color="#9333EA" />
            <Text fontSize="sm" fontWeight="medium" color="gray.900">
              Evaluate AI Response
            </Text>
          </Flex>
          <Box
            as="button"
            w={7}
            h={7}
            display="flex"
            alignItems="center"
            justifyContent="center"
            _hover={{ bg: 'gray.100' }}
            borderRadius="md"
            transition="all 0.2s"
            onClick={onClose}
          >
            <X size={16} color="#9CA3AF" />
          </Box>
        </Flex>

        <Box p={4} display="flex" flexDirection="column" gap={4}>
          <Box>
            <Text fontSize="xs" color="gray.700" mb={1}>
              Original AI Response
            </Text>
            <Box
              p={3}
              bg="purple.50"
              borderWidth={1}
              borderColor="purple.200"
              borderRadius="md"
            >
              <Text fontSize="xs" color="gray.900">
                {message.content}
              </Text>
            </Box>
          </Box>

          <Box>
            <Text fontSize="xs" color="gray.700" mb={2}>
              How was this response?
            </Text>
            <Flex gap={2}>
              <Button
                flex={1}
                h={10}
                borderWidth={2}
                borderColor={rating === 'good' ? 'green.500' : 'gray.200'}
                bg={rating === 'good' ? 'green.50' : 'white'}
                color={rating === 'good' ? 'green.700' : 'gray.700'}
                _hover={{
                  bg: rating === 'good' ? 'green.50' : 'gray.50',
                  borderColor: rating === 'good' ? 'green.500' : 'gray.300',
                }}
                onClick={() => setRating('good')}
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={2}
              >
                <ThumbsUp size={16} />
                <Text fontSize="xs" fontWeight="medium">
                  Good Response
                </Text>
              </Button>
              <Button
                flex={1}
                h={10}
                borderWidth={2}
                borderColor={rating === 'bad' ? 'red.500' : 'gray.200'}
                bg={rating === 'bad' ? 'red.50' : 'white'}
                color={rating === 'bad' ? 'red.700' : 'gray.700'}
                _hover={{
                  bg: rating === 'bad' ? 'red.50' : 'gray.50',
                  borderColor: rating === 'bad' ? 'red.500' : 'gray.300',
                }}
                onClick={() => {
                  setRating('bad')
                  setShowCorrection(true)
                }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={2}
              >
                <ThumbsDown size={16} />
                <Text fontSize="xs" fontWeight="medium">
                  Needs Improvement
                </Text>
              </Button>
            </Flex>
          </Box>

          {rating === 'bad' && (
            <>
              {showCorrection && (
                <Box>
                  <Flex alignItems="center" justifyContent="space-between" mb={1}>
                    <Text fontSize="xs" color="gray.700">
                      Corrected Response (Optional)
                    </Text>
                    <Button
                      size="sm"
                      variant="ghost"
                      fontSize="xs"
                      h={6}
                      px={2}
                      onClick={() => setShowCorrection(false)}
                    >
                      Hide
                    </Button>
                  </Flex>
                  <Textarea
                    value={correctedResponse}
                    onChange={(e) => setCorrectedResponse(e.target.value)}
                    placeholder="Type the corrected response here..."
                    w="100%"
                    h={24}
                    p={3}
                    fontSize="xs"
                    borderWidth={1}
                    borderColor="gray.200"
                    borderRadius="md"
                    resize="none"
                    _focus={{ ring: 1, ringColor: 'blue.500' }}
                  />
                </Box>
              )}
              <Box>
                <Text fontSize="xs" color="gray.700" mb={1}>
                  Feedback (Optional)
                </Text>
                <Textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="What could be improved?"
                  w="100%"
                  h={20}
                  p={3}
                  fontSize="xs"
                  borderWidth={1}
                  borderColor="gray.200"
                  borderRadius="md"
                  resize="none"
                  _focus={{ ring: 1, ringColor: 'blue.500' }}
                />
              </Box>
            </>
          )}
        </Box>

        <Flex
          p={4}
          borderTopWidth={1}
          borderColor="gray.200"
          justifyContent="flex-end"
          gap={2}
        >
          <Button
            h="32px"
            px={4}
            borderWidth={1}
            borderColor="gray.200"
            borderRadius="md"
            _hover={{ bg: 'gray.50' }}
            fontSize="xs"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            h="32px"
            px={4}
            bg="blue.500"
            color="white"
            borderRadius="md"
            _hover={{ bg: 'blue.600' }}
            fontSize="xs"
            onClick={handleSubmit}
            disabled={!rating}
            opacity={!rating ? 0.5 : 1}
            cursor={!rating ? 'not-allowed' : 'pointer'}
          >
            Submit Evaluation
          </Button>
        </Flex>
      </Box>
    </Flex>
  )
}

