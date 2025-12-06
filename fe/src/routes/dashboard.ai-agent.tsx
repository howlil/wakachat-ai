import { createFileRoute } from '@tanstack/react-router'
import { Box, Heading, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { AIAgentConfig } from '@/components/AIAgentConfig'

export const Route = createFileRoute('/dashboard/ai-agent')({
  component: AIAgentPage,
})

function AIAgentPage() {
  const [activeTab, setActiveTab] = useState<'rag' | 'prompt' | 'agents'>('rag')

  interface AIAgentConfig {
    name?: string
    systemPrompt?: string
    restrictionPrompt?: string
    documents?: File[]
  }

  const handleSaveConfig = (_config: AIAgentConfig) => {
    // TODO: Implement AI Agent config saving logic
  }

  const tabs = [
    { id: 'rag', label: 'RAG Pipeline' },
    { id: 'prompt', label: 'Prompt Engineering' },
    { id: 'agents', label: 'Agents List' },
  ]

  return (
    <Box p={6}>
      <Heading size="lg" mb={6}>
        AI Agent Configuration
      </Heading>

      <Box>
        <Box display="flex" borderBottomWidth={1} borderColor="gray.200" mb={4}>
          {tabs.map((tab) => (
            <Box
              key={tab.id}
              as="button"
              px={4}
              py={2}
              borderBottomWidth={activeTab === tab.id ? 2 : 0}
              borderBottomColor={
                activeTab === tab.id ? 'blue.500' : 'transparent'
              }
              color={activeTab === tab.id ? 'blue.600' : 'gray.600'}
              fontWeight={activeTab === tab.id ? 'medium' : 'normal'}
              _hover={{ color: 'blue.600' }}
              onClick={() =>
                setActiveTab(tab.id as 'rag' | 'prompt' | 'agents')
              }
            >
              {tab.label}
            </Box>
          ))}
        </Box>

        {activeTab === 'rag' && <AIAgentConfig onSave={handleSaveConfig} />}

        {activeTab === 'prompt' && (
          <Box p={6} bg="white" borderRadius="lg" maxW="1000px" mx="auto">
            <Heading size="md" mb={4}>
              Prompt Engineering Configuration
            </Heading>
            <Text color="gray.600" mb={4}>
              Configure system prompts and restrictions to guide AI responses
            </Text>
            <AIAgentConfig onSave={handleSaveConfig} />
          </Box>
        )}

        {activeTab === 'agents' && (
          <Box textAlign="center" py={12}>
            <Text color="gray.600">
              List of configured AI agents will appear here
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  )
}
