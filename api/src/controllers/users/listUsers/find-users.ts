import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import knex from '../../../config/database'

export async function findUsers(request: FastifyRequest, reply: FastifyReply) {
  const { token, id } = request.headers

  jwt.verify(token as string, process.env.JWT_SECRET)

  const result = await knex.raw(`select * from users where id = ${id}`)

  const users = result.rows.map((user) => {
    if (user.image) {
      // Converte a imagem para um formato apropriado
      user.image = Buffer.from(user.image).toString()
    } else {
      // Se a imagem for NULL, retorna NULL
      user.image = null
    }
    return user
  })

  return reply.status(200).send(users[0])
}
