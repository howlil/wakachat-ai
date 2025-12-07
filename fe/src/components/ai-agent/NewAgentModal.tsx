import { Box, Flex, Text, Button, Input, Textarea } from '@chakra-ui/react'
import { Upload, X } from 'lucide-react'
import { useState } from 'react'
import type { AIAgent } from './types'

interface NewAgentModalProps {
  onClose: () => void
  onSave: (agent: AIAgent) => void
}

export const NewAgentModal = ({ onClose, onSave }: NewAgentModalProps) => {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [prompt, setPrompt] = useState('')

  const handleCreate = () => {
    const newAgent: AIAgent = {
      id: Date.now(),
      name,
      description,
      status: 'active',
      conversations: 0,
      avgResponseTime: '0s',
      satisfactionRate: 0,
      knowledgeBaseSize: 0,
    }
    onSave(newAgent)
  }

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="blackAlpha.500"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
      zIndex={50}
    >
      <Box bg="white" borderRadius="lg" boxShadow="xl" w="100%" maxW="512px">
        <Box p={4} borderBottomWidth={1} borderColor="gray.200">
          <Flex alignItems="center" justifyContent="space-between">
            <Box>
              <Text fontSize="sm" color="gray.900" fontWeight="medium">
                New AI Agent
              </Text>
              <Text fontSize="xs" color="gray.500">
                Step {step} of 3
              </Text>
            </Box>
            <Button
              variant="ghost"
              size="sm"
              w="28px"
              h="28px"
              p={0}
              onClick={onClose}
            >
              <X size={16} color="#9CA3AF" />
            </Button>
          </Flex>
        </Box>

        <Box p={4}>
          <Flex gap={1} mb={4}>
            {[1, 2, 3].map((s) => (
              <Box
                key={s}
                h="4px"
                flex={1}
                borderRadius="full"
                bg={s <= step ? 'blue.500' : 'gray.200'}
              />
            ))}
          </Flex>

          {step === 1 && (
            <Box>
              <Box mb={3}>
                <Text fontSize="xs" color="gray.700" mb={1} display="block">
                  Agent Name *
                </Text>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Customer Support Agent"
                  w="100%"
                  h="32px"
                  px={3}
                  fontSize="xs"
                  borderColor="gray.200"
                  _focus={{ ring: 1, ringColor: 'blue.500' }}
                />
              </Box>
              <Box>
                <Text fontSize="xs" color="gray.700" mb={1} display="block">
                  Description *
                </Text>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the agent's purpose..."
                  w="100%"
                  h="80px"
                  p={2}
                  fontSize="xs"
                  borderColor="gray.200"
                  resize="none"
                  _focus={{ ring: 1, ringColor: 'blue.500' }}
                />
              </Box>
            </Box>
          )}

          {step === 2 && (
            <Box>
              <Box
                bg="purple.50"
                borderWidth={1}
                borderColor="purple.200"
                borderRadius="lg"
                p={3}
                mb={3}
              >
                <Text
                  fontSize="sm"
                  color="purple.900"
                  fontWeight="medium"
                  mb={1}
                >
                  Knowledge Base (Optional)
                </Text>
                <Text fontSize="xs" color="purple.700">
                  Upload documents specific to this agent, or skip to add later.
                </Text>
              </Box>
              <Box
                borderWidth={2}
                borderStyle="dashed"
                borderColor="gray.300"
                borderRadius="lg"
                p={8}
                textAlign="center"
                _hover={{ borderColor: 'blue.300', bg: 'blue.50' }}
                transition="all 0.2s"
                cursor="pointer"
              >
                <Upload
                  size={40}
                  color="#9CA3AF"
                  style={{ margin: '0 auto 8px' }}
                />
                <Text fontSize="xs" color="gray.600" mb={1}>
                  Drag and drop files here
                </Text>
                <Text fontSize="xs" color="gray.400">
                  or click to browse
                </Text>
              </Box>
            </Box>
          )}

          {step === 3 && (
            <Box>
              <Box
                bg="blue.50"
                borderWidth={1}
                borderColor="blue.200"
                borderRadius="lg"
                p={3}
                mb={3}
              >
                <Text fontSize="sm" color="blue.900" fontWeight="medium" mb={1}>
                  System Prompt (Optional)
                </Text>
                <Text fontSize="xs" color="blue.700">
                  Define how this agent should behave, or use global prompt.
                </Text>
              </Box>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={`You are a ${name || 'professional'} AI assistant...`}
                w="100%"
                h="192px"
                p={3}
                fontSize="xs"
                borderColor="gray.200"
                borderRadius="lg"
                resize="none"
                _focus={{ ring: 1, ringColor: 'blue.500' }}
                fontFamily="mono"
                bg="gray.50"
              />
            </Box>
          )}
        </Box>

        <Box
          p={4}
          borderTopWidth={1}
          borderColor="gray.200"
          display="flex"
          justifyContent="space-between"
        >
          <Button
            onClick={() => setStep(Math.max(1, step - 1))}
            size="sm"
            variant="outline"
            h="32px"
            px={4}
            fontSize="xs"
            disabled={step === 1}
          >
            Back
          </Button>
          <Flex gap={2}>
            <Button
              onClick={onClose}
              size="sm"
              variant="outline"
              h="32px"
              px={4}
              fontSize="xs"
            >
              Cancel
            </Button>
            {step < 3 ? (
              <Button
                onClick={() => setStep(step + 1)}
                size="sm"
                bg="blue.500"
                color="white"
                _hover={{ bg: 'blue.600' }}
                h="32px"
                px={4}
                fontSize="xs"
                disabled={step === 1 && (!name || !description)}
              >
                Continue
              </Button>
            ) : (
              <Button
                onClick={handleCreate}
                size="sm"
                bg="blue.500"
                color="white"
                _hover={{ bg: 'blue.600' }}
                h="32px"
                px={4}
                fontSize="xs"
                disabled={!name || !description}
              >
                Create Agent
              </Button>
            )}
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}
