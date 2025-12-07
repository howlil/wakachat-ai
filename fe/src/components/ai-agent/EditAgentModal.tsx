import { Box, Text, Button, Input, Textarea } from '@chakra-ui/react'
import { X } from 'lucide-react'
import { useState } from 'react'
import type { AIAgent } from './types'

interface EditAgentModalProps {
  agent: AIAgent
  onClose: () => void
  onSave: (agent: AIAgent) => void
}

export const EditAgentModal = ({
  agent,
  onClose,
  onSave,
}: EditAgentModalProps) => {
  const [name, setName] = useState(agent.name)
  const [description, setDescription] = useState(agent.description)

  const handleSave = () => {
    onSave({ ...agent, name, description })
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
      <Box bg="white" borderRadius="lg" boxShadow="xl" w="100%" maxW="384px">
        <Box
          p={4}
          borderBottomWidth={1}
          borderColor="gray.200"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text fontSize="sm" color="gray.900" fontWeight="medium">
            Edit Agent
          </Text>
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
        </Box>
        <Box p={4}>
          <Box mb={3}>
            <Text fontSize="xs" color="gray.700" mb={1} display="block">
              Agent Name
            </Text>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              Description
            </Text>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
        <Box
          p={4}
          borderTopWidth={1}
          borderColor="gray.200"
          display="flex"
          justifyContent="flex-end"
          gap={2}
        >
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
          <Button
            onClick={handleSave}
            size="sm"
            bg="blue.500"
            color="white"
            _hover={{ bg: 'blue.600' }}
            h="32px"
            px={4}
            fontSize="xs"
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
