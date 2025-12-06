import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Textarea,
  Badge,
} from '@chakra-ui/react'
import { useState } from 'react'
import { X, Plus } from 'lucide-react'

interface Variable {
  id: string
  name: string
  value: string
}

interface BroadcastTemplateFormProps {
  onSave: (template: any) => void
  onCancel: () => void
}

export const BroadcastTemplateForm = ({
  onSave,
  onCancel,
}: BroadcastTemplateFormProps) => {
  const [name, setName] = useState('')
  const [type, setType] = useState<'utility' | 'marketing'>('utility')
  const [contentType, setContentType] = useState<'text' | 'button' | 'image'>(
    'text',
  )
  const [message, setMessage] = useState('')
  const [variables, setVariables] = useState<Variable[]>([])
  const [newVariable, setNewVariable] = useState('')

  const handleAddVariable = () => {
    if (!newVariable.trim()) return
    const varId = `{{${newVariable}}}`
    setVariables([...variables, { id: varId, name: newVariable, value: '' }])
    setNewVariable('')
  }

  const handleRemoveVariable = (id: string) => {
    setVariables(variables.filter((v) => v.id !== id))
  }

  const handleSave = () => {
    onSave({
      name,
      type,
      contentType,
      message,
      variables,
    })
  }

  return (
    <Box p={6} bg="white" borderRadius="lg" maxW="800px" mx="auto">
      <Text fontSize="xl" fontWeight="bold" mb={6}>
        Create Broadcast Template
      </Text>

      <Box mb={4}>
        <Text mb={2} fontSize="sm" fontWeight="medium">
          Template Name
        </Text>
        <Input
          placeholder="Enter template name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Box>

      <Box mb={4}>
        <Text mb={2} fontSize="sm" fontWeight="medium">
          Template Type
        </Text>
        <select
          style={{
            width: '100%',
            padding: '8px',
            borderWidth: '1px',
            borderColor: '#D1D5DB',
            borderRadius: '6px',
          }}
          value={type}
          onChange={(e) => setType(e.target.value as any)}
        >
          <option value="utility">Utility</option>
          <option value="marketing">Marketing</option>
        </select>
      </Box>

      <Box mb={4}>
        <Text mb={2} fontSize="sm" fontWeight="medium">
          Content Type
        </Text>
        <select
          style={{
            width: '100%',
            padding: '8px',
            borderWidth: '1px',
            borderColor: '#D1D5DB',
            borderRadius: '6px',
          }}
          value={contentType}
          onChange={(e) => setContentType(e.target.value as any)}
        >
          <option value="text">Text</option>
          <option value="button">Button</option>
          <option value="image">Image</option>
        </select>
      </Box>

      <Box mb={4}>
        <Text mb={2} fontSize="sm" fontWeight="medium">
          Message
        </Text>
        <Textarea
          placeholder="Enter your message template. Use {{variable}} for variables."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
        />
      </Box>

      <Box mb={4}>
        <Text mb={2} fontSize="sm" fontWeight="medium">
          Variables
        </Text>
        <Flex gap={2} mb={2}>
          <Input
            placeholder="Variable name (e.g., name, product)"
            value={newVariable}
            onChange={(e) => setNewVariable(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddVariable()
              }
            }}
          />
          <Button onClick={handleAddVariable}>
            <Plus size={16} style={{ marginRight: '8px' }} />
            Add
          </Button>
        </Flex>

        <Flex flexWrap="wrap" gap={2}>
          {variables.map((variable) => (
            <Badge
              key={variable.id}
              px={3}
              py={1}
              borderRadius="full"
              colorScheme="blue"
              display="flex"
              alignItems="center"
              gap={2}
            >
              {variable.id}
              <Box
                as="button"
                onClick={() => handleRemoveVariable(variable.id)}
                _hover={{ opacity: 0.7 }}
              >
                <X size={14} />
              </Box>
            </Badge>
          ))}
        </Flex>
      </Box>

      <Flex gap={2} justifyContent="flex-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button colorScheme="blue" onClick={handleSave}>
          Save Template
        </Button>
      </Flex>
    </Box>
  )
}
