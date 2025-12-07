import { Box, Flex, Text, Button, Badge } from '@chakra-ui/react'
import { Activity, Edit, Pause, Play, Trash2 } from 'lucide-react'
import { useState } from 'react'
import type { AIAgent } from './types'
import { OverviewTab } from './OverviewTab'
import { KnowledgeTab } from './KnowledgeTab'
import { PromptsTab } from './PromptsTab'
import { AgentTransferSettings } from './AgentTransferSettings'
import { AgentTestingPage } from './AgentTestingPage'
import { AgentEvaluationHistory } from './AgentEvaluationHistory'

interface AgentDetailPanelProps {
  agent: AIAgent
  onTogglePause: (id: number) => void
  onEdit: () => void
  onDelete: () => void
}

export const AgentDetailPanel = ({
  agent,
  onTogglePause,
  onEdit,
  onDelete,
}: AgentDetailPanelProps) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'knowledge' | 'prompts' | 'transfer' | 'testing' | 'evaluation'
  >('overview')

  return (
    <>
      <Box bg="white" borderBottomWidth={1} borderColor="gray.200">
        <Box p={4}>
          <Flex alignItems="start" justifyContent="space-between" mb={3}>
            <Box>
              <Flex alignItems="center" gap={2} mb={1}>
                <Text fontSize="sm" color="gray.900" fontWeight="medium">
                  {agent.name}
                </Text>
                <Badge
                  h="20px"
                  px={2}
                  fontSize="xs"
                  borderRadius="sm"
                  borderWidth={0}
                  bg={agent.status === 'active' ? 'green.100' : 'gray.100'}
                  color={agent.status === 'active' ? 'green.700' : 'gray.600'}
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <Activity size={12} />
                  {agent.status}
                </Badge>
              </Flex>
              <Text fontSize="xs" color="gray.500">
                {agent.description}
              </Text>
            </Box>
            <Flex gap={1}>
              <Button
                size="sm"
                variant="outline"
                onClick={onEdit}
                h="28px"
                px={3}
                fontSize="xs"
                display="flex"
                alignItems="center"
                gap={1}
              >
                <Edit size={12} />
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onTogglePause(agent.id)}
                h="28px"
                px={3}
                fontSize="xs"
                display="flex"
                alignItems="center"
                gap={1}
              >
                {agent.status === 'active' ? (
                  <>
                    <Pause size={12} />
                    Pause
                  </>
                ) : (
                  <>
                    <Play size={12} />
                    Resume
                  </>
                )}
              </Button>
              <Button
                size="sm"
                variant="outline"
                borderColor="red.300"
                color="red.600"
                _hover={{ bg: 'red.50' }}
                onClick={onDelete}
                h="28px"
                px={3}
                fontSize="xs"
                display="flex"
                alignItems="center"
                gap={1}
              >
                <Trash2 size={12} />
                Delete
              </Button>
            </Flex>
          </Flex>

          <Flex gap={1} overflowX="auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'knowledge', label: 'Knowledge Base' },
              { id: 'prompts', label: 'Prompts & Rules' },
              { id: 'transfer', label: 'Agent Transfer' },
              { id: 'testing', label: 'Testing' },
              { id: 'evaluation', label: 'Evaluation' },
            ].map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                px={3}
                h="28px"
                fontSize="xs"
                borderRadius="md"
                whiteSpace="nowrap"
                bg={activeTab === tab.id ? 'blue.50' : 'transparent'}
                color={activeTab === tab.id ? 'blue.600' : 'gray.600'}
                _hover={{ bg: 'gray.50' }}
              >
                {tab.label}
              </Button>
            ))}
          </Flex>
        </Box>
      </Box>

      <Box flex={1} overflow="auto" p={4}>
        {activeTab === 'overview' && <OverviewTab agent={agent} />}
        {activeTab === 'knowledge' && (
          <KnowledgeTab agentId={agent.id} agentName={agent.name} />
        )}
        {activeTab === 'prompts' && (
          <PromptsTab agentId={agent.id} agentName={agent.name} />
        )}
        {activeTab === 'transfer' && (
          <AgentTransferSettings agentName={agent.name} />
        )}
        {activeTab === 'testing' && <AgentTestingPage agentName={agent.name} />}
        {activeTab === 'evaluation' && (
          <AgentEvaluationHistory agentName={agent.name} />
        )}
      </Box>
    </>
  )
}
