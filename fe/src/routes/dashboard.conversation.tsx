import { createFileRoute } from '@tanstack/react-router'
import { Flex, Box } from '@chakra-ui/react'
import { useState } from 'react'
import { ConversationList } from '@/components/ConversationList'
import { ConversationContent } from '@/components/ConversationContent'
import { ConversationDetail } from '@/components/ConversationDetail'
import { useAuthStore } from '@/store/authStore'

export const Route = createFileRoute('/dashboard/conversation')({
  component: ConversationPage,
})

function ConversationPage() {
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null)
  const [currentAgent, setCurrentAgent] = useState<string | null>(
    'Cekat AI Dev',
  )
  const { user } = useAuthStore()
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN'

  const handleSelectConversation = (id: string) => {
    setSelectedConversation(id)
  }

  const handleTakeOver = () => {
    setCurrentAgent(null)
  }

  const handleReturnToAgent = () => {
    setCurrentAgent('Cekat AI Dev')
  }

  if (selectedConversation) {
    return (
      <Flex h="100%" overflow="hidden">
        <ConversationList
          onSelect={handleSelectConversation}
          selectedId={selectedConversation}
        />
        <Box flex={1}>
          <ConversationDetail
            conversationId={selectedConversation}
            onBack={() => setSelectedConversation(null)}
            onTakeOver={handleTakeOver}
            onReturnToAgent={handleReturnToAgent}
            isAdmin={isAdmin}
            currentAgent={currentAgent || undefined}
          />
        </Box>
      </Flex>
    )
  }

  return (
    <Flex h="100%" overflow="hidden">
      <ConversationList
        onSelect={handleSelectConversation}
        selectedId={selectedConversation}
      />
      <Box flex={1} overflow="auto">
        <ConversationContent />
      </Box>
    </Flex>
  )
}
