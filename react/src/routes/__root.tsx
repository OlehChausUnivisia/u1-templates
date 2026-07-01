import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import type { ErrorComponentProps } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import type { AuthContextValue } from '#/auth/auth-context'
import TanStackQueryDevtools from '#/integrations/tanstack-query/devtools'

import '../styles.css'

export interface RouterContext {
  queryClient: QueryClient
  auth: AuthContextValue
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
})

function NotFoundComponent() {
  return (
    <div className="p-8">
      <p>Page not found.</p>
      <Link to="/">Go home</Link>
    </div>
  )
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  return (
    <div className="p-8">
      <p>{error.message}</p>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </div>
  )
}

function RootComponent() {
  return (
    <>
      <Outlet />
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
          TanStackQueryDevtools,
        ]}
      />
    </>
  )
}
