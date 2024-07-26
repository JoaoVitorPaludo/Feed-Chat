import bcrypt from 'bcrypt'
import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import knex from '../../../config/database'
import { required } from '../../../utils/validations/required'

interface UserObjectProps {
  username: string
  password: string
  email: string
  office?: string
  image?: string
}
export async function createUsers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { token } = request.headers
  const userObject = request.body as UserObjectProps

  required(token, 'token')
  required(userObject.username, 'username')
  required(userObject.password, 'password')
  required(userObject.email, 'email')

  jwt.verify(token as string, process.env.JWT_SECRET)

  // Verifica se já existe um usuário com este email
  const existingUser =
    await knex.raw(`select * from users u where email = '${userObject.email}';
`)

  if (existingUser.rows.length > 0) {
    throw new Error('Já existe um usuário com este email')
  }

  // Criptografando a senha do usuário
  const cryptPassword = await bcrypt.hash(userObject.password, 10)

  // Inserindo o novo usuário no banco de dados
  await knex.raw(`insert into users (name, office, email, password, image, createdAt)
                  values ('${userObject.username}', '${userObject.office}', '${userObject.email}', '${cryptPassword}', '${userObject.image || null}', NOW());`)

  return reply.status(201).send({
    message: 'Usuário criado com sucesso!',
  })
}
