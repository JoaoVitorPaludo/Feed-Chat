import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import knex from '../../../config/database'

interface PostsObjectProps {
  id: number
  message: string
  createdat: string
  userid: number
}
export async function listPosts(request: FastifyRequest, reply: FastifyReply) {
  const { token } = request.headers

  jwt.verify(token as string, process.env.JWT_SECRET)

  const posts = await knex.raw(`select * from posts order by id desc`)

  if (posts.rows.length === 0) {
    return reply.status(500).send({ message: 'Nenhum Post cadastrado' })
  }

  const sendObject = await Promise.all(
    posts.rows.map(async (post: PostsObjectProps) => {
      const user = await knex.raw(
        `SELECT * FROM users WHERE id = ${post.userid}`,
      )
      const comments = await knex.raw(
        `SELECT * FROM comments WHERE postId = ${post.id}`,
      )
      console.log(comments.rows)
      return {
        id: post.id,
        message: post.message,
        createdat: post.createdat,
        user: {
          id: user.rows[0].id,
          name: user.rows[0].name,
          office: user.rows[0].office,
          email: user.rows[0].email,
          password: user.rows[0].password,
          image: user.rows[0].image.toString(),
          createdat: user.rows[0].createdat,
        },
        comments: comments.rows.map((comment) => {
          return {
            id: comment.id,
            comment: comment.comment,
            createdAt: comment.createdat,
            userId: comment.userid,
            postId: comment.postid,
          }
        }),
      }
    }),
  )
  return reply.status(200).send(sendObject)
}
