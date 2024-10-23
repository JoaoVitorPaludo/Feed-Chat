import bcrypt from 'bcrypt';
import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import knex from '../../../config/database';
import { required } from '../../../utils/validations/required';

interface loginDataProps {
  email: string;
  password: string;
}

export interface userObject {
  id: number;
  name: string;
  office: string;
  email: string;
  password: string;
  image: Buffer;
  createdAt: Date;
}

export async function loginApplication(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const loginData = request.body as loginDataProps;

    required(loginData.email, 'email');
    required(loginData.password, 'password');

    const user = await knex.raw(
      `select * from users where email = '${loginData.email}'`,
    );

    if (user.rows.length === 0) {
      return reply.code(401).send({ message: 'Email ou senha incorretos' });
    }

    const passwordMatch = await bcrypt.compare(
      loginData.password,
      user.rows[0].password,
    );

    if (!passwordMatch) {
      return reply.code(401).send({ message: 'Email ou senha incorretos' });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET not defined');
    }

    const token = jwt.sign(
      {
        id: user.rows[0].id,
        nome: user.rows[0].nome,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
    );

    const userObject = {
      createdAt: user.rows[0].createdat,
      email: user.rows[0].email,
      id: user.rows[0].id,
      image: user.rows[0].image.toString(),
      name: user.rows[0].name,
      office: user.rows[0].office,
      password: user.rows[0].password,
    };

    return reply.send({
      token,
      user: userObject,
    });
  } catch (err) {
    // Se ocorrer um erro inesperado, retorna uma resposta apropriada
    return reply.code(500).send({ message: 'Erro no servidor', error: err.message });
  }
}
