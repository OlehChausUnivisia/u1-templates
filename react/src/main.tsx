import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { MsalProvider } from '@azure/msal-react'
import { getRouter } from './router'
import { authReady, msalInstance } from './auth/msal-instance'
import { AuthProvider, useAuth } from './auth/auth-context'
import TanstackQueryProvider from './integrations/tanstack-query/root-provider'

const router = getRouter()

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  const auth = useAuth()
  return <RouterProvider router={router} context={{ auth }} />
}

authReady.then(() => {
  const rootElement = document.getElementById('app')!

  if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
      <MsalProvider instance={msalInstance}>
        <AuthProvider>
          <TanstackQueryProvider>
            <App />
          </TanstackQueryProvider>
        </AuthProvider>
      </MsalProvider>,
    )
  }
})
