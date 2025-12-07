import { Box, Flex, Button } from '@chakra-ui/react'
import { Globe, Plus } from 'lucide-react'
import { useState } from 'react'
import { AgentsManagementView } from './AgentsManagementView'
import { GlobalSettingsModal } from './GlobalSettingsModal'
import { NewAgentModal } from './NewAgentModal'
import type { AIAgent } from './types'

const mockAgents: AIAgent[] = [
  {
    id: 1,
    name: 'Customer Support',
    description: 'Handles FAQs and product inquiries',
    status: 'active',
    conversations: 1245,
    avgResponseTime: '2.3s',
    satisfactionRate: 94,
    knowledgeBaseSize: 45,
  },
  {
    id: 2,
    name: 'Sales Assistant',
    description: 'Qualifies leads and provides recommendations',
    status: 'active',
    conversations: 856,
    avgResponseTime: '1.8s',
    satisfactionRate: 91,
    knowledgeBaseSize: 32,
  },
  {
    id: 3,
    name: 'Technical Support',
    description: 'Handles technical issues and troubleshooting',
    status: 'inactive',
    conversations: 423,
    avgResponseTime: '3.1s',
    satisfactionRate: 89,
    knowledgeBaseSize: 28,
  },
]

export const AIAgentPage = () => {
  const [showGlobalSettings, setShowGlobalSettings] = useState(false)
  const [showNewAgent, setShowNewAgent] = useState(false)
  const [agents, setAgents] = useState<AIAgent[]>(mockAgents)
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(
    mockAgents[0],
  )

  const handleAddAgent = (newAgent: AIAgent) => {
    setAgents([...agents, newAgent])
    setSelectedAgent(newAgent)
    setShowNewAgent(false)
  }

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
        <Flex alignItems="center" justifyContent="flex-end" gap={2}>
          <Button
            size="sm"
            bg="blue.500"
            color="white"
            _hover={{ bg: 'blue.600' }}
            h="28px"
            px={3}
            fontSize="xs"
            display="flex"
            alignItems="center"
            gap={1.5}
            onClick={() => setShowNewAgent(true)}
          >
            <Plus size={14} />
            New AI Agent
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowGlobalSettings(true)}
            fontSize="xs"
            h="28px"
            px={3}
            display="flex"
            alignItems="center"
            gap={1.5}
          >
            <Globe size={14} />
            Global Settings
          </Button>
        </Flex>
      </Box>

      <Box flex={1} overflow="hidden">
        <AgentsManagementView
          agents={agents}
          onAgentsChange={setAgents}
          selectedAgent={selectedAgent}
          onSelectAgent={setSelectedAgent}
        />
      </Box>

      {showGlobalSettings && (
        <GlobalSettingsModal onClose={() => setShowGlobalSettings(false)} />
      )}
      {showNewAgent && (
        <NewAgentModal
          onClose={() => setShowNewAgent(false)}
          onSave={handleAddAgent}
        />
      )}
    </Box>
  )
}
