import { createFileRoute } from '@tanstack/react-router'
import { Box, Heading } from '@chakra-ui/react'
import { AuthGuard } from '@/middlewares/auth.middleware'

export const Route = createFileRoute('/admin' as any)({
  component: AdminPage,
})

function AdminPage() {
  return (
    <AuthGuard requireAuth={true} requireRoles={['ADMIN']}>
      <Box p={8}>
        <Heading size="lg">Admin Panel</Heading>
        <p>This page is only accessible to admins.</p>
      </Box>
    </AuthGuard>
  )
}
