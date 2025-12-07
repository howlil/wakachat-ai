import { Box, Flex, Text, Input, Button } from '@chakra-ui/react'
import { Search } from 'lucide-react'
import { useState } from 'react'
import type { BroadcastCampaign } from './types'
import { StatsCards } from './StatsCards'
import { CampaignList } from './CampaignList'

interface BroadcastViewProps {
  onViewAnalytics: (campaign: BroadcastCampaign) => void
}

const mockCampaigns: BroadcastCampaign[] = [
  {
    id: 1,
    name: 'Flash Sale Akhir Tahun',
    template: {
      id: 1,
      name: 'flash_sale_template',
      type: 'marketing',
      messageType: 'image_with_button',
      content: 'Halo {{name}}! 🎉',
      language: 'id',
      status: 'approved',
      createdAt: '2024-12-01',
    },
    status: 'completed',
    sentAt: '2024-12-05 10:00',
    recipients: 2450,
    delivered: 2398,
    read: 1876,
    replied: 234,
    failed: 52,
  },
  {
    id: 2,
    name: 'Product Launch',
    template: {
      id: 2,
      name: 'product_launch',
      type: 'marketing',
      messageType: 'text_with_button',
      content: 'Hi {{name}}',
      language: 'id',
      status: 'approved',
      createdAt: '2024-12-03',
    },
    status: 'sending',
    recipients: 856,
    delivered: 654,
    read: 423,
    replied: 45,
    failed: 12,
  },
  {
    id: 3,
    name: 'Customer Feedback Survey',
    template: {
      id: 3,
      name: 'feedback_survey',
      type: 'utility',
      messageType: 'text',
      content: 'Dear {{name}}',
      language: 'id',
      status: 'approved',
      createdAt: '2024-12-02',
    },
    status: 'completed',
    sentAt: '2024-12-04 14:30',
    recipients: 1520,
    delivered: 1498,
    read: 1124,
    replied: 456,
    failed: 22,
  },
]

export const BroadcastView = ({ onViewAnalytics }: BroadcastViewProps) => {
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'completed' | 'sending' | 'failed'
  >('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCampaigns = mockCampaigns.filter((campaign) => {
    const matchesStatus =
      statusFilter === 'all' || campaign.status === statusFilter
    const matchesSearch = campaign.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <Box p={4}>
      <Box>
        <StatsCards />

        <Box
          bg="white"
          borderRadius="lg"
          borderWidth={1}
          borderColor="gray.200"
          mt={3}
        >
          <Box p={3} borderBottomWidth={1} borderColor="gray.200">
            <Flex alignItems="center" justifyContent="space-between" mb={2}>
              <Text fontSize="sm" color="gray.900" fontWeight="medium">
                Recent Campaigns
              </Text>
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
                  placeholder="Search..."
                  h="28px"
                  w="192px"
                  pl={7}
                  pr={2}
                  fontSize="xs"
                  bg="gray.50"
                  borderColor="gray.200"
                  _focus={{ ring: 1, ringColor: 'blue.500' }}
                />
              </Box>
            </Flex>

            <Flex gap={1}>
              {[
                { id: 'all', label: 'All', count: mockCampaigns.length },
                {
                  id: 'completed',
                  label: 'Completed',
                  count: mockCampaigns.filter((c) => c.status === 'completed')
                    .length,
                },
                {
                  id: 'sending',
                  label: 'Sending',
                  count: mockCampaigns.filter((c) => c.status === 'sending')
                    .length,
                },
                {
                  id: 'failed',
                  label: 'Failed',
                  count: mockCampaigns.filter((c) => c.status === 'failed')
                    .length,
                },
              ].map((filter) => (
                <Button
                  key={filter.id}
                  onClick={() => setStatusFilter(filter.id as any)}
                  px={3}
                  h="24px"
                  fontSize="xs"
                  borderRadius="md"
                  bg={statusFilter === filter.id ? 'blue.50' : 'transparent'}
                  color={statusFilter === filter.id ? 'blue.600' : 'gray.600'}
                  _hover={{ bg: 'gray.50' }}
                >
                  {filter.label} ({filter.count})
                </Button>
              ))}
            </Flex>
          </Box>

          <Box>
            {filteredCampaigns.length === 0 ? (
              <Box p={8} textAlign="center">
                <Text fontSize="xs" color="gray.500">
                  No campaigns found
                </Text>
              </Box>
            ) : (
              <CampaignList
                campaigns={filteredCampaigns}
                onViewAnalytics={onViewAnalytics}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
