import { Box, Flex, Text, Textarea, Button, Input } from '@chakra-ui/react'
import {
  X,
  User,
  Phone,
  Sparkles,
  UserPlus,
  Ban,
  RefreshCw,
} from 'lucide-react'
import { useState } from 'react'
import type { Conversation } from '../types'
import { AddCollaboratorModal } from '../modals/AddCollaboratorModal'
import { ChangeHandlerModal } from '../modals/ChangeHandlerModal'

interface ContactInfoPanelProps {
  conversation: Conversation
  onClose: () => void
  onAddCollaborator?: (userId: string, userName: string) => void
  onChangeHandler?: (userId: string, userName: string) => void
}

export const ContactInfoPanel = ({
  conversation,
  onClose,
  onAddCollaborator,
  onChangeHandler,
}: ContactInfoPanelProps) => {
  const [pipelineStatus, setPipelineStatus] = useState(
    conversation.pipelineStatus,
  )
  const [notes, setNotes] = useState('')
  const [showAddLabel, setShowAddLabel] = useState(false)
  const [showAddCollaborator, setShowAddCollaborator] = useState(false)
  const [showChangeHandler, setShowChangeHandler] = useState(false)
  const [collaborators, setCollaborators] = useState<string[]>([])
  const [currentHandler, setCurrentHandler] = useState(conversation.assignedTo)

  return (
    <Box
      w="320px"
      bg="white"
      borderLeftWidth={1}
      borderColor="gray.200"
      display="flex"
      flexDirection="column"
      h="100%"
      overflow="hidden"
    >
      <Box p={3} borderBottomWidth={1} borderColor="gray.200" flexShrink={0}>
        <Flex alignItems="center" justifyContent="space-between">
          <Text fontSize="sm" fontWeight="medium" color="gray.900">
            Contact Info
          </Text>
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
      </Box>

      <Box
        flex={1}
        overflowY="auto"
        overflowX="hidden"
        p={3}
        display="flex"
        flexDirection="column"
        gap={3}
        minH={0}
      >
        <Box bg="gray.50" borderRadius="lg" p={3}>
          <Box
            w={12}
            h={12}
            bg="blue.100"
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            mx="auto"
            mb={2}
          >
            <User size={24} color="#2563EB" />
          </Box>
          <Text
            fontSize="sm"
            fontWeight="medium"
            color="gray.900"
            textAlign="center"
            mb={1}
          >
            {conversation.customerName}
          </Text>
          <Flex
            alignItems="center"
            justifyContent="center"
            gap={1}
            fontSize="xs"
            color="gray.600"
          >
            <Phone size={12} />
            {conversation.customerPhone}
          </Flex>
          <Flex justifyContent="center" mt={2}>
            <Box
              px={2}
              py={1}
              borderRadius="md"
              bg="blue.100"
              color="blue.700"
              fontSize="xs"
              fontWeight="medium"
            >
              {conversation.inbox}
            </Box>
          </Flex>
        </Box>

        <Box>
          <Text fontSize="xs" color="gray.700" mb={1}>
            Pipeline Status
          </Text>
          <select
            value={pipelineStatus}
            onChange={(e) => setPipelineStatus(e.target.value)}
            style={{
              width: '100%',
              height: '32px',
              padding: '0 12px',
              fontSize: '12px',
              borderWidth: '1px',
              borderColor: '#E5E7EB',
              borderRadius: '6px',
            }}
          >
            <option>New Lead</option>
            <option>Contacted</option>
            <option>Qualified</option>
            <option>Negotiation</option>
            <option>Won</option>
            <option>Lost</option>
            <option>Issue</option>
            <option>Completed</option>
          </select>
        </Box>

        <Box>
          <Flex alignItems="center" justifyContent="space-between" mb={1}>
            <Text fontSize="xs" color="gray.700">
              Labels
            </Text>
            <Box
              as="button"
              fontSize="xs"
              color="blue.600"
              _hover={{ textDecoration: 'underline' }}
              onClick={() => setShowAddLabel(!showAddLabel)}
            >
              + Add
            </Box>
          </Flex>
          <Flex flexWrap="wrap" gap={1}>
            {conversation.labels.map((label) => (
              <Box
                key={label}
                px={2}
                py={1}
                borderRadius="sm"
                bg="purple.100"
                color="purple.700"
                fontSize="xs"
                fontWeight="medium"
                display="flex"
                alignItems="center"
                gap={1}
              >
                {label}
                <X size={12} style={{ cursor: 'pointer' }} />
              </Box>
            ))}
          </Flex>
          {showAddLabel && (
            <Input
              type="text"
              placeholder="Type label name..."
              w="100%"
              h={7}
              px={2}
              mt={2}
              fontSize="xs"
              borderWidth={1}
              borderColor="gray.200"
              borderRadius="md"
            />
          )}
        </Box>

        <Box>
          <Text fontSize="xs" color="gray.700" mb={1}>
            Handled By
          </Text>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            p={2}
            bg="gray.50"
            borderRadius="md"
          >
            <Flex alignItems="center" gap={2}>
              <Box
                w={6}
                h={6}
                bg="blue.500"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize="xs" color="white">
                  {currentHandler ? currentHandler.charAt(0) : 'U'}
                </Text>
              </Box>
              <Text fontSize="xs" color="gray.900">
                {currentHandler || 'Unassigned'}
              </Text>
            </Flex>
            <Box
              as="button"
              fontSize="xs"
              color="blue.600"
              _hover={{ textDecoration: 'underline' }}
              onClick={() => setShowChangeHandler(true)}
            >
              Change
            </Box>
          </Flex>
        </Box>

        <Box>
          <Flex alignItems="center" justifyContent="space-between" mb={1}>
            <Text fontSize="xs" color="gray.700">
              Collaborator
            </Text>
            <Box
              as="button"
              fontSize="xs"
              color="blue.600"
              _hover={{ textDecoration: 'underline' }}
              display="flex"
              alignItems="center"
              gap={1}
              onClick={() => setShowAddCollaborator(true)}
            >
              <UserPlus size={12} />
              Add
            </Box>
          </Flex>
          {collaborators.length === 0 ? (
            <Box
              fontSize="xs"
              color="gray.500"
              p={2}
              bg="gray.50"
              borderRadius="md"
            >
              No collaborators
            </Box>
          ) : (
            <Box display="flex" flexDirection="column" gap={1}>
              {collaborators.map((collab, idx) => (
                <Flex
                  key={idx}
                  alignItems="center"
                  justifyContent="space-between"
                  p={2}
                  bg="gray.50"
                  borderRadius="md"
                >
                  <Flex alignItems="center" gap={2}>
                    <Box
                      w={6}
                      h={6}
                      bg="purple.100"
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text fontSize="xs" color="purple.700">
                        {collab.charAt(0)}
                      </Text>
                    </Box>
                    <Text fontSize="xs" color="gray.900">
                      {collab}
                    </Text>
                  </Flex>
                  <Box
                    as="button"
                    onClick={() =>
                      setCollaborators(
                        collaborators.filter((_, i) => i !== idx),
                      )
                    }
                  >
                    <X size={12} color="#9CA3AF" />
                  </Box>
                </Flex>
              ))}
            </Box>
          )}
        </Box>

        <Box>
          <Text fontSize="xs" color="gray.700" mb={1}>
            Notes (Internal)
          </Text>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add internal notes for team..."
            w="100%"
            h={20}
            p={2}
            fontSize="xs"
            borderWidth={1}
            borderColor="gray.200"
            borderRadius="md"
            resize="none"
          />
          <Button
            w="100%"
            h={7}
            mt={1}
            bg="blue.500"
            color="white"
            _hover={{ bg: 'blue.600' }}
            fontSize="xs"
          >
            Save Note
          </Button>
        </Box>

        <Box>
          <Flex alignItems="center" justifyContent="space-between" mb={1}>
            <Flex alignItems="center" gap={1}>
              <Sparkles size={12} color="#9333EA" />
              <Text fontSize="xs" color="gray.700">
                AI Summary
              </Text>
            </Flex>
            <Button
              size="sm"
              h={6}
              px={2}
              fontSize="xs"
              variant="ghost"
              onClick={() => {
                // TODO: Implement regenerate AI summary
                alert('Regenerating AI summary...')
              }}
              display="flex"
              alignItems="center"
              gap={1}
            >
              <RefreshCw size={12} />
              Regenerate
            </Button>
          </Flex>
          <Box
            p={3}
            bg="purple.50"
            borderWidth={1}
            borderColor="purple.200"
            borderRadius="md"
            fontSize="xs"
            color="gray.700"
          >
            Customer inquiring about WhatsApp verification during subscription.
            AI provided initial support. Agent Sarah took over for detailed
            assistance.
          </Box>
        </Box>

        <Box>
          <Text fontSize="xs" color="gray.700" mb={1}>
            Additional Data
          </Text>
          <Box display="flex" flexDirection="column" gap={1}>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              p={2}
              bg="gray.50"
              borderRadius="md"
              fontSize="xs"
            >
              <Text color="gray.600">Customer Since:</Text>
              <Text color="gray.900">Jan 2024</Text>
            </Flex>
          </Box>
        </Box>

        <Button
          w="100%"
          h={8}
          px={3}
          borderWidth={1}
          borderColor="red.200"
          color="red.600"
          borderRadius="md"
          _hover={{ bg: 'red.50' }}
          fontSize="xs"
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={1}
        >
          <Ban size={12} />
          Block Conversation
        </Button>
      </Box>

      <AddCollaboratorModal
        isOpen={showAddCollaborator}
        onClose={() => setShowAddCollaborator(false)}
        onAdd={(userId, userName) => {
          setCollaborators([...collaborators, userName])
          onAddCollaborator?.(userId, userName)
        }}
      />

      <ChangeHandlerModal
        isOpen={showChangeHandler}
        onClose={() => setShowChangeHandler(false)}
        onChange={(userId, userName) => {
          setCurrentHandler(userName === 'Unassigned' ? undefined : userName)
          onChangeHandler?.(userId, userName)
        }}
        currentHandler={currentHandler}
      />
    </Box>
  )
}
