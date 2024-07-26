import 'dotenv/config'
import { app } from './config/app'
import { env } from './env'

const apiPort: number = env.PORT

app
  .listen({
    port: apiPort,
    host: '0.0.0.0',
  })
  .then(async () => {
    console.log(`HTTP server running on http://localhost:${apiPort}`)
  })
