import { Box, Flex, Text, Input, Button } from '@chakra-ui/react'
import { X, Search, User } from 'lucide-react'
import { useState } from 'react'

interface AddCollaboratorModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (userId: string, userName: string) => void
}

const mockUsers = [
  { id: '1', name: 'Agent Sarah', email: 'sarah@company.com', role: 'agent' },
  { id: '2', name: 'Agent John', email: 'john@company.com', role: 'agent' },
  { id: '3', name: 'Admin Mike', email: 'mike@company.com', role: 'admin' },
  { id: '4', name: 'Supervisor Lisa', email: 'lisa@company.com', role: 'supervisor' },
]

export const AddCollaboratorModal = ({
  isOpen,
  onClose,
  onAdd,
}: AddCollaboratorModalProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  if (!isOpen) return null

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAdd = () => {
    if (selectedUser) {
      const user = mockUsers.find((u) => u.id === selectedUser)
      if (user) {
        onAdd(user.id, user.name)
        setSelectedUser(null)
        setSearchQuery('')
        onClose()
      }
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
      <Box bg="white" borderRadius="lg" boxShadow="xl" w="full" maxW="md">
        <Flex
          p={4}
          borderBottomWidth={1}
          borderColor="gray.200"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text fontSize="sm" fontWeight="medium" color="gray.900">
            Add Collaborator
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

        <Box p={4} display="flex" flexDirection="column" gap={3}>
          <Box position="relative">
            <Search
              size={14}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9CA3AF',
              }}
            />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or email..."
              pl={9}
              pr={3}
              h="36px"
              fontSize="xs"
              borderWidth={1}
              borderColor="gray.200"
              borderRadius="md"
              _focus={{ ring: 1, ringColor: 'blue.500' }}
            />
          </Box>

          <Box
            maxH="300px"
            overflowY="auto"
            display="flex"
            flexDirection="column"
            gap={1}
          >
            {filteredUsers.length === 0 ? (
              <Box p={4} textAlign="center">
                <Text fontSize="xs" color="gray.500">
                  No users found
                </Text>
              </Box>
            ) : (
              filteredUsers.map((user) => (
                <Box
                  key={user.id}
                  as="button"
                  w="100%"
                  p={2}
                  borderRadius="md"
                  borderWidth={1}
                  borderColor={
                    selectedUser === user.id ? 'blue.300' : 'gray.200'
                  }
                  bg={selectedUser === user.id ? 'blue.50' : 'white'}
                  _hover={{
                    bg: selectedUser === user.id ? 'blue.50' : 'gray.50',
                    borderColor:
                      selectedUser === user.id ? 'blue.300' : 'gray.300',
                  }}
                  onClick={() => setSelectedUser(user.id)}
                  display="flex"
                  alignItems="center"
                  gap={2}
                  transition="all 0.2s"
                >
                  <Box
                    w={8}
                    h={8}
                    bg="blue.100"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <User size={16} color="#2563EB" />
                  </Box>
                  <Box flex={1} textAlign="left">
                    <Text fontSize="xs" fontWeight="medium" color="gray.900">
                      {user.name}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {user.email}
                    </Text>
                  </Box>
                  <Box
                    px={2}
                    py={0.5}
                    borderRadius="sm"
                    bg="gray.100"
                    color="gray.700"
                    fontSize="xs"
                    textTransform="capitalize"
                  >
                    {user.role}
                  </Box>
                </Box>
              ))
            )}
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
            onClick={handleAdd}
            disabled={!selectedUser}
            opacity={!selectedUser ? 0.5 : 1}
            cursor={!selectedUser ? 'not-allowed' : 'pointer'}
          >
            Add Collaborator
          </Button>
        </Flex>
      </Box>
    </Flex>
  )
}

