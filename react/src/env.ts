import { z } from 'zod'

const envSchema = z.object({
  VITE_ENTRA_CLIENT_ID: z.string().min(1, 'VITE_ENTRA_CLIENT_ID is required'),
  VITE_ENTRA_TENANT_ID: z.string().min(1, 'VITE_ENTRA_TENANT_ID is required'),
  VITE_ENTRA_REDIRECT_URI: z.string().optional(),
})

export const env = envSchema.parse(import.meta.env)
