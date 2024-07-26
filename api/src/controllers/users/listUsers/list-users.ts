import { FastifyReply, FastifyRequest } from 'fastify'

export async function listUsers(request: FastifyRequest, reply: FastifyReply) {
  return reply.status(200).send({ message: 'User list' })
}
