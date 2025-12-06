import { createFileRoute } from '@tanstack/react-router'
import { Box, Heading } from '@chakra-ui/react'
import { AuthGuard } from '@/middlewares/auth.middleware'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <AuthGuard requireAuth={false}>
      <Box p={8}>
        <Heading size="lg">Welcome to Omnichannel WA</Heading>
      </Box>
    </AuthGuard>
  )
}
