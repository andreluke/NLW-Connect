import { env } from '../settings/env'

const portSettings = {
  PORT: env.PORT,
  BASE_URL: `http://localhost:${env.PORT}`,
  WEB_URL: env.WEB_URL,
}

export { portSettings }
