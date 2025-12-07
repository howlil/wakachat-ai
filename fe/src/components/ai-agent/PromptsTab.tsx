import { Box, Flex, Text, Button, Textarea, Input } from '@chakra-ui/react'
import { Code, AlertCircle, Plus, X } from 'lucide-react'
import { useState } from 'react'

interface PromptsTabProps {
  agentId: number
  agentName: string
}

export const PromptsTab = ({
  agentId: _agentId,
  agentName,
}: PromptsTabProps) => {
  const [agentPrompt, setAgentPrompt] = useState(
    `You are a ${agentName} specialist. Focus on providing excellent support and maintaining high customer satisfaction.\n\nKey responsibilities:\n- Handle customer inquiries professionally\n- Provide accurate information\n- Escalate complex issues when needed`,
  )

  const [restrictions, setRestrictions] = useState([
    'No medical advice',
    'No legal advice',
    'No financial recommendations',
  ])

  const [newRestriction, setNewRestriction] = useState('')

  const handleSavePrompt = () => {
    // TODO: Implement save logic
  }

  const handleAddRestriction = () => {
    if (newRestriction.trim()) {
      setRestrictions([...restrictions, newRestriction])
      setNewRestriction('')
    }
  }

  const handleRemoveRestriction = (index: number) => {
    setRestrictions(restrictions.filter((_, i) => i !== index))
  }

  return (
    <Box>
      <Box
        bg="blue.50"
        borderWidth={1}
        borderColor="blue.200"
        borderRadius="lg"
        p={3}
        mb={3}
      >
        <Flex alignItems="start" gap={3}>
          <Box
            w="40px"
            h="40px"
            bg="blue.100"
            borderRadius="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Code size={20} color="#2563EB" />
          </Box>
          <Box>
            <Text fontSize="sm" color="blue.900" fontWeight="medium" mb={1}>
              Agent-Specific Prompt
            </Text>
            <Text fontSize="xs" color="blue.700">
              This prompt is specific to {agentName} and overrides the global
              prompt.
            </Text>
          </Box>
        </Flex>
      </Box>

      <Box
        bg="white"
        borderWidth={1}
        borderColor="gray.200"
        borderRadius="lg"
        p={3}
        mb={3}
      >
        <Flex alignItems="center" justifyContent="space-between" mb={2}>
          <Text fontSize="sm" color="gray.900" fontWeight="medium">
            System Prompt for {agentName}
          </Text>
          <Text
            fontSize="xs"
            color="gray.500"
            px={2}
            py={1}
            bg="gray.100"
            borderRadius="sm"
          >
            {agentPrompt.length} chars
          </Text>
        </Flex>
        <Textarea
          value={agentPrompt}
          onChange={(e) => setAgentPrompt(e.target.value)}
          w="100%"
          h="256px"
          p={3}
          fontSize="xs"
          borderWidth={1}
          borderColor="gray.200"
          borderRadius="lg"
          resize="none"
          _focus={{ ring: 1, ringColor: 'blue.500' }}
          fontFamily="mono"
          bg="gray.50"
        />
        <Flex justifyContent="flex-end" mt={2}>
          <Button
            size="sm"
            bg="blue.500"
            color="white"
            _hover={{ bg: 'blue.600' }}
            h="32px"
            px={4}
            fontSize="xs"
            onClick={handleSavePrompt}
          >
            Save Prompt
          </Button>
        </Flex>
      </Box>

      <Box
        bg="white"
        borderWidth={1}
        borderColor="gray.200"
        borderRadius="lg"
        p={3}
      >
        <Flex alignItems="center" justifyContent="space-between" mb={2}>
          <Text fontSize="sm" color="gray.900" fontWeight="medium">
            Restriction Rules ({restrictions.length})
          </Text>
        </Flex>

        <Flex gap={2} mb={3}>
          <Input
            type="text"
            value={newRestriction}
            onChange={(e) => setNewRestriction(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddRestriction()
              }
            }}
            placeholder="Add new restriction rule..."
            flex={1}
            h="32px"
            px={3}
            fontSize="xs"
            borderColor="gray.200"
            _focus={{ ring: 1, ringColor: 'blue.500' }}
          />
          <Button
            size="sm"
            bg="blue.500"
            color="white"
            _hover={{ bg: 'blue.600' }}
            h="32px"
            px={3}
            fontSize="xs"
            display="flex"
            alignItems="center"
            gap={1}
            onClick={handleAddRestriction}
          >
            <Plus size={12} />
            Add
          </Button>
        </Flex>

        <Box>
          {restrictions.map((rule, index) => (
            <Flex
              key={index}
              alignItems="center"
              justifyContent="space-between"
              p={2}
              bg="red.50"
              borderWidth={1}
              borderColor="red.200"
              borderRadius="lg"
              mb={2}
            >
              <Flex alignItems="center" gap={2}>
                <AlertCircle size={16} color="#DC2626" />
                <Text fontSize="xs" color="red.900">
                  {rule}
                </Text>
              </Flex>
              <Button
                variant="ghost"
                size="sm"
                w="24px"
                h="24px"
                p={0}
                _hover={{ bg: 'red.100' }}
                onClick={() => handleRemoveRestriction(index)}
              >
                <X size={14} color="#DC2626" />
              </Button>
            </Flex>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
