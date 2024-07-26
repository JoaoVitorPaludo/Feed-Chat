import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  DATABASE_CLIENT: z.enum(['oracledb', 'pg']).default('oracledb'),
  ORACLE_DIR: z.string().nullable(),
  DB_CONNECTION_STRING: z.string().nullable(),
  DB_PASSWORD: z.string().nullable(),
  DB_USER: z.string().nullable(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables')
}

export const env = _env.data
