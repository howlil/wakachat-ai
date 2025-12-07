import { Box, Flex } from '@chakra-ui/react'
import type { Conversation, Message, QuickReply } from './types'
import { ChatHeader } from './components/ChatHeader'
import { TakeoverBanner } from './components/TakeoverBanner'
import { ChatActions } from './components/ChatActions'
import { MessageBubble } from './components/MessageBubble'
import { MessageInput } from './components/MessageInput'

interface ConversationDetailProps {
  conversation: Conversation
  messages: Message[]
  quickReplies: QuickReply[]
  showContactInfo: boolean
  onSendMessage?: (message: string) => void
  onTakeOver?: () => void
  onToggleContactInfo: () => void
}

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

export const ConversationDetail = ({
  conversation,
  messages = demoMessages,
  quickReplies: propQuickReplies = quickReplies,
  showContactInfo,
  onSendMessage,
  onTakeOver,
  onToggleContactInfo,
}: ConversationDetailProps) => {
  return (
    <Flex
      flex={1}
      flexDirection="column"
      bg="white"
      position="relative"
      overflow="hidden"
      minH={0}
      h="100%"
    >
      <Box flexShrink={0}>
        <ChatHeader
          conversation={conversation}
          showContactInfo={showContactInfo}
          onToggleContactInfo={onToggleContactInfo}
          onSearchMessage={(query) => {
            // TODO: Implement message search
            console.log('Search messages:', query)
          }}
        />

        <TakeoverBanner
          takenOverBy={conversation.takenOverBy}
          takenOverAt={conversation.takenOverAt}
        />
      </Box>

      <Box
        flex={1}
        overflowY="auto"
        overflowX="hidden"
        p={4}
        bg="gray.50"
        display="flex"
        flexDirection="column"
        gap={3}
        minH={0}
      >
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            onEvaluate={
              message.sender === 'ai'
                ? (rating, feedback, correctedResponse) => {
                    // TODO: Implement AI message evaluation
                    console.log('Evaluate AI message:', {
                      messageId: message.id,
                      rating,
                      feedback,
                      correctedResponse,
                    })
                  }
                : undefined
            }
          />
        ))}
      </Box>

      <Box flexShrink={0} mt="auto">
        <ChatActions
          isAIHandled={conversation.isAIHandled}
          isTakenOver={conversation.isTakenOver || false}
          onTakeOver={onTakeOver}
        />
        <MessageInput
          quickReplies={propQuickReplies}
          onSend={(message) => {
            onSendMessage?.(message)
          }}
        />
      </Box>
    </Flex>
  )
}
