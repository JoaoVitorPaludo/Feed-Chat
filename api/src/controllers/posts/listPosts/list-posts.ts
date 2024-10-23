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
        comments: await Promise.all(
          comments.rows.map(async (comment) => {
            const commentUser = await knex.raw(
              `SELECT * FROM users WHERE id = ${comment.userid}`,
            )
            return {
              comment: {
                id: comment.id,
                comment: comment.comment,
                createdAt: comment.createdat,
                userId: comment.userid,
                postId: comment.postid,
              },
              user: {
                id: commentUser.rows[0].id,
                name: commentUser.rows[0].name,
                office: commentUser.rows[0].office,
                email: commentUser.rows[0].email,
                password: commentUser.rows[0].password,
                image: commentUser.rows[0].image
                  ? Buffer.from(commentUser.rows[0].image).toString('base64')
                  : null,
                createdat: commentUser.rows[0].createdat,
              },
            }
          }),
        ),
      }
    }),
  )
  return reply.status(200).send(sendObject)
}
