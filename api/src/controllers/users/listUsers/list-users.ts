import { FastifyReply, FastifyRequest } from 'fastify'
import knex from '../../../config/database'
export async function listUsers(request: FastifyRequest, reply: FastifyReply) {
  const result = await knex.raw(`select * from users`)

  return reply.status(200).send(result.rows)
}
