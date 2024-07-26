import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import knex from '../../../config/database'

export async function listUsers(request: FastifyRequest, reply: FastifyReply) {
  const { token } = request.headers

  jwt.verify(token as string, process.env.JWT_SECRET)

  const result = await knex.raw(`select * from users`)

  return reply.status(200).send(result.rows)
}
