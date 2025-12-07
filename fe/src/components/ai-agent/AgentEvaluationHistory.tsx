import { Box, Flex, Text, Badge } from '@chakra-ui/react'
import { Edit2, Trash2, Calendar, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import type { Evaluation } from './types'

interface AgentEvaluationHistoryProps {
  agentName: string
}

const mockEvaluations: Evaluation[] = [
  {
    id: 1,
    date: '2024-12-06 14:30',
    userMessage: 'Bagaimana cara upgrade paket saya?',
    originalAI: 'Anda bisa upgrade paket melalui menu settings.',
    correctedAI:
      'Untuk upgrade paket, silakan masuk ke Dashboard > Settings > Subscription, lalu pilih paket yang diinginkan. Tim support kami juga siap membantu via chat.',
    status: 'applied',
  },
  {
    id: 2,
    date: '2024-12-05 11:20',
    userMessage: 'Apakah ada diskon untuk annual subscription?',
    originalAI: 'Ya, tersedia diskon.',
    correctedAI:
      'Ya! Untuk annual subscription kami memberikan diskon hingga 20%. Anda juga bisa mendapatkan tambahan diskon 10% jika mendaftar sebagai early adopter. Hubungi tim sales kami untuk penawaran khusus.',
    status: 'applied',
  },
  {
    id: 3,
    date: '2024-12-04 09:15',
    userMessage: 'Berapa lama proses verifikasi akun?',
    originalAI: 'Proses verifikasi memakan waktu beberapa hari.',
    correctedAI:
      'Proses verifikasi akun biasanya selesai dalam 1-2 jam kerja. Jika lebih dari 24 jam, silakan hubungi support@company.com atau chat dengan tim kami.',
    status: 'applied',
  },
]

export const AgentEvaluationHistory = ({
  agentName,
}: AgentEvaluationHistoryProps) => {
  const [evaluations, setEvaluations] = useState<Evaluation[]>(mockEvaluations)

  const handleDelete = (id: number) => {
    setEvaluations(evaluations.filter((e) => e.id !== id))
  }

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Box
        bg="blue.50"
        borderWidth={1}
        borderColor="blue.200"
        borderRadius="lg"
        p={3}
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
            <Edit2 size={20} color="#2563EB" />
          </Box>
          <Box>
            <Text fontSize="sm" color="blue.900" fontWeight="medium" mb={1}>
              Evaluation History
            </Text>
            <Text fontSize="xs" color="blue.700">
              Riwayat evaluasi dan koreksi terhadap jawaban AI {agentName}. AI
              akan belajar dari setiap koreksi yang disimpan.
            </Text>
          </Box>
        </Flex>
      </Box>

      <Flex gap={3}>
        {[
          {
            label: 'Total Evaluations',
            value: evaluations.length,
            icon: Edit2,
          },
          {
            label: 'Applied',
            value: evaluations.filter((e) => e.status === 'applied').length,
            icon: CheckCircle,
          },
          {
            label: 'This Week',
            value: '12',
            icon: Calendar,
          },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <Box
              key={stat.label}
              bg="white"
              borderRadius="lg"
              p={3}
              borderWidth={1}
              borderColor="gray.200"
              flex={1}
            >
              <Icon size={16} color="#2563EB" style={{ marginBottom: '8px' }} />
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
        overflow="hidden"
      >
        <Box p={3} borderBottomWidth={1} borderColor="gray.200">
          <Text fontSize="sm" color="gray.900" fontWeight="medium">
            Evaluation History ({evaluations.length})
          </Text>
        </Box>

        {evaluations.length === 0 ? (
          <Box p={8} textAlign="center">
            <Edit2 size={40} color="#D1D5DB" style={{ margin: '0 auto 8px' }} />
            <Text fontSize="xs" color="gray.500">
              No evaluations yet
            </Text>
          </Box>
        ) : (
          <Box as="table" w="100%">
            <Box as="thead" bg="gray.50">
              <Box as="tr">
                <Box
                  as="th"
                  px={3}
                  py={2}
                  textAlign="left"
                  fontSize="xs"
                  color="gray.600"
                >
                  Date
                </Box>
                <Box
                  as="th"
                  px={3}
                  py={2}
                  textAlign="left"
                  fontSize="xs"
                  color="gray.600"
                >
                  Context
                </Box>
                <Box
                  as="th"
                  px={3}
                  py={2}
                  textAlign="left"
                  fontSize="xs"
                  color="gray.600"
                >
                  Original Response
                </Box>
                <Box
                  as="th"
                  px={3}
                  py={2}
                  textAlign="left"
                  fontSize="xs"
                  color="gray.600"
                >
                  Corrected Response
                </Box>
                <Box
                  as="th"
                  px={3}
                  py={2}
                  textAlign="left"
                  fontSize="xs"
                  color="gray.600"
                >
                  Status
                </Box>
                <Box
                  as="th"
                  px={3}
                  py={2}
                  textAlign="right"
                  fontSize="xs"
                  color="gray.600"
                >
                  Actions
                </Box>
              </Box>
            </Box>
            <Box as="tbody">
              {evaluations.map((evaluation) => (
                <Box
                  as="tr"
                  key={evaluation.id}
                  _hover={{ bg: 'gray.50' }}
                  borderBottomWidth={1}
                  borderColor="gray.100"
                >
                  <Box
                    as="td"
                    px={3}
                    py={2}
                    fontSize="xs"
                    color="gray.600"
                    whiteSpace="nowrap"
                  >
                    {evaluation.date}
                  </Box>
                  <Box
                    as="td"
                    px={3}
                    py={2}
                    fontSize="xs"
                    color="gray.900"
                    maxW="xs"
                  >
                    <Text
                      overflow="hidden"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                      title={evaluation.userMessage}
                    >
                      {evaluation.userMessage}
                    </Text>
                  </Box>
                  <Box
                    as="td"
                    px={3}
                    py={2}
                    fontSize="xs"
                    color="gray.600"
                    maxW="xs"
                  >
                    <Text
                      overflow="hidden"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                      title={evaluation.originalAI}
                    >
                      {evaluation.originalAI}
                    </Text>
                  </Box>
                  <Box
                    as="td"
                    px={3}
                    py={2}
                    fontSize="xs"
                    color="gray.900"
                    maxW="xs"
                  >
                    <Text
                      overflow="hidden"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                      title={evaluation.correctedAI}
                    >
                      {evaluation.correctedAI}
                    </Text>
                  </Box>
                  <Box as="td" px={3} py={2}>
                    <Badge
                      h="20px"
                      px={2}
                      fontSize="xs"
                      borderRadius="sm"
                      borderWidth={0}
                      bg={
                        evaluation.status === 'applied'
                          ? 'green.100'
                          : 'yellow.100'
                      }
                      color={
                        evaluation.status === 'applied'
                          ? 'green.700'
                          : 'yellow.700'
                      }
                    >
                      {evaluation.status}
                    </Badge>
                  </Box>
                  <Box as="td" px={3} py={2}>
                    <Flex alignItems="center" justifyContent="flex-end" gap={1}>
                      <Box
                        as="button"
                        w={7}
                        h={7}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        _hover={{ bg: 'gray.100' }}
                        borderRadius="md"
                        transition="all 0.2s"
                        title="Edit"
                      >
                        <Edit2 size={14} color="#6B7280" />
                      </Box>
                      <Box
                        as="button"
                        w={7}
                        h={7}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        _hover={{ bg: 'red.50' }}
                        borderRadius="md"
                        transition="all 0.2s"
                        onClick={() => handleDelete(evaluation.id)}
                        title="Delete"
                      >
                        <Trash2 size={14} color="#DC2626" />
                      </Box>
                    </Flex>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}
