import cors from '@fastify/cors'
import { fastify, FastifyInstance } from 'fastify'
import { authRoutes } from '../controllers/authentication/routes'
import { healthCheckRoutes } from '../controllers/healthCheck/routes'
import { postsRoutes } from '../controllers/posts/routes'
import { usersRoutes } from '../controllers/users/routes'

export const app: FastifyInstance = fastify()

app.register(cors, {
  origin: true,
})

app.register(healthCheckRoutes)

app.register(authRoutes)

app.register(usersRoutes, { prefix: '/users' })

app.register(postsRoutes, { prefix: '/posts' })
