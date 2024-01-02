import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  POSTGRES_PORT,
  ENV,
} = process.env

const client = new Pool({
  host: POSTGRES_HOST,
  port: POSTGRES_PORT as unknown as number,
  database: ENV === 'dev' ? POSTGRES_DB : POSTGRES_TEST_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
})

export default client