import { createFileRoute } from '@tanstack/react-router'
import { Flex, Box, Text } from '@chakra-ui/react'
import { MessageSquare } from 'lucide-react'
import { useState } from 'react'
import { ConversationList, ConversationDetail } from '@/components/conversation'
import { ContactInfoPanel } from '@/components/conversation/components/ContactInfoPanel'
import { FilterPopup } from '@/components/conversation/modals/FilterPopup'
import { StartNewChatModal } from '@/components/conversation/modals/StartNewChatModal'
import type {
  Conversation,
  Message,
  UserRole,
  QuickReply,
} from '@/components/conversation/types'

export const Route = createFileRoute('/dashboard/conversation')({
  component: ConversationPage,
})

const mockConversations: Conversation[] = [
  {
    id: '1',
    customerName: 'Yusuf Arjuna Wibawa',
    customerPhone: '6287750503114',
    lastMessage: 'Terima kasih atas informasinya',
    timestamp: '11:42',
    status: 'open',
    channel: 'whatsapp',
    isAIHandled: true,
    whatsappNumber: '+6281234567890',
    inbox: 'Main WhatsApp',
    labels: ['VIP', 'Support'],
    pipelineStatus: 'New Lead',
    unreplied: false,
  },
  {
    id: '2',
    customerName: 'Dila Anastasia',
    customerPhone: '628123456789',
    lastMessage: 'Hi mau connected plan nya dong',
    timestamp: '11:42',
    status: 'assigned',
    assignedTo: 'Agent Sarah',
    assignedToRole: 'agent',
    channel: 'whatsapp',
    isAIHandled: false,
    whatsappNumber: '+6281234567891',
    inbox: 'Sales WhatsApp',
    labels: ['Hot Lead'],
    pipelineStatus: 'Negotiation',
    isCollaborator: false,
    unreplied: false,
    isTakenOver: true,
    takenOverBy: 'Agent Sarah',
    takenOverAt: 'Dec 6, 2024 at 11:43',
  },
  {
    id: '3',
    customerName: 'Pak Heri Susanto',
    customerPhone: '628444555666',
    lastMessage: 'Mau tanya ngalamin lagi issue...',
    timestamp: '11:37',
    status: 'pending',
    channel: 'whatsapp',
    isAIHandled: false,
    unreadCount: 2,
    inbox: 'Support WhatsApp',
    labels: ['Urgent'],
    pipelineStatus: 'Issue',
    unreplied: true,
  },
  {
    id: '4',
    customerName: 'Siti Rahmawati',
    customerPhone: '628555666777',
    lastMessage: 'Sudah selesai, terima kasih banyak!',
    timestamp: 'Yesterday',
    status: 'resolved',
    assignedTo: 'Admin John',
    assignedToRole: 'admin',
    channel: 'whatsapp',
    isAIHandled: false,
    inbox: 'Main WhatsApp',
    labels: ['Resolved'],
    pipelineStatus: 'Completed',
    unreplied: false,
  },
]

const demoMessages: Message[] = [
  {
    id: '1',
    sender: 'customer',
    content: 'apalah dapat verifikasi dari wa ketika berlangganan?',
    timestamp: '11:41',
    status: 'read',
  },
  {
    id: '2',
    sender: 'ai',
    content:
      'Iyaa, kak. Saat berlangganan layanan yang melibatkan WhatsApp, biasanya akan ada proses verifikasi dari WhatsApp untuk memastikan akun terhubung dengan baik. Ada yang mau Clara bantu lagi? 😊',
    timestamp: '11:41',
    status: 'read',
  },
  {
    id: '3',
    sender: 'customer',
    content: 'Clara, ada masalah dengan nomor saya',
    timestamp: '11:42',
    status: 'read',
  },
  {
    id: '4',
    sender: 'agent',
    senderName: 'Agent Sarah',
    content:
      'Halo! Saya Sarah dari tim support. Biarkan saya bantu Anda dengan masalah ini.',
    timestamp: '11:43',
    status: 'read',
  },
  {
    id: '5',
    sender: 'customer',
    content: 'Terima kasih Sarah! Saya tunggu solusinya',
    timestamp: '11:45',
    status: 'delivered',
  },
]

