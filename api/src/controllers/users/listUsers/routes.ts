import { FastifyInstance } from 'fastify'
import { listUsers } from './list-users'

export async function listUsersRoutes(app: FastifyInstance) {
  app.get('/', listUsers)
}
