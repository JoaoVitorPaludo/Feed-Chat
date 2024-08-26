import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import knex from '../../../config/database'
import { required } from '../../../utils/validations/required'

interface PostObjectProps {
  message: string
  userId: number
}
export async function createPosts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { token } = request.headers
  jwt.verify(token as string, process.env.JWT_SECRET)

  const postObject = request.body as PostObjectProps

  required(postObject.message, 'Mensagem')

  await knex.raw(`insert into posts (message, createdAt, userId)
                  values ('${postObject.message}', NOW(), ${postObject.userId})`)

  return reply.status(201).send({ message: 'Post criado com sucesso' })
}
