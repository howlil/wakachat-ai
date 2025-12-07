import { Box, Text, Badge, Flex } from '@chakra-ui/react'
import { Bot } from 'lucide-react'
import type { AIAgent } from './types'

interface AgentListProps {
  agents: AIAgent[]
  selectedAgent: AIAgent | null
  onSelect: (agent: AIAgent) => void
}

export const AgentList = ({
  agents,
  selectedAgent,
  onSelect,
}: AgentListProps) => {
  return (
    <>
      {agents.map((agent) => {
        const isSelected = selectedAgent?.id === agent.id
        return (
          <Box
            key={agent.id}
            as="button"
            w="100%"
            p={3}
            borderBottomWidth={1}
            borderColor="gray.100"
            _hover={{ bg: 'gray.50' }}
            textAlign="left"
            bg={isSelected ? 'blue.50' : 'white'}
            borderLeftWidth={isSelected ? 2 : 0}
            borderLeftColor={isSelected ? 'blue.500' : 'transparent'}
            onClick={() => onSelect(agent)}
          >
            <Flex alignItems="start" gap={2} mb={2}>
              <Box
                w="32px"
                h="32px"
                bg="purple.100"
                borderRadius="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                <Bot size={16} color="#9333EA" />
              </Box>
              <Box flex={1} minW={0}>
                <Flex alignItems="center" gap={2} mb={0.5}>
                  <Text
                    fontSize="xs"
                    color="gray.900"
                    fontWeight="medium"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                  >
                    {agent.name}
                  </Text>
                  <Badge
                    h="16px"
                    px={1.5}
                    fontSize="xs"
                    borderRadius="sm"
                    borderWidth={0}
                    bg={agent.status === 'active' ? 'green.100' : 'gray.100'}
                    color={agent.status === 'active' ? 'green.700' : 'gray.600'}
                  >
                    {agent.status}
                  </Badge>
                </Flex>
                <Text
                  fontSize="xs"
                  color="gray.500"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  {agent.description}
                </Text>
              </Box>
            </Flex>

            <Flex gap={1}>
              {[
                { label: 'Conv.', value: agent.conversations },
                { label: 'Sat.', value: `${agent.satisfactionRate}%` },
                { label: 'KB', value: agent.knowledgeBaseSize },
              ].map((stat) => (
                <Box
                  key={stat.label}
                  bg="white"
                  borderRadius="sm"
                  p={1.5}
                  borderWidth={1}
                  borderColor="gray.200"
                  flex={1}
                >
                  <Text fontSize="xs" color="gray.500">
                    {stat.label}
                  </Text>
                  <Text fontSize="xs" color="gray.900">
                    {stat.value}
                  </Text>
                </Box>
              ))}
            </Flex>
          </Box>
        )
      })}
    </>
  )
}
