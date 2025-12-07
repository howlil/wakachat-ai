import { Box, Flex, Text, Button, Badge } from '@chakra-ui/react'
import { Users, Clock, BarChart3 } from 'lucide-react'
import type { BroadcastCampaign } from './types'

interface CampaignListProps {
  campaigns: BroadcastCampaign[]
  onViewAnalytics: (campaign: BroadcastCampaign) => void
}

export const CampaignList = ({
  campaigns,
  onViewAnalytics,
}: CampaignListProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return { bg: 'green.100', color: 'green.700' }
      case 'sending':
        return { bg: 'yellow.100', color: 'yellow.700' }
      case 'failed':
        return { bg: 'red.100', color: 'red.700' }
      default:
        return { bg: 'gray.100', color: 'gray.600' }
    }
  }

  return (
    <Box>
      {campaigns.map((campaign) => {
        const statusStyle = getStatusBadge(campaign.status)
        return (
          <Box
            key={campaign.id}
            p={3}
            borderBottomWidth={1}
            borderColor="gray.100"
            _hover={{ bg: 'gray.50' }}
            transition="all 0.2s"
          >
            <Flex alignItems="start" justifyContent="space-between" mb={2}>
              <Box>
                <Flex alignItems="center" gap={2} mb={1}>
                  <Text fontSize="sm" color="gray.900" fontWeight="medium">
                    {campaign.name}
                  </Text>
                  <Badge
                    h="20px"
                    px={2}
                    fontSize="xs"
                    borderRadius="sm"
                    borderWidth={0}
                    bg={statusStyle.bg}
                    color={statusStyle.color}
                  >
                    {campaign.status}
                  </Badge>
                </Flex>
                <Flex
                  alignItems="center"
                  gap={3}
                  fontSize="xs"
                  color="gray.500"
                >
                  <Flex alignItems="center" gap={1}>
                    <Users size={12} />
                    {campaign.recipients.toLocaleString()}
                  </Flex>
                  {campaign.sentAt && (
                    <>
                      <Text>•</Text>
                      <Flex alignItems="center" gap={1}>
                        <Clock size={12} />
                        {campaign.sentAt}
                      </Flex>
                    </>
                  )}
                </Flex>
              </Box>
              <Button
                size="sm"
                variant="outline"
                h="28px"
                px={3}
                fontSize="xs"
                display="flex"
                alignItems="center"
                gap={1}
                onClick={() => onViewAnalytics(campaign)}
              >
                <BarChart3 size={12} />
                Analytics
              </Button>
            </Flex>

            {campaign.status !== 'draft' && (
              <Flex gap={2}>
                {[
                  {
                    label: 'Delivered',
                    value: campaign.delivered,
                    total: campaign.recipients,
                  },
                  {
                    label: 'Read',
                    value: campaign.read,
                    total: campaign.delivered,
                  },
                  {
                    label: 'Replied',
                    value: campaign.replied,
                    total: campaign.read,
                  },
                  {
                    label: 'Failed',
                    value: campaign.failed,
                    total: campaign.recipients,
                  },
                ].map((metric) => (
                  <Box
                    key={metric.label}
                    bg="gray.50"
                    borderRadius="md"
                    p={2}
                    borderWidth={1}
                    borderColor="gray.100"
                    flex={1}
                  >
                    <Text fontSize="xs" color="gray.500" mb={0.5}>
                      {metric.label}
                    </Text>
                    <Text fontSize="sm" color="gray.900">
                      {metric.value}
                    </Text>
                  </Box>
                ))}
              </Flex>
            )}
          </Box>
        )
      })}
    </Box>
  )
}
