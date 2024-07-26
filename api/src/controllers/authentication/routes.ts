import { FastifyInstance } from 'fastify'
import { loginApplication } from './login/login-application'

export async function authRoutes(app: FastifyInstance) {
  app.post('/login', loginApplication)
}
