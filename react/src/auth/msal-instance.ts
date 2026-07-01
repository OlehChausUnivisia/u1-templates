import { EventType, PublicClientApplication } from '@azure/msal-browser'
import type { AuthenticationResult } from '@azure/msal-browser'
import { msalConfig } from './msal-config'

export const msalInstance = new PublicClientApplication(msalConfig)

export const authReady = msalInstance.initialize().then(async () => {
  const result = await msalInstance.handleRedirectPromise()

  if (result?.account) {
    msalInstance.setActiveAccount(result.account)
  } else if (
    !msalInstance.getActiveAccount() &&
    msalInstance.getAllAccounts().length > 0
  ) {
    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0])
  }

  msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      msalInstance.setActiveAccount(
        (event.payload as AuthenticationResult).account,
      )
    }
  })
})
