import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AuthGuard } from '@/middlewares/auth.middleware'
import { DashboardLayout } from '@/components/DashboardLayout'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <AuthGuard requireAuth={true}>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </AuthGuard>
  )
}
