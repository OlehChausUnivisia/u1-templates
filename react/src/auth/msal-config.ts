import { LogLevel } from '@azure/msal-browser'
import type { Configuration } from '@azure/msal-browser'
import { env } from '#/env'

const redirectUri = env.VITE_ENTRA_REDIRECT_URI ?? window.location.origin

export const msalConfig: Configuration = {
  auth: {
    clientId: env.VITE_ENTRA_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${env.VITE_ENTRA_TENANT_ID}`,
    redirectUri,
    postLogoutRedirectUri: redirectUri,
  },
  cache: {
    cacheLocation: 'sessionStorage',
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return
        if (import.meta.env.DEV && level <= LogLevel.Warning)
          console.log(message)
      },
    },
  },
}

export const loginRequest = {
  scopes: ['User.Read'],
}
