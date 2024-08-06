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

  try {
    jwt.verify(token as string, process.env.JWT_SECRET)
  } catch (error) {
    return reply.status(401).send({ error: 'Token inválido ou expirado.' })
  }

  const userObject = request.body as UserObjectProps
  required(userObject.id, 'id do usuário')
  try {
    await knex('users').where({ id: userObject.id }).update({
      name: userObject.name,
      office: userObject.office,
      image: userObject.image,
    })

    const result = await knex('users').where({ id: userObject.id }).first()

    const newUser = {
      ...result,
      image: (result.image = Buffer.from(result.image).toString()),
    }

    return reply.status(201).send({
      message: 'Usuário atualizado com sucesso!',
      user: newUser,
    })
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error)
    return reply.status(500).send({ error: 'Erro ao atualizar usuário.' })
  }
}
