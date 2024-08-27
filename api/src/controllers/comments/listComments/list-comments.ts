// import { FastifyReply, FastifyRequest } from 'fastify'
// import jwt from 'jsonwebtoken'
// import knex from '../../../config/database'

// export async function listComments(
//     request: FastifyRequest,
//     reply: FastifyReply,
// ) {
//     const { token } = request.headers

//     jwt.verify(token as string, process.env.JWT_SECRET)

//     const comments = await knex.raw(`select * from comments order by id desc`)

//     return reply.status(200).send(comments.rows)
// }
