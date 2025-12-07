import { Box, Flex, Text, Button, Badge } from '@chakra-ui/react'
import { Calendar, Clock, Users, Edit, Pause } from 'lucide-react'
import type { BroadcastCampaign } from './types'

const mockScheduledCampaigns: BroadcastCampaign[] = [
  {
    id: 101,
    name: 'Weekend Flash Sale',
    template: {
      id: 5,
      name: 'weekend_sale',
      type: 'marketing',
      messageType: 'image_with_button',
      content: 'Halo {{name}}! Weekend sale dimulai! 🎉',
      language: 'id',
      status: 'approved',
      createdAt: '2024-12-05',
    },
    status: 'scheduled',
    scheduledAt: '2024-12-07 08:00',
    recipients: 3200,
    delivered: 0,
    read: 0,
    replied: 0,
    failed: 0,
  },
  {
    id: 102,
    name: 'New Product Announcement',
    template: {
      id: 6,
      name: 'new_product',
      type: 'marketing',
      messageType: 'text_with_button',
      content: 'Hi {{name}}, produk baru telah tersedia!',
      language: 'id',
      status: 'approved',
      createdAt: '2024-12-04',
    },
    status: 'scheduled',
    scheduledAt: '2024-12-08 10:00',
    recipients: 1850,
    delivered: 0,
    read: 0,
    replied: 0,
    failed: 0,
  },
  {
    id: 103,
    name: 'Holiday Greetings',
    template: {
      id: 7,
      name: 'holiday_greet',
      type: 'utility',
      messageType: 'text',
      content: 'Selamat Hari Raya {{name}}! 🌙✨',
      language: 'id',
      status: 'approved',
      createdAt: '2024-12-03',
    },
    status: 'scheduled',
    scheduledAt: '2024-12-10 06:00',
    recipients: 5600,
    delivered: 0,
    read: 0,
    replied: 0,
    failed: 0,
  },
]

export const ScheduledView = () => {
  return (
    <Box p={4}>
      <Box>
        <Box
          bg="blue.50"
          borderWidth={1}
          borderColor="blue.200"
          borderRadius="lg"
          p={3}
          mb={3}
        >
          <Flex alignItems="start" gap={3}>
            <Box
              w="40px"
              h="40px"
              bg="blue.100"
              borderRadius="lg"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Calendar size={20} color="#2563EB" />
            </Box>
            <Box>
              <Text fontSize="sm" color="blue.900" fontWeight="medium" mb={1}>
                Schedule Campaigns
              </Text>
              <Text fontSize="xs" color="blue.700">
                Plan and schedule your campaigns to be sent at optimal times.
                You have {mockScheduledCampaigns.length} campaigns scheduled.
              </Text>
            </Box>
          </Flex>
        </Box>

        <Box
          bg="white"
          borderRadius="lg"
          borderWidth={1}
          borderColor="gray.200"
        >
          <Box p={3} borderBottomWidth={1} borderColor="gray.200">
            <Text fontSize="sm" color="gray.900" fontWeight="medium">
              Upcoming Campaigns
            </Text>
          </Box>
          <Box>
            {mockScheduledCampaigns.map((campaign) => (
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
                        bg="purple.100"
                        color="purple.700"
                        display="flex"
                        alignItems="center"
                        gap={1}
                      >
                        <Clock size={12} />
                        Scheduled
                      </Badge>
                    </Flex>
                    <Flex
                      alignItems="center"
                      gap={3}
                      fontSize="xs"
                      color="gray.500"
                    >
                      <Flex alignItems="center" gap={1}>
                        <Calendar size={12} />
                        {campaign.scheduledAt}
                      </Flex>
                      <Text>•</Text>
                      <Flex alignItems="center" gap={1}>
                        <Users size={12} />
                        {campaign.recipients.toLocaleString()} recipients
                      </Flex>
                    </Flex>
                  </Box>
                  <Flex gap={1}>
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
                      <Edit size={12} />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      borderColor="orange.300"
                      bg="orange.50"
                      color="orange.700"
                      _hover={{ bg: 'orange.100' }}
                      h="28px"
                      px={3}
                      fontSize="xs"
                      display="flex"
                      alignItems="center"
                      gap={1}
                    >
                      <Pause size={12} />
                      Cancel
                    </Button>
                  </Flex>
                </Flex>

                <Box
                  bg="gray.50"
                  borderRadius="md"
                  p={2}
                  borderWidth={1}
                  borderColor="gray.200"
                >
                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    mb={1}
                  >
                    <Text fontSize="xs" color="gray.600">
                      Template: {campaign.template.name}
                    </Text>
                    <Badge
                      h="20px"
                      px={2}
                      fontSize="xs"
                      borderRadius="sm"
                      borderWidth={0}
                      bg={
                        campaign.template.type === 'marketing'
                          ? 'blue.100'
                          : 'green.100'
                      }
                      color={
                        campaign.template.type === 'marketing'
                          ? 'blue.700'
                          : 'green.700'
                      }
                    >
                      {campaign.template.type}
                    </Badge>
                  </Flex>
                  <Text fontSize="xs" color="gray.700">
                    {campaign.template.content}
                  </Text>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
