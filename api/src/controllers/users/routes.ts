import { FastifyInstance } from 'fastify'
import { loginApplication } from '../authentication/login/login-application'
import { listUsers } from './listUsers/list-users'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/', listUsers)
  app.post('/create', loginApplication)
}
