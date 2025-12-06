import { Box, Flex, Text, Heading } from '@chakra-ui/react'
import { Mail, Bot, UserPlus, Link as LinkIcon } from 'lucide-react'

interface StepCardProps {
  icon: React.ComponentType<{ size?: number; className?: string }>
  title: string
  description: string
  badge?: number
  iconColor?: string
}

const StepCard = ({
  icon: Icon,
  title,
  description,
  badge,
  iconColor = 'blue',
}: StepCardProps) => {
  const colorMap: Record<string, string> = {
    yellow: '#F59E0B',
    blue: '#3B82F6',
  }

  return (
    <Box
      p={6}
      bg="white"
      borderRadius="lg"
      borderWidth={1}
      borderColor="gray.200"
      _hover={{ borderColor: 'blue.300', boxShadow: 'md' }}
      transition="all 0.2s"
      cursor="pointer"
      position="relative"
    >
      {badge && (
        <Box
          position="absolute"
          top={4}
          right={4}
          w="24px"
          h="24px"
          borderRadius="full"
          bg="red.500"
          color="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="xs"
          fontWeight="bold"
        >
          {badge}
        </Box>
      )}
      <Box
        w="48px"
        h="48px"
        borderRadius="lg"
        bg={`${iconColor}.50`}
        display="flex"
        alignItems="center"
        justifyContent="center"
        mb={4}
        color={colorMap[iconColor] || colorMap.blue}
      >
        <Icon size={24} />
      </Box>
      <Heading size="sm" mb={2}>
        {title}
      </Heading>
      <Text fontSize="sm" color="gray.600">
        {description}
      </Text>
    </Box>
  )
}

export const ConversationContent = () => {
  return (
    <Box flex={1} p={8} overflow="auto" bg="white" minH="100%">
      <Heading size="xl" mb={8} color="gray.800" fontWeight="bold">
        Selamat datang kembali di Putri Shop!
      </Heading>

      <Flex gap={4} flexWrap="wrap" mb={8}>
        <Box flex="1" minW="280px" maxW="320px">
          <StepCard
            icon={Mail}
            title="Hubungkan Platform"
            description="Mulai terima pesan dari Whatsapp, IG, dan FB Anda!"
            badge={3}
            iconColor="yellow"
          />
        </Box>
        <Box flex="1" minW="280px" maxW="320px">
          <StepCard
            icon={Bot}
            title="Buat AI Agent"
            description="Jawab pesan masuk dengan Agent AI anda"
            iconColor="blue"
          />
        </Box>
        <Box flex="1" minW="280px" maxW="320px">
          <StepCard
            icon={UserPlus}
            title="Undang Agen Manusia"
            description="Undang tim Anda untuk membantu menjawab chat"
            iconColor="blue"
          />
        </Box>
        <Box flex="1" minW="280px" maxW="320px">
          <StepCard
            icon={LinkIcon}
            title="Konek AI Agent ke Inbox"
            description="Hubungkan AI Agent dan Human Agent ke Platform"
            iconColor="blue"
          />
        </Box>
      </Flex>

      <Box textAlign="center" mt={8}>
        <a
          href="#"
          style={{
            color: '#2563EB',
            fontSize: '14px',
            fontWeight: '500',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.textDecoration = 'underline'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.textDecoration = 'none'
          }}
        >
          Butuh bantuan lebih? Lihat Tutorial Youtube kami
        </a>
      </Box>
    </Box>
  )
}
