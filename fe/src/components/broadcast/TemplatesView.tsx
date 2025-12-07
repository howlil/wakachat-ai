import { Box, Flex, Text, Input, Button, Badge } from '@chakra-ui/react'
import {
  FileText,
  Search,
  Copy,
  Eye,
  MoreVertical,
} from 'lucide-react'
import { useState } from 'react'
import type { Template } from './types'
import { TemplateTable } from './TemplateTable'

interface TemplatesViewProps {
  onViewTemplate: (template: Template) => void
}

const mockTemplates: Template[] = [
  {
    id: 1,
    name: 'flash_sale_template',
    type: 'marketing',
    messageType: 'image_with_button',
    content:
      'Halo {{1}}! 🎉\n\nDapatkan diskon hingga 70% untuk produk pilihan!\n\nPromo terbatas sampai {{2}}.',
    buttons: [
      { id: '1', type: 'url', text: 'Lihat Produk', value: 'https://example.com/sale' },
      { id: '2', type: 'phone', text: 'Hubungi CS', value: '+6281234567890' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400',
    variables: ['{{1}}', '{{2}}'],
    language: 'id',
    status: 'approved',
    createdAt: '2024-12-01',
  },
  {
    id: 2,
    name: 'order_confirmation',
    type: 'utility',
    messageType: 'text',
    content:
      'Halo {{1}},\n\nPesanan Anda #{{2}} telah dikonfirmasi!\n\nTotal: Rp {{3}}\n\nTerima kasih!',
    variables: ['{{1}}', '{{2}}', '{{3}}'],
    language: 'id',
    status: 'approved',
    createdAt: '2024-11-28',
  },
  {
    id: 3,
    name: 'shipping_notification',
    type: 'utility',
    messageType: 'text_with_button',
    content: 'Hi {{1}}! 📦\n\nPaket Anda sedang dalam perjalanan.\n\nResi: {{2}}',
    buttons: [
      { id: '1', type: 'url', text: 'Lacak Paket', value: 'https://example.com/track' },
    ],
    variables: ['{{1}}', '{{2}}'],
    language: 'id',
    status: 'approved',
    createdAt: '2024-11-25',
  },
  {
    id: 4,
    name: 'appointment_reminder',
    type: 'utility',
    messageType: 'text',
    content:
      'Halo {{1}},\n\nPengingat: Anda memiliki janji temu pada {{2}} pukul {{3}}.\n\nLokasi: {{4}}',
    variables: ['{{1}}', '{{2}}', '{{3}}', '{{4}}'],
    language: 'id',
    status: 'pending',
    createdAt: '2024-11-20',
  },
]

export const TemplatesView = ({ onViewTemplate }: TemplatesViewProps) => {
  const [typeFilter, setTypeFilter] = useState<'all' | 'marketing' | 'utility'>(
    'all',
  )
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'approved' | 'pending' | 'rejected'
  >('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTemplates = mockTemplates.filter((template) => {
    const matchesType = typeFilter === 'all' || template.type === typeFilter
    const matchesStatus =
      statusFilter === 'all' || template.status === statusFilter
    const matchesSearch = template.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    return matchesType && matchesStatus && matchesSearch
  })

  return (
    <Box p={4}>
      <Box>
        <Box
          bg="green.50"
          borderWidth={1}
          borderColor="green.200"
          borderRadius="lg"
          p={3}
          mb={3}
        >
          <Flex alignItems="start" gap={3}>
            <Box
              w="40px"
              h="40px"
              bg="green.100"
              borderRadius="lg"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <FileText size={20} color="#10B981" />
            </Box>
            <Box>
              <Text fontSize="sm" color="green.900" fontWeight="medium" mb={1}>
                WhatsApp Templates
              </Text>
              <Text fontSize="xs" color="green.700">
                Pre-approved message templates for business communication.
                Variables use Twilio format: {'{{1}}'}, {'{{2}}'}, etc.
              </Text>
            </Box>
          </Flex>
        </Box>

        <Box bg="white" borderRadius="lg" borderWidth={1} borderColor="gray.200" p={3} mb={3}>
          <Flex alignItems="center" justifyContent="space-between" gap={3}>
            <Flex gap={2} flex={1}>
              <Flex gap={1}>
                {[
                  { id: 'all', label: 'All', count: mockTemplates.length },
                  {
                    id: 'marketing',
                    label: 'Marketing',
                    count: mockTemplates.filter((t) => t.type === 'marketing')
                      .length,
                  },
                  {
                    id: 'utility',
                    label: 'Utility',
                    count: mockTemplates.filter((t) => t.type === 'utility')
                      .length,
                  },
                ].map((filter) => (
                  <Button
                    key={filter.id}
                    onClick={() => setTypeFilter(filter.id as any)}
                    px={3}
                    h="28px"
                    fontSize="xs"
                    borderRadius="md"
                    bg={typeFilter === filter.id ? 'blue.50' : 'transparent'}
                    color={typeFilter === filter.id ? 'blue.600' : 'gray.600'}
                    _hover={{ bg: 'gray.50' }}
                  >
                    {filter.label} ({filter.count})
                  </Button>
                ))}
              </Flex>

              <Box
                borderLeftWidth={1}
                borderColor="gray.200"
                pl={2}
                ml={2}
              >
                <Flex gap={1}>
                  {[
                    { id: 'all', label: 'All Status' },
                    {
                      id: 'approved',
                      label: 'Approved',
                      count: mockTemplates.filter((t) => t.status === 'approved')
                        .length,
                    },
                    {
                      id: 'pending',
                      label: 'Pending',
                      count: mockTemplates.filter((t) => t.status === 'pending')
                        .length,
                    },
                  ].map((filter) => (
                    <Button
                      key={filter.id}
                      onClick={() => setStatusFilter(filter.id as any)}
                      px={3}
                      h="28px"
                      fontSize="xs"
                      borderRadius="md"
                      bg={
                        statusFilter === filter.id ? 'green.50' : 'transparent'
                      }
                      color={
                        statusFilter === filter.id ? 'green.600' : 'gray.600'
                      }
                      _hover={{ bg: 'gray.50' }}
                    >
                      {filter.label}
                      {filter.count !== undefined && ` (${filter.count})`}
                    </Button>
                  ))}
                </Flex>
              </Box>
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
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates..."
                h="28px"
                w="224px"
                pl={7}
                pr={2}
                fontSize="xs"
                bg="gray.50"
                borderColor="gray.200"
                _focus={{ ring: 1, ringColor: 'blue.500' }}
              />
            </Box>
          </Flex>
        </Box>

        <TemplateTable
          templates={filteredTemplates}
          onViewTemplate={onViewTemplate}
        />
      </Box>
    </Box>
  )
}

