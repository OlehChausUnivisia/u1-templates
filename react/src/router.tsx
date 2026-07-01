import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

import { getContext } from './integrations/tanstack-query/root-provider'
import type { AuthContextValue } from './auth/auth-context'

export function getRouter() {
  const context = getContext()
  const auth: AuthContextValue = undefined!

  const router = createTanStackRouter({
    routeTree,
    context: { ...context, auth },
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
  })

  return router
}
