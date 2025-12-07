import { Box, Flex, Text, Button } from '@chakra-ui/react'
import {
  X,
  Download,
  Users,
  CheckCheck,
  Eye,
  MessageSquare,
} from 'lucide-react'
import type { BroadcastCampaign } from '../types'

interface CampaignAnalyticsModalProps {
  campaign: BroadcastCampaign
  onClose: () => void
}

export const CampaignAnalyticsModal = ({
  campaign,
  onClose,
}: CampaignAnalyticsModalProps) => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="blackAlpha.500"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
      zIndex={50}
    >
      <Box
        bg="white"
        borderRadius="lg"
        boxShadow="xl"
        w="100%"
        maxW="1024px"
        maxH="90vh"
        overflow="auto"
      >
        <Box
          p={4}
          borderBottomWidth={1}
          borderColor="gray.200"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          position="sticky"
          top={0}
          bg="white"
          zIndex={10}
        >
          <Box>
            <Text fontSize="sm" color="gray.900" fontWeight="medium">
              {campaign.name}
            </Text>
            <Text fontSize="xs" color="gray.500">
              Campaign Analytics
            </Text>
          </Box>
          <Flex gap={2}>
            <Button
              size="sm"
              variant="outline"
              h="28px"
              px={3}
              fontSize="xs"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <Download size={12} />
              Export
            </Button>
            <Button
              variant="ghost"
              size="sm"
              w="28px"
              h="28px"
              p={0}
              onClick={onClose}
            >
              <X size={16} color="#9CA3AF" />
            </Button>
          </Flex>
        </Box>

        <Box p={4}>
          <Flex gap={3} mb={4}>
            {[
              {
                label: 'Recipients',
                value: campaign.recipients.toLocaleString(),
                icon: Users,
              },
              {
                label: 'Delivered',
                value: `${((campaign.delivered / campaign.recipients) * 100).toFixed(1)}%`,
                icon: CheckCheck,
              },
              {
                label: 'Read Rate',
                value: `${((campaign.read / campaign.delivered) * 100).toFixed(1)}%`,
                icon: Eye,
              },
              {
                label: 'Response',
                value: `${((campaign.replied / campaign.read) * 100).toFixed(1)}%`,
                icon: MessageSquare,
              },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <Box
                  key={stat.label}
                  bg="gray.50"
                  borderRadius="lg"
                  p={3}
                  borderWidth={1}
                  borderColor="gray.200"
                  flex={1}
                >
                  <Icon
                    size={16}
                    color="#2563EB"
                    style={{ marginBottom: '8px' }}
                  />
                  <Text fontSize="lg" color="gray.900" mb={0.5}>
                    {stat.value}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {stat.label}
                  </Text>
                </Box>
              )
            })}
          </Flex>

          <Box
            bg="white"
            borderWidth={1}
            borderColor="gray.200"
            borderRadius="lg"
            p={4}
            mb={4}
          >
            <Text fontSize="sm" color="gray.900" fontWeight="medium" mb={3}>
              Conversion Funnel
            </Text>
            <Box>
              {[
                { label: 'Sent', value: campaign.recipients, percent: 100 },
                {
                  label: 'Delivered',
                  value: campaign.delivered,
                  percent: (campaign.delivered / campaign.recipients) * 100,
                },
                {
                  label: 'Read',
                  value: campaign.read,
                  percent: (campaign.read / campaign.recipients) * 100,
                },
                {
                  label: 'Replied',
                  value: campaign.replied,
                  percent: (campaign.replied / campaign.recipients) * 100,
                },
              ].map((stage, idx) => {
                const colors = [
                  'blue.500',
                  'green.500',
                  'purple.500',
                  'orange.500',
                ]
                return (
                  <Box key={stage.label} mb={2}>
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      mb={1}
                    >
                      <Text fontSize="xs" color="gray.700">
                        {stage.label}
                      </Text>
                      <Text fontSize="xs" color="gray.900">
                        {stage.value} ({stage.percent.toFixed(1)}%)
                      </Text>
                    </Flex>
                    <Box
                      h="8px"
                      bg="gray.100"
                      borderRadius="full"
                      overflow="hidden"
                    >
                      <Box
                        h="100%"
                        bg={colors[idx]}
                        style={{ width: `${stage.percent}%` }}
                      />
                    </Box>
                  </Box>
                )
              })}
            </Box>
          </Box>

          <Box
            bg="white"
            borderWidth={1}
            borderColor="gray.200"
            borderRadius="lg"
            p={4}
          >
            <Text fontSize="sm" color="gray.900" fontWeight="medium" mb={3}>
              Performance Over Time
            </Text>
            <Box
              h="192px"
              bg="gray.50"
              borderRadius="lg"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderWidth={1}
              borderColor="gray.200"
            >
              <Text fontSize="xs" color="gray.500">
                Chart visualization
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
