import { FastifyInstance } from 'fastify'
import { createPosts } from './createPosts/create-posts'
import { listPosts } from './listPosts/list-posts'

export async function postsRoutes(app: FastifyInstance) {
  app.get('/', listPosts)
  app.post('/create', createPosts)
}
