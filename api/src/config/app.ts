import cors from '@fastify/cors'
import { FastifyInstance, fastify } from 'fastify'
import { healthCheckRoutes } from '../controllers/healthCheck/routes'
import { usersRoutes } from '../controllers/users/routes'

export const app: FastifyInstance = fastify()

app.register(cors, {
  origin: true,
})

app.register(healthCheckRoutes)

app.register(usersRoutes, { prefix: '/users' })
