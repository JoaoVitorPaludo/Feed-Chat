import { FastifyInstance } from 'fastify'
import { createUsers } from './createUsers/create-users'
import { listUsers } from './listUsers/list-users'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/', listUsers)
  app.post('/create', createUsers)
}
