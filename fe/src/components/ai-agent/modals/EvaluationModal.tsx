import { Box, Flex, Text, Button, Textarea } from '@chakra-ui/react'
import { X } from 'lucide-react'
import { useState } from 'react'
import type { TestMessage } from '../types'

interface EvaluationModalProps {
  message: TestMessage
  onClose: () => void
}

export const EvaluationModal = ({ message, onClose }: EvaluationModalProps) => {
  const [editedResponse, setEditedResponse] = useState(message.content)
  const [responses, setResponses] = useState([message.content])

  const handleAddResponse = () => {
    setResponses([...responses, ''])
  }

  const handleSaveEvaluation = () => {
    alert('Evaluation saved! AI akan belajar dari koreksi ini.')
    onClose()
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
      <Box
        bg="white"
        borderRadius="lg"
        boxShadow="xl"
        w="full"
        maxW="512px"
        maxH="90vh"
        display="flex"
        flexDirection="column"
      >
        <Box p={4} borderBottomWidth={1} borderColor="gray.200">
          <Text fontSize="sm" color="gray.900" fontWeight="medium" mb={1}>
            Evaluate AI Response
          </Text>
          <Text fontSize="xs" color="gray.500">
            Koreksi jawaban AI untuk meningkatkan akurasi di kemudian hari
          </Text>
        </Box>

        <Box flex={1} overflow="auto" p={4} display="flex" flexDirection="column" gap={3}>
          <Box>
            <Text fontSize="xs" color="gray.700" mb={1}>
              Context (User Message)
            </Text>
            <Box p={3} bg="gray.50" borderWidth={1} borderColor="gray.200" borderRadius="lg">
              <Text fontSize="xs" color="gray.700">
                User: {message.content}
              </Text>
            </Box>
          </Box>

          <Box>
            <Text fontSize="xs" color="gray.700" mb={1}>
              Original AI Response
              <Box
                as="button"
                ml={2}
                fontSize="xs"
                color="blue.600"
                _hover={{ textDecoration: 'underline' }}
              >
                Revert to original
              </Box>
            </Text>
            <Box p={3} bg="purple.50" borderWidth={1} borderColor="purple.200" borderRadius="lg">
              <Text fontSize="xs" color="gray.700">
                {message.content}
              </Text>
            </Box>
          </Box>

          <Box>
            <Flex alignItems="center" justifyContent="space-between" mb={1}>
              <Text fontSize="xs" color="gray.700">
                Corrected Response(s)
              </Text>
              <Box
                as="button"
                fontSize="xs"
                color="blue.600"
                _hover={{ textDecoration: 'underline' }}
                display="flex"
                alignItems="center"
                gap={1}
                onClick={handleAddResponse}
              >
                + Add response bubble
              </Box>
            </Flex>
            <Box display="flex" flexDirection="column" gap={2}>
              {responses.map((resp, idx) => (
                <Textarea
                  key={idx}
                  value={idx === 0 ? editedResponse : resp}
                  onChange={(e) => {
                    if (idx === 0) {
                      setEditedResponse(e.target.value)
                    } else {
                      const newResponses = [...responses]
                      newResponses[idx] = e.target.value
                      setResponses(newResponses)
                    }
                  }}
                  w="100%"
                  h={24}
                  p={3}
                  fontSize="xs"
                  borderWidth={1}
                  borderColor="gray.200"
                  borderRadius="lg"
                  resize="none"
                  _focus={{ ring: 1, ringColor: 'blue.500' }}
                  placeholder="Type the correct response here..."
                />
              ))}
            </Box>
          </Box>
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
            onClick={handleSaveEvaluation}
          >
            Save Evaluation
          </Button>
        </Flex>
      </Box>
    </Flex>
  )
}

