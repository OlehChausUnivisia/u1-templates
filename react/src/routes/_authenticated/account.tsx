import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '#/auth/auth-context'

export const Route = createFileRoute('/_authenticated/account')({
  component: AccountComponent,
})

function AccountComponent() {
  const { user, logout } = useAuth()

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Account</h1>
      <p className="mt-4 text-lg">{user?.username}</p>
      <button
        type="button"
        onClick={() => logout()}
        className="mt-4 rounded bg-gray-900 px-4 py-2 text-white"
      >
        Sign out
      </button>
    </div>
  )
}
