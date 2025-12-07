import { Box, Flex, Text } from '@chakra-ui/react'
import { ChevronDown, LogOut, User } from 'lucide-react'
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
    setIsOpen(false)
  }

  const getInitials = (name?: string) => {
    if (!name) return 'U'
    const parts = name.split(' ')
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getShortName = (name?: string) => {
    if (!name) return 'User'
    const parts = name.split(' ')
    if (parts.length >= 2) {
      return `${parts[0]} ${parts[parts.length - 1][0]}.`
    }
    return name
  }

  const displayName = user?.name || 'User'
  const displayEmail = user?.email || 'user@example.com'
  const shortName = getShortName(displayName)

  return (
    <Box
      h="64px"
      bg="white"
      borderBottomWidth={1}
      borderColor="gray.200"
      px={6}
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      position="relative"
      zIndex={10}
    >

      <Flex
        as="button"
        alignItems="center"
        gap={2}
        cursor="pointer"
        onClick={() => setIsOpen(!isOpen)}
        _hover={{ opacity: 0.8 }}
      >
        <Text fontSize="sm" fontWeight="medium" color="gray.800">
          {shortName}
        </Text>
        <Box
          w="32px"
          h="32px"
          borderRadius="full"
          bg="blue.100"
          color="blue.600"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="xs"
          fontWeight="bold"
        >
          {getInitials(displayName)}
        </Box>
        <ChevronDown size={16} color="#6B7280" />
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
            minW="200px"
            zIndex={999}
            overflow="hidden"
          >
            <Box px={4} py={3} borderBottomWidth={1} borderColor="gray.200">
              <Text fontSize="sm" fontWeight="medium" color="gray.900" mb={1}>
                {displayName}
              </Text>
              <Text fontSize="xs" color="gray.600">
                {displayEmail}
              </Text>
            </Box>
            <Box py={1}>
              <Box
                as="button"
                w="100%"
                px={4}
                py={2}
                textAlign="left"
                display="flex"
                alignItems="center"
                gap={2}
                _hover={{ bg: 'gray.50' }}
                onClick={() => {
                  setIsOpen(false)
                }}
              >
                <User size={16} color="#6B7280" />
                <Text fontSize="sm" color="gray.700">
                  Profile Settings
                </Text>
              </Box>
              <Box
                as="button"
                w="100%"
                px={4}
                py={2}
                textAlign="left"
                display="flex"
                alignItems="center"
                gap={2}
                _hover={{ bg: 'gray.50' }}
                onClick={handleLogout}
              >
                <LogOut size={16} color="#6B7280" />
                <Text fontSize="sm" color="gray.700">
                  Keluar
                </Text>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  )
}
