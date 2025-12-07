import { Box, Flex, Text, Input } from '@chakra-ui/react'
import { Bot, Zap, Search } from 'lucide-react'
import { useState } from 'react'
import type { AIAgent } from './types'
import { AgentList } from './AgentList'
import { AgentDetailPanel } from './AgentDetailPanel'
import { EditAgentModal } from './EditAgentModal'
import { DeleteConfirmModal } from './DeleteConfirmModal'

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

interface AgentsManagementViewProps {
  agents?: AIAgent[]
  onAgentsChange?: (agents: AIAgent[]) => void
  selectedAgent?: AIAgent | null
  onSelectAgent?: (agent: AIAgent | null) => void
}

export const AgentsManagementView = ({
  agents: externalAgents,
  onAgentsChange,
  selectedAgent: externalSelectedAgent,
  onSelectAgent,
}: AgentsManagementViewProps = {}) => {
  const [internalAgents, setInternalAgents] = useState<AIAgent[]>(mockAgents)
  const [internalSelectedAgent, setInternalSelectedAgent] =
    useState<AIAgent | null>(mockAgents[0])

  const agents = externalAgents ?? internalAgents
  const selectedAgent = externalSelectedAgent ?? internalSelectedAgent

  const setAgents = (newAgents: AIAgent[]) => {
    if (onAgentsChange) {
      onAgentsChange(newAgents)
    } else {
      setInternalAgents(newAgents)
    }
  }

  const setSelectedAgent = (agent: AIAgent | null) => {
    if (onSelectAgent) {
      onSelectAgent(agent)
    } else {
      setInternalSelectedAgent(agent)
    }
  }
  const [showEditAgent, setShowEditAgent] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAgents = agents.filter((agent) =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleTogglePause = (agentId: number) => {
    setAgents(
      agents.map((agent) => {
        if (agent.id === agentId) {
          return {
            ...agent,
            status: agent.status === 'active' ? 'inactive' : 'active',
          }
        }
        return agent
      }),
    )
    if (selectedAgent?.id === agentId) {
      setSelectedAgent({
        ...selectedAgent,
        status: selectedAgent.status === 'active' ? 'inactive' : 'active',
      })
    }
  }

  const handleDeleteAgent = () => {
    if (selectedAgent) {
      setAgents(agents.filter((a) => a.id !== selectedAgent.id))
      setSelectedAgent(agents[0] || null)
      setShowDeleteConfirm(false)
    }
  }

  const handleUpdateAgent = (updated: AIAgent) => {
    setAgents(agents.map((a) => (a.id === updated.id ? updated : a)))
    setSelectedAgent(updated)
    setShowEditAgent(false)
  }

  return (
    <Flex h="100%">
      <Box
        w="320px"
        bg="white"
        borderRightWidth={1}
        borderColor="gray.200"
        display="flex"
        flexDirection="column"
      >
        <Box p={3} borderBottomWidth={1} borderColor="gray.200">
          <Flex gap={2} mb={3}>
            {[
              {
                label: 'Active Agents',
                value: agents.filter((a) => a.status === 'active').length,
                icon: Bot,
                color: 'green',
              },
              {
                label: 'Total Conversations',
                value: '2.5k',
                icon: Zap,
                color: 'purple',
              },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <Box
                  key={stat.label}
                  bg="gray.50"
                  borderRadius="lg"
                  p={2}
                  borderWidth={1}
                  borderColor="gray.200"
                  flex={1}
                >
                  <Icon
                    size={14}
                    style={{
                      color: stat.color === 'green' ? '#10B981' : '#9333EA',
                      marginBottom: '4px',
                    }}
                  />
                  <Text fontSize="base" color="gray.900">
                    {stat.value}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {stat.label}
                  </Text>
                </Box>
              )
            })}
          </Flex>

          <Box position="relative">
            <Search
              size={14}
              style={{
                position: 'absolute',
                left: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9CA3AF',
              }}
            />
            <Input
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              pl={7}
              pr={2}
              h="28px"
              fontSize="xs"
              bg="gray.50"
              borderColor="gray.200"
              _focus={{
                ring: 1,
                ringColor: 'blue.500',
              }}
            />
          </Box>
        </Box>

        <Box flex={1} overflow="auto">
          <AgentList
            agents={filteredAgents}
            selectedAgent={selectedAgent}
            onSelect={setSelectedAgent}
          />
        </Box>
      </Box>

      <Box flex={1} display="flex" flexDirection="column" bg="gray.50">
        {selectedAgent ? (
          <AgentDetailPanel
            agent={selectedAgent}
            onTogglePause={handleTogglePause}
            onEdit={() => setShowEditAgent(true)}
            onDelete={() => setShowDeleteConfirm(true)}
          />
        ) : (
          <Box
            flex={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box textAlign="center">
              <Bot
                size={48}
                color="#D1D5DB"
                style={{ margin: '0 auto 12px' }}
              />
              <Text fontSize="xs" color="gray.500">
                Select an agent to view details
              </Text>
            </Box>
          </Box>
        )}
      </Box>

      {showEditAgent && selectedAgent && (
        <EditAgentModal
          agent={selectedAgent}
          onClose={() => setShowEditAgent(false)}
          onSave={handleUpdateAgent}
        />
      )}
      {showDeleteConfirm && (
        <DeleteConfirmModal
          agentName={selectedAgent?.name || ''}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={handleDeleteAgent}
        />
      )}
    </Flex>
  )
}
