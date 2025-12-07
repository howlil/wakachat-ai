import { Box, Flex, Text, Input, Button, Badge } from '@chakra-ui/react'
import {
  Plus,
  Search,
  FileText,
  Image as ImageIcon,
  File,
  Edit,
  Trash2,
} from 'lucide-react'
import { useState } from 'react'
import type { QuickReply } from './types'
import { QuickReplyModal } from './modals/QuickReplyModal'

const mockQuickReplies: QuickReply[] = [
  {
    id: 1,
    name: 'greeting',
    content:
      'Halo! Terima kasih sudah menghubungi kami. Ada yang bisa kami bantu?',
    createdAt: 'Dec 1, 2024',
    usageCount: 45,
  },
  {
    id: 2,
    name: 'followup',
    content:
      'Terima kasih atas pertanyaannya. Tim kami akan segera follow up dalam 1x24 jam.',
    createdAt: 'Dec 2, 2024',
    usageCount: 32,
  },
  {
    id: 3,
    name: 'pricing',
    content:
      'Untuk informasi harga lengkap, kami sudah kirimkan dokumen detail pricing melalui attachment di bawah ini.',
    attachmentType: 'pdf',
    attachmentName: 'Price_List_2024.pdf',
    createdAt: 'Dec 3, 2024',
    usageCount: 28,
  },
  {
    id: 4,
    name: 'closing',
    content:
      'Terima kasih sudah menghubungi kami. Jangan ragu untuk chat lagi jika ada pertanyaan!',
    createdAt: 'Dec 4, 2024',
    usageCount: 56,
  },
  {
    id: 5,
    name: 'catalog',
    content: 'Berikut katalog produk terbaru kami untuk bulan ini.',
    attachmentType: 'image',
    attachmentName: 'catalog_december_2024.jpg',
    createdAt: 'Dec 5, 2024',
    usageCount: 18,
  },
]

interface QuickReplyViewProps {
  showToolbar?: boolean
}

export const QuickReplyView = ({ showToolbar = true }: QuickReplyViewProps) => {
  const [showNewModal, setShowNewModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedQuickReply, setSelectedQuickReply] =
    useState<QuickReply | null>(null)

  const filteredReplies = mockQuickReplies.filter(
    (qr) =>
      qr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      qr.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getAttachmentIcon = (type?: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon size={14} color="#6B7280" />
      case 'pdf':
        return <File size={14} color="#DC2626" />
      case 'excel':
        return <File size={14} color="#16A34A" />
      case 'word':
        return <File size={14} color="#2563EB" />
      default:
        return <File size={14} color="#6B7280" />
    }
  }

  return (
    <Box h="100%" display="flex" flexDirection="column" bg="gray.50">
      {showToolbar && (
        <Box
          px={6}
          py={3}
          bg="white"
          borderBottomWidth={1}
          borderColor="gray.200"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text fontSize="xs" color="gray.500">
            {mockQuickReplies.length} templates
          </Text>
          <Button
            size="sm"
            bg="blue.500"
            color="white"
            _hover={{ bg: 'blue.600' }}
            h="32px"
            px={3}
            fontSize="xs"
            display="flex"
            alignItems="center"
            gap={1.5}
            onClick={() => setShowNewModal(true)}
          >
            <Plus size={14} />
            Add Quick Reply
          </Button>
        </Box>
      )}

      <Box p={4} bg="white" borderBottomWidth={1} borderColor="gray.200">
        <Box position="relative">
          <Search
            size={14}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9CA3AF',
            }}
          />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search quick replies..."
            h="36px"
            pl={9}
            pr={3}
            fontSize="xs"
            borderWidth={1}
            borderColor="gray.200"
            borderRadius="md"
            _focus={{ ring: 1, ringColor: 'blue.500' }}
          />
        </Box>
      </Box>

      <Box flex={1} overflow="auto" p={4}>
        <Box
          display="grid"
          gridTemplateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          }}
          gap={3}
        >
          {filteredReplies.map((qr) => (
            <Box
              key={qr.id}
              bg="white"
              borderWidth={1}
              borderColor="gray.200"
              borderRadius="lg"
              p={4}
              _hover={{ boxShadow: 'md' }}
              transition="all 0.2s"
            >
              <Flex alignItems="start" justifyContent="space-between" mb={2}>
                <Box flex={1}>
                  <Flex alignItems="center" gap={2} mb={1}>
                    <FileText size={16} color="#2563EB" />
                    <Text fontSize="xs" color="gray.900" fontWeight="medium">
                      /{qr.name}
                    </Text>
                  </Flex>
                  <Text
                    fontSize="xs"
                    color="gray.600"
                    mb={2}
                    overflow="hidden"
                    textOverflow="ellipsis"
                    display="-webkit-box"
                    style={{
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {qr.content}
                  </Text>
                </Box>
                <Flex gap={1} ml={2}>
                  <Box
                    as="button"
                    w={6}
                    h={6}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    _hover={{ bg: 'gray.100' }}
                    borderRadius="md"
                    transition="all 0.2s"
                    onClick={() => setSelectedQuickReply(qr)}
                    title="Edit"
                  >
                    <Edit size={12} color="#6B7280" />
                  </Box>
                  <Box
                    as="button"
                    w={6}
                    h={6}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    _hover={{ bg: 'red.50' }}
                    borderRadius="md"
                    transition="all 0.2s"
                    onClick={() => alert(`Delete ${qr.name}?`)}
                    title="Delete"
                  >
                    <Trash2 size={12} color="#DC2626" />
                  </Box>
                </Flex>
              </Flex>

              {qr.attachmentType && (
                <Flex
                  alignItems="center"
                  gap={1.5}
                  p={2}
                  bg="gray.50"
                  borderRadius="md"
                  mb={2}
                >
                  {getAttachmentIcon(qr.attachmentType)}
                  <Text
                    fontSize="xs"
                    color="gray.700"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    flex={1}
                  >
                    {qr.attachmentName}
                  </Text>
                </Flex>
              )}

              <Flex
                alignItems="center"
                justifyContent="space-between"
                fontSize="xs"
                color="gray.500"
              >
                <Text>{qr.createdAt}</Text>
                <Badge
                  h="16px"
                  px={1.5}
                  fontSize="xs"
                  bg="blue.100"
                  color="blue.700"
                  borderWidth={0}
                >
                  {qr.usageCount} uses
                </Badge>
              </Flex>
            </Box>
          ))}
        </Box>

        {filteredReplies.length === 0 && (
          <Box textAlign="center" py={12}>
            <FileText
              size={48}
              color="#D1D5DB"
              style={{ margin: '0 auto 12px' }}
            />
            <Text fontSize="sm" color="gray.500">
              No quick replies found
            </Text>
          </Box>
        )}
      </Box>

      {(showNewModal || selectedQuickReply) && (
        <QuickReplyModal
          quickReply={selectedQuickReply}
          onClose={() => {
            setShowNewModal(false)
            setSelectedQuickReply(null)
          }}
        />
      )}
    </Box>
  )
}
