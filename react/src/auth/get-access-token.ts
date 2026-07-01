import { InteractionRequiredAuthError } from '@azure/msal-browser'
import { msalInstance } from './msal-instance'
import { loginRequest } from './msal-config'

export async function getAccessToken({
  scopes = loginRequest.scopes,
  forceRefresh = false,
}: { scopes?: Array<string>; forceRefresh?: boolean } = {}): Promise<string> {
  const account = msalInstance.getActiveAccount()
  if (!account) throw new Error('No active MSAL account')

  try {
    const result = await msalInstance.acquireTokenSilent({
      scopes,
      account,
      forceRefresh,
    })
    return result.accessToken
  } catch (error) {
    if (error instanceof InteractionRequiredAuthError) {
      await msalInstance.acquireTokenRedirect({ scopes, account })
    }
    throw error
  }
}
