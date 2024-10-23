import { FastifyReply, FastifyRequest } from "fastify";
import jwt from 'jsonwebtoken';
import knex from "../../../config/database";

export async function deleteComments(request: FastifyRequest, reply: FastifyReply) {
    try {

        const { token, id } = request.headers

        jwt.verify(token as string, process.env.JWT_SECRET)

        knex.raw(`DELETE from comments WHERE ID = ${id}`)

        return reply.status(200).send({ message: 'Comentário excluído com sucesso!' })
    } catch (err) {
        return reply.status(401).send({ error: 'Token inválido ou expirado.' })
    }
}
