import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/store/authStore'

interface AuthGuardProps {
  children: ReactNode
  requireAuth?: boolean
  requireRoles?: string[]
}

export const AuthGuard = ({
  children,
  requireAuth = false,
  requireRoles = [],
}: AuthGuardProps) => {
  const { isAuthenticated, user } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      navigate({ to: '/login' as any })
      return
    }

    if (
      requireAuth &&
      requireRoles.length > 0 &&
      user &&
      !requireRoles.includes(user.role)
    ) {
      navigate({ to: '/login' as any })
      return
    }
  }, [requireAuth, isAuthenticated, requireRoles, user, navigate])

  if (requireAuth && !isAuthenticated) {
    return null
  }

  if (
    requireAuth &&
    requireRoles.length > 0 &&
    user &&
    !requireRoles.includes(user.role)
  ) {
    return null
  }

  return <>{children}</>
}
