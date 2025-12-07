import type { ReactNode } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { Sidebar } from '@/components/Sidebar'
import { Navbar } from '@/components/Navbar'

interface DashboardLayoutProps {
  children: ReactNode
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <Flex h="100vh" overflow="hidden" bg="gray.50">
      <Sidebar />
      <Flex flex={1} flexDirection="column" overflow="hidden">
        <Navbar />
        <Box
          flex={1}
          bg="white"
          margin={3}
          rounded="md"
          overflow="auto"
          minH={0}
        >
          {children}
        </Box>
      </Flex>
    </Flex>
  )
}
