import { Outlet, createFileRoute } from '@tanstack/react-router'
import { useAuth } from '#/auth/auth-context'
import { authReady, msalInstance } from '#/auth/msal-instance'
import type { ErrorComponentProps } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context, location }) => {
    await authReady
    if (msalInstance.getAllAccounts().length === 0) {
      await context.auth.login(location.href)
    }
  },
  pendingComponent: PendingComponent,
  component: Outlet,
  errorComponent: AuthErrorComponent,
})

function PendingComponent() {
  return <div className="p-8">Loading…</div>
}

function AuthErrorComponent({ error, reset }: ErrorComponentProps) {
  const { login } = useAuth()

  return (
    <div className="p-8">
      <p>{error.message}</p>
      <button
        type="button"
        onClick={() => {
          reset()
          login()
        }}
      >
        Retry sign-in
      </button>
    </div>
  )
}
