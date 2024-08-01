import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import knex from '../../../config/database'
import { required } from '../../../utils/validations/required'

interface UserObjectProps {
  id: number
  name: string
  office: string
  image: string
}
export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  const { token } = request.headers

  jwt.verify(token as string, process.env.JWT_SECRET)

  const userObject = request.body as UserObjectProps
  required(userObject.id, 'id do usuário')

  knex.raw(`update users 
            set "name" = '${userObject.name}', office  = '${userObject.office}', image = '${userObject.image}
            where id = ${userObject.id}
          `)

  return reply.status(201).send({
    message: 'Usuário atualizado com sucesso!',
  })
}
