import { Box, Flex, Button, Text } from '@chakra-ui/react'
import { UserCheck, Info, Sparkles } from 'lucide-react'

interface ChatActionsProps {
  isAIHandled: boolean
  isTakenOver: boolean
  onTakeOver?: () => void
}

export const ChatActions = ({
  isAIHandled,
  isTakenOver,
  onTakeOver,
}: ChatActionsProps) => {
  if (isTakenOver || !isAIHandled || !onTakeOver) return null

  return (
    <Box
      px={4}
      py={3}
      borderTopWidth={1}
      borderBottomWidth={1}
      borderColor="blue.200"
      bg="gradient-to-r"
      bgGradient="linear(to-r, blue.50, purple.50)"
      flexShrink={0}
    >
      <Flex alignItems="start" gap={3}>
        <Box
          w={10}
          h={10}
          bg="white"
          borderRadius="lg"
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="sm"
          flexShrink={0}
        >
          <Sparkles size={20} color="#9333EA" />
        </Box>
        <Box flex={1}>
          <Flex alignItems="center" gap={2} mb={1}>
            <Text fontSize="sm" fontWeight="semibold" color="gray.900">
              AI is handling this conversation
            </Text>
            <Box
              px={2}
              py={0.5}
              borderRadius="sm"
              bg="purple.100"
              color="purple.700"
              fontSize="xs"
              fontWeight="medium"
            >
              Active
            </Box>
          </Flex>
          <Text fontSize="xs" color="gray.600" mb={3} lineHeight="1.4">
            Take over to provide personalized support. AI will stop responding
            once you take control.
          </Text>
          <Button
            size="sm"
            h={8}
            px={4}
            bg="blue.500"
            color="white"
            _hover={{
              bg: 'blue.600',
              transform: 'translateY(-1px)',
              boxShadow: 'md',
            }}
            _active={{
              transform: 'translateY(0)',
            }}
            fontSize="xs"
            fontWeight="medium"
            onClick={onTakeOver}
            transition="all 0.2s"
            boxShadow="sm"
            display="flex"
            alignItems="center"
            gap={1.5}
          >
            <UserCheck size={14} />
            Take Over Conversation
          </Button>
        </Box>
        <Box
          as="button"
          w={5}
          h={5}
          display="flex"
          alignItems="center"
          justifyContent="center"
          _hover={{ bg: 'white', borderRadius: 'md' }}
          transition="all 0.2s"
          title="Learn more about Take Over"
        >
          <Info size={14} color="#6B7280" />
        </Box>
      </Flex>
    </Box>
  )
}
