import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import knex from '../../../config/database'
import { required } from '../../../utils/validations/required'
interface loginDataProps {
  email: string
  password: string
}
export async function loginApplication(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const loginData = request.body as loginDataProps

  required(loginData.email, 'email')
  required(loginData.password, 'password')

  const user =
    await knex.raw(`select * from users where email = '${loginData.email}' 
  `)

  if (user.rows.length === 0) {
    throw new Error('Email ou senha incorretos')
  }

  // Verifica se a senha está correta
  if (user.rows[0].password !== loginData.password) {
    throw new Error('Email ou senha incorretos')
  }

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET not defined')
  }
  const token = jwt.sign(
    {
      id: user.rows[0].id,
      nome: user.rows[0].nome,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    },
  )

  return reply.send({
    token,
  })
}