const quickReplies: QuickReply[] = [
  {
    id: '1',
    name: 'greeting',
    content:
      'Halo! Terima kasih sudah menghubungi kami. Ada yang bisa kami bantu?',
  },
  {
    id: '2',
    name: 'followup',
    content:
      'Terima kasih atas pertanyaannya. Tim kami akan segera follow up dalam 1x24 jam.',
  },
  {
    id: '3',
    name: 'closing',
    content:
      'Terima kasih sudah menghubungi kami. Jangan ragu untuk chat lagi jika ada pertanyaan!',
  },
  {
    id: '4',
    name: 'pricing',
    content:
      'Untuk informasi harga, kami akan kirimkan detail lengkapnya via email. Mohon konfirmasi email Anda.',
    hasAttachment: true,
  },
]

function ConversationPage() {
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >('2')
  const userRole: UserRole = 'super_agent'
  const [showFilterPopup, setShowFilterPopup] = useState(false)
  const [showStartNewChat, setShowStartNewChat] = useState(false)
  const [showContactInfo, setShowContactInfo] = useState(true)

  const selectedConversation = mockConversations.find(
    (c) => c.id === selectedConversationId,
  )

  const handleSelectConversation = (id: string) => {
    setSelectedConversationId(id)
  }

  const handleTakeOver = () => {
    if (selectedConversation) {
      // TODO: Implement takeover logic
    }
  }

  const handleSendMessage = (_message: string) => {
    if (selectedConversation) {
      // TODO: Implement send message logic
    }
  }

  const handleBatchResolve = () => {
    // TODO: Implement batch resolve logic
  }

  const handleBatchAssign = () => {
    // TODO: Implement batch assign logic
  }

  const handleBatchLabel = () => {
    // TODO: Implement batch label logic
  }

  const handleAddCollaborator = (_userId: string, _userName: string) => {
    // TODO: Implement add collaborator logic
  }

  const handleChangeHandler = (_userId: string, _userName: string) => {
    // TODO: Implement change handler logic
  }

  return (
    <Flex flexDirection="column" h="100%" overflow="hidden" bg="gray.50">
      <Flex flex={1} overflow="hidden">
        <ConversationList
          conversations={mockConversations}
          selectedId={selectedConversationId}
          userRole={userRole}
          onSelect={handleSelectConversation}
          onBatchResolve={handleBatchResolve}
          onBatchAssign={handleBatchAssign}
          onBatchLabel={handleBatchLabel}
          onFilterClick={() => setShowFilterPopup(true)}
          onStartNewChat={() => setShowStartNewChat(true)}
        />

        {selectedConversation ? (
          <>
            <Box flex={1} overflow="hidden">
              <ConversationDetail
                conversation={selectedConversation}
                messages={demoMessages}
                quickReplies={quickReplies}
                showContactInfo={showContactInfo}
                onSendMessage={handleSendMessage}
                onTakeOver={handleTakeOver}
                onToggleContactInfo={() => setShowContactInfo(!showContactInfo)}
              />
            </Box>

            {showContactInfo && (
              <ContactInfoPanel
                conversation={selectedConversation}
                onClose={() => setShowContactInfo(false)}
                onAddCollaborator={handleAddCollaborator}
                onChangeHandler={handleChangeHandler}
              />
            )}
          </>
        ) : (
          <Box
            flex={1}
            overflow="auto"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box textAlign="center">
              <MessageSquare
                size={64}
                color="#D1D5DB"
                style={{ margin: '0 auto 16px' }}
              />
              <Text fontSize="sm" color="gray.500">
                Select a conversation to start messaging
              </Text>
            </Box>
          </Box>
        )}
      </Flex>

      <FilterPopup
        isOpen={showFilterPopup}
        onClose={() => setShowFilterPopup(false)}
      />

      <StartNewChatModal
        isOpen={showStartNewChat}
        onClose={() => setShowStartNewChat(false)}
      />
    </Flex>
  )
}
