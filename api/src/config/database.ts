import { knex as setupKnex, Knex } from 'knex'
import Oracle from 'oracledb'
import { env } from '../env'

const databaseClient = env.DATABASE_CLIENT
const databaseClientOptions = {
  oracle: 'oracledb',
  postgresql: 'pg',
}
let databaseConfig: Knex.Config = {}

switch (databaseClient) {
  case databaseClientOptions.oracle:
    Oracle.initOracleClient({ libDir: env.ORACLE_DIR })
    databaseConfig = {
      client: databaseClient,
      connection: {
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        connectString: env.DB_CONNECTION_STRING,
        pool: {
          min: 1,
          max: 50,
        },
      },
    }
    break
  case databaseClientOptions.postgresql:
    databaseConfig = {
      client: databaseClient,
      connection: env.DB_CONNECTION_STRING,
      pool: {
        min: 1,
        max: 50,
      },
    }
    break
  default:
    throw new Error('Database option is invalid!')
}

/** @description Database connection */
const knex = setupKnex(databaseConfig)

export default knex
