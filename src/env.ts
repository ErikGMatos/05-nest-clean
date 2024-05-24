import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'test', 'production']).optional(),
  PORT: z.coerce.number().optional().default(3333),
  JWT_SECRET: z.string(),
  // JWT_EXPIRES_IN: z.string(),
  // REDIS_HOST: z.string(),
  // REDIS_PORT: z
  //   .string()
  //   .transform((value) => Number(value))
  //   .optional(),
  // REDIS_PASSWORD: z.string().optional(),
  // REDIS_TTL: z
  //   .string()
  //   .transform((value) => Number(value))
  //   .optional(),
  // REDIS_URL: z.string().url().optional(),
})

export type Env = z.infer<typeof envSchema>
