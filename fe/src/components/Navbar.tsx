import { Box, Flex, Text } from '@chakra-ui/react'
import { ChevronDown } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/store/authStore'
import { useState } from 'react'

export const Navbar = () => {
  const { user, clearAuth } = useAuthStore()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    clearAuth()
    navigate({ to: '/login' as any })
  }

  const getInitials = (name?: string) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Box
      h="64px"
      bg="white"
      borderBottomWidth={1}
      borderColor="gray.200"
      px={6}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      position="relative"
      zIndex={10}
    >
      <Box>
        <Text fontSize="lg" fontWeight="bold" color="gray.800">
          Dashboard
        </Text>
      </Box>

      <Flex
        as="button"
        alignItems="center"
        gap={3}
        cursor="pointer"
        onClick={() => setIsOpen(!isOpen)}
        _hover={{ opacity: 0.8 }}
      >
        <Box
          w="32px"
          h="32px"
          borderRadius="full"
          bg="blue.500"
          color="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="xs"
          fontWeight="bold"
        >
          {getInitials(user?.name)}
        </Box>
        <Box display={{ base: 'none', md: 'block' }}>
          <Text fontSize="sm" fontWeight="medium">
            {user?.name || 'User'}
          </Text>
          <Text fontSize="xs" color="gray.600">
            {user?.email || 'user@example.com'}
          </Text>
        </Box>
        <ChevronDown size={16} />
      </Flex>

      {isOpen && (
        <>
          <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            onClick={() => setIsOpen(false)}
            zIndex={998}
          />
          <Box
            position="absolute"
            top="64px"
            right={6}
            bg="white"
            borderWidth={1}
            borderColor="gray.200"
            borderRadius="md"
            boxShadow="lg"
            minW="150px"
            zIndex={999}
            py={2}
          >
            <Box
              as="button"
              w="100%"
              px={4}
              py={2}
              textAlign="left"
              _hover={{ bg: 'gray.50' }}
              onClick={handleLogout}
            >
              <Text fontSize="sm">Logout</Text>
            </Box>
          </Box>
        </>
      )}
    </Box>
  )
}
