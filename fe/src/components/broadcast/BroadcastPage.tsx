import { Box, Flex, Button } from '@chakra-ui/react'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { BroadcastView } from './BroadcastView'
import { ScheduledView } from './ScheduledView'
import { TemplatesView } from './TemplatesView'
import { QuickReplyView } from './QuickReplyView'
import { NewCampaignModalEnhanced } from './modals/NewCampaignModalEnhanced'
import { NewTemplateModalEnhanced } from './modals/NewTemplateModalEnhanced'
import { CampaignAnalyticsModal } from './modals/CampaignAnalyticsModal'
import { TemplateDetailModal } from './modals/TemplateDetailModal'
import type { BroadcastCampaign, Template } from './types'

export const BroadcastPage = () => {
  const [activeTab, setActiveTab] = useState<
    'broadcast' | 'scheduled' | 'templates' | 'quick-reply'
  >('broadcast')
  const [showNewCampaign, setShowNewCampaign] = useState(false)
  const [showNewTemplate, setShowNewTemplate] = useState(false)
  const [selectedCampaign, setSelectedCampaign] =
    useState<BroadcastCampaign | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  )

  return (
    <Box h="100%" display="flex" flexDirection="column" bg="white">
      <Box
        h="48px"
        px={4}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        bg="white"
        borderBottomWidth={1}
        borderColor="gray.200"
      >
        <Flex alignItems="center" gap={6}>
          <Flex gap={1}>
            {[
              { id: 'broadcast', label: 'Broadcast' },
              { id: 'scheduled', label: 'Scheduled' },
              { id: 'templates', label: 'Templates' },
              { id: 'quick-reply', label: 'Quick Reply' },
            ].map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                px={3}
                h="28px"
                fontSize="xs"
                borderRadius="md"
                bg={activeTab === tab.id ? 'blue.50' : 'transparent'}
                color={activeTab === tab.id ? 'blue.600' : 'gray.600'}
                _hover={{ bg: 'gray.50' }}
              >
                {tab.label}
              </Button>
            ))}
          </Flex>
        </Flex>

        <Flex alignItems="center" gap={2}>
          {activeTab === 'templates' && (
            <Button
              size="sm"
              bg="blue.500"
              color="white"
              _hover={{ bg: 'blue.600' }}
              h="28px"
              px={3}
              fontSize="xs"
              display="flex"
              alignItems="center"
              gap={1.5}
              onClick={() => setShowNewTemplate(true)}
            >
              <Plus size={14} />
              New Template
            </Button>
          )}

          {(activeTab === 'broadcast' || activeTab === 'scheduled') && (
            <Button
              size="sm"
              bg="blue.500"
              color="white"
              _hover={{ bg: 'blue.600' }}
              h="28px"
              px={3}
              fontSize="xs"
              display="flex"
              alignItems="center"
              gap={1.5}
              onClick={() => setShowNewCampaign(true)}
            >
              <Plus size={14} />
              New Campaign
            </Button>
          )}
        </Flex>
      </Box>

      <Box flex={1} overflow="auto">
        {activeTab === 'broadcast' && (
          <BroadcastView onViewAnalytics={setSelectedCampaign} />
        )}
        {activeTab === 'scheduled' && <ScheduledView />}
        {activeTab === 'templates' && (
          <TemplatesView onViewTemplate={setSelectedTemplate} />
        )}
        {activeTab === 'quick-reply' && <QuickReplyView />}
      </Box>

      {showNewCampaign && (
        <NewCampaignModalEnhanced onClose={() => setShowNewCampaign(false)} />
      )}
      {showNewTemplate && (
        <NewTemplateModalEnhanced onClose={() => setShowNewTemplate(false)} />
      )}
      {selectedCampaign && (
        <CampaignAnalyticsModal
          campaign={selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
        />
      )}
      {selectedTemplate && (
        <TemplateDetailModal
          template={selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
        />
      )}
    </Box>
  )
}
