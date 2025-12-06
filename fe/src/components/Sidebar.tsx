import { Box, Flex } from '@chakra-ui/react'
import { useNavigate, useLocation } from '@tanstack/react-router'
import { MessageSquare, Radio, Bot, Newspaper, LogOut } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useState } from 'react'

interface SidebarItem {
  icon: React.ComponentType<{ size?: number; className?: string }>
  label: string
  path: string
}

const sidebarItems: SidebarItem[] = [
  {
    icon: MessageSquare,
    label: 'Inbox',
    path: '/dashboard/conversation',
  },
  { icon: Radio, label: 'Campaigns', path: '/dashboard/broadcast' },
  { icon: Bot, label: 'Automation', path: '/dashboard/ai-agent' },
  { icon: Newspaper, label: 'Scraping News', path: '/dashboard/scraping-news' },
]

export const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { clearAuth } = useAuthStore()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const handleLogout = () => {
    clearAuth()
    navigate({ to: '/login' as any })
  }

  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + '/')
    )
  }

  return (
    <Box
      w="56px"
      bg="white"
      display="flex"
      flexDirection="column"
      alignItems="center"
      py={4}
      borderRightWidth={1}
      borderColor="gray.200"
      position="relative"
    >
      <Box mb={6}>
        <Box
          w="36px"
          h="36px"
          bgGradient="linear(to-br, blue.500, purple.500)"
          borderRadius="lg"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box as="span" color="white" fontSize="sm" fontWeight="bold">
            W
          </Box>
        </Box>
      </Box>

      <Flex
        flex={1}
        flexDirection="column"
        gap={1}
        alignItems="center"
        w="100%"
      >
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)
          const isHovered = hoveredItem === item.path

          return (
            <Box
              key={item.path}
              position="relative"
              w="100%"
              display="flex"
              justifyContent="center"
            >
              <Box
                as="button"
                onClick={() => navigate({ to: item.path as any })}
                w="40px"
                h="40px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="lg"
                bg={active ? 'blue.50' : 'transparent'}
                color={active ? 'blue.600' : 'gray.400'}
                transition="all 0.2s"
                _hover={{
                  bg: active ? 'blue.50' : 'gray.50',
                  color: active ? 'blue.600' : 'gray.700',
                }}
                title={item.label}
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Icon size={20} />
              </Box>

              {isHovered && (
                <Box
                  position="absolute"
                  left="100%"
                  ml={2}
                  px={2}
                  py={1}
                  bg="gray.900"
                  color="white"
                  fontSize="xs"
                  borderRadius="md"
                  whiteSpace="nowrap"
                  zIndex={50}
                  pointerEvents="none"
                >
                  {item.label}
                </Box>
              )}
            </Box>
          )
        })}
      </Flex>

      <Box position="relative" w="100%" display="flex" justifyContent="center">
        <Box
          as="button"
          onClick={handleLogout}
          w="40px"
          h="40px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="lg"
          color="gray.400"
          transition="all 0.2s"
          _hover={{
            color: 'red.500',
            bg: 'red.50',
          }}
          title="Logout"
          onMouseEnter={() => setHoveredItem('logout')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <LogOut size={20} />
        </Box>

        {hoveredItem === 'logout' && (
          <Box
            position="absolute"
            left="100%"
            ml={2}
            px={2}
            py={1}
            bg="gray.900"
            color="white"
            fontSize="xs"
            borderRadius="md"
            whiteSpace="nowrap"
            zIndex={50}
            pointerEvents="none"
          >
            Logout
          </Box>
        )}
      </Box>
    </Box>
  )
}
