import { createContext, useContext, useMemo } from 'react'
import { useIsAuthenticated, useMsal } from '@azure/msal-react'
import { InteractionStatus } from '@azure/msal-browser'
import type { AccountInfo } from '@azure/msal-browser'
import type { ReactNode } from 'react'
import { loginRequest } from './msal-config'

export interface AuthContextValue {
  isAuthenticated: boolean
  isLoading: boolean
  user: AccountInfo | null
  login: (redirectTo?: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { instance, inProgress, accounts } = useMsal()
  const isAuthenticated = useIsAuthenticated()

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated,
      isLoading: inProgress !== InteractionStatus.None,
      user: accounts[0] ?? null,
      login: (redirectTo) =>
        instance.loginRedirect({
          ...loginRequest,
          redirectStartPage: redirectTo,
        }),
      logout: () => instance.logoutRedirect(),
    }),
    [instance, inProgress, isAuthenticated, accounts],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
