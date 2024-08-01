import { FastifyInstance } from 'fastify'
import { createUsers } from './createUsers/create-users'
import { findUsers } from './listUsers/find-users'
import { listUsers } from './listUsers/list-users'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/', listUsers)
  app.get('/findById', findUsers)
  app.post('/create', createUsers)
}
