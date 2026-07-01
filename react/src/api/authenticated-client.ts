import ky from 'ky'
import { getAccessToken } from '#/auth/get-access-token'

export const authenticatedClient = ky.create({
  retry: {
    limit: 1,
    statusCodes: [401],
  },
  hooks: {
    beforeRequest: [
      async ({ request }) => {
        const token = await getAccessToken()
        request.headers.set('Authorization', `Bearer ${token}`)
      },
    ],
    beforeRetry: [
      async ({ request }) => {
        const token = await getAccessToken({ forceRefresh: true })
        request.headers.set('Authorization', `Bearer ${token}`)
      },
    ],
  },
})
