import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex, Heading, Button, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { BroadcastTemplateForm } from '@/components/BroadcastTemplateForm'
import { BroadcastSender } from '@/components/BroadcastSender'
import { Plus } from 'lucide-react'

export const Route = createFileRoute('/dashboard/broadcast')({
  component: BroadcastPage,
})

function BroadcastPage() {
  const [showTemplateForm, setShowTemplateForm] = useState(false)
  const [activeTab, setActiveTab] = useState<
    'templates' | 'send' | 'scheduled' | 'analytics'
  >('templates')
  interface BroadcastTemplate {
    id: string
    name: string
    type: 'utility' | 'marketing'
    contentType: 'text' | 'button' | 'image'
    message: string
    variables?: Array<{ id: string; name: string; value: string }>
  }

  const [templates, setTemplates] = useState<BroadcastTemplate[]>([])

  const handleSaveTemplate = (template: Omit<BroadcastTemplate, 'id'>) => {
    setTemplates([...templates, { ...template, id: Date.now().toString() }])
    setShowTemplateForm(false)
  }

  const handleSendBroadcast = (_data: unknown) => {
    // TODO: Implement broadcast sending logic
  }

  const tabs = [
    { id: 'templates', label: 'Templates' },
    { id: 'send', label: 'Send Broadcast' },
    { id: 'scheduled', label: 'Scheduled' },
    { id: 'analytics', label: 'Analytics' },
  ]

  return (
    <Box p={6}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading size="lg">Broadcast</Heading>
        {!showTemplateForm && (
          <Button
            colorScheme="blue"
            onClick={() => setShowTemplateForm(true)}
            display="flex"
            alignItems="center"
            gap={2}
          >
            <Plus size={18} />
            Create Template
          </Button>
        )}
      </Flex>

      {showTemplateForm ? (
        <BroadcastTemplateForm
          onSave={handleSaveTemplate}
          onCancel={() => setShowTemplateForm(false)}
        />
      ) : (
        <Box>
          <Flex borderBottomWidth={1} borderColor="gray.200" mb={4}>
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
                  setActiveTab(
                    tab.id as 'templates' | 'send' | 'scheduled' | 'analytics',
                  )
                }
              >
                {tab.label}
              </Box>
            ))}
          </Flex>

          {activeTab === 'templates' && (
            <Box>
              {templates.length === 0 ? (
                <Box textAlign="center" py={12}>
                  <Text color="gray.600" mb={4}>
                    No templates yet. Create your first template!
                  </Text>
                  <Button
                    colorScheme="blue"
                    onClick={() => setShowTemplateForm(true)}
                    display="flex"
                    alignItems="center"
                    gap={2}
                    mx="auto"
                  >
                    <Plus size={18} />
                    Create Template
                  </Button>
                </Box>
              ) : (
                <Flex flexWrap="wrap" gap={4}>
                  {templates.map((template) => (
                    <Box
                      key={template.id}
                      p={4}
                      bg="white"
                      borderRadius="lg"
                      borderWidth={1}
                      borderColor="gray.200"
                      minW="250px"
                    >
                      <Text fontWeight="bold" mb={2}>
                        {template.name}
                      </Text>
                      <Text fontSize="sm" color="gray.600" mb={2}>
                        Type: {template.type}
                      </Text>
                      <Text fontSize="sm" color="gray.600" mb={2}>
                        Content: {template.contentType}
                      </Text>
                      <Text
                        fontSize="xs"
                        color="gray.500"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        display="-webkit-box"
                        style={{
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {template.message}
                      </Text>
                    </Box>
                  ))}
                </Flex>
              )}
            </Box>
          )}

          {activeTab === 'send' && (
            <BroadcastSender
              templates={templates}
              onSend={handleSendBroadcast}
            />
          )}

          {activeTab === 'scheduled' && (
            <Box textAlign="center" py={12}>
              <Text color="gray.600">
                Scheduled broadcasts will appear here
              </Text>
            </Box>
          )}

          {activeTab === 'analytics' && (
            <Box textAlign="center" py={12}>
              <Text color="gray.600">Broadcast analytics will appear here</Text>
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}
