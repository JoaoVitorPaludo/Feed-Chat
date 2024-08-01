import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import knex from '../../../config/database'

interface PostsObjectProps {
  id: number
  message: string
  createdat: string
  userId: number
}
export async function listPosts(request: FastifyRequest, reply: FastifyReply) {
  const { token } = request.headers

  jwt.verify(token as string, process.env.JWT_SECRET)

  const posts = await knex.raw(`select * from posts`)

  if (posts.rows.length === 0) {
    return reply.status(500).send({ message: 'Nenhum Post cadastrado' })
  }

  const sendObject = await Promise.all(
    posts.rows.map(async (post: PostsObjectProps) => {
      const user = await knex.raw(`SELECT * FROM users WHERE id = ${post.id}`)

      return {
        id: post.id,
        message: post.message,
        createdat: post.createdat,
        user: user.rows[0],
      }
    }),
  )
  return reply.status(200).send(sendObject)
}
