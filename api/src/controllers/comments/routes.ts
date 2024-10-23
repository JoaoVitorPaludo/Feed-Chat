import { FastifyInstance } from 'fastify'
import { deleteComments } from './deleteComments/delete-comments'

export async function commentsRoutes(app: FastifyInstance) {
    app.delete('/delete', deleteComments)
}
