import { Box, Flex, Button } from '@chakra-ui/react'
import { Filter, Download } from 'lucide-react'
import { useState } from 'react'
import { ConversationAnalytics } from './ConversationAnalytics'
import { AIAgentAnalytics } from './AIAgentAnalytics'
import { SessionAnalytics } from './SessionAnalytics'
import { AIPerformanceAnalytics } from './AIPerformanceAnalytics'

export const AnalyticsPage = () => {
  const [activeTab, setActiveTab] = useState<
    'conversation' | 'ai-agent' | 'session' | 'ai-performance'
  >('conversation')
  const [dateRange, setDateRange] = useState('7days')

  return (
    <Box h="100%" display="flex" flexDirection="column" bg="white">
      <Box
        h="48px"
        px={4}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        bg="white"
        borderBottomWidth={1}
        borderColor="gray.200"
      >
        <Flex alignItems="center" gap={6}>
          <Box fontSize="sm" color="gray.900" fontWeight="medium">
            Analytics
          </Box>
          <Flex gap={1}>
            {[
              { id: 'conversation', label: 'Conversation' },
              { id: 'ai-agent', label: 'AI Agent' },
              { id: 'session', label: 'Session' },
              { id: 'ai-performance', label: 'AI Performance' },
            ].map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                px={3}
                h="28px"
                fontSize="xs"
                borderRadius="md"
                bg={activeTab === tab.id ? 'blue.50' : 'transparent'}
                color={activeTab === tab.id ? 'blue.600' : 'gray.600'}
                _hover={{ bg: 'gray.50' }}
              >
                {tab.label}
              </Button>
            ))}
          </Flex>
        </Flex>

        <Flex alignItems="center" gap={2}>
          <Box
            as="select"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            h="32px"
            px={3}
            fontSize="xs"
            borderWidth={1}
            borderColor="gray.200"
            borderRadius="md"
            bg="white"
            _focus={{
              ring: 1,
              ringColor: 'blue.500',
            }}
          >
            <option value="today">Today</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="custom">Custom Range</option>
          </Box>
          <Button
            h="32px"
            px={3}
            borderWidth={1}
            borderColor="gray.200"
            borderRadius="md"
            _hover={{ bg: 'gray.50' }}
            fontSize="xs"
            display="flex"
            alignItems="center"
            gap={1}
          >
            <Filter size={14} />
            Filter
          </Button>
          <Button
            h="32px"
            px={3}
            bg="blue.500"
            color="white"
            _hover={{ bg: 'blue.600' }}
            borderRadius="md"
            fontSize="xs"
            display="flex"
            alignItems="center"
            gap={1}
          >
            <Download size={14} />
            Export
          </Button>
        </Flex>
      </Box>

      <Box flex={1} overflow="auto" p={6}>
        {activeTab === 'conversation' && <ConversationAnalytics />}
        {activeTab === 'ai-agent' && <AIAgentAnalytics />}
        {activeTab === 'session' && <SessionAnalytics />}
        {activeTab === 'ai-performance' && <AIPerformanceAnalytics />}
      </Box>
    </Box>
  )
}

