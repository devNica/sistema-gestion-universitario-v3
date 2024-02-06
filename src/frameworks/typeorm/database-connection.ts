import { getDatabaseCredential } from '@core/configs/db-credential.config'
import { DataSource } from 'typeorm'

const db = getDatabaseCredential()

export const appDataSource = new DataSource({
  type: db.DB_DIALECT,
  host: db.DB_HOST,
  port: 5432,
  username: db.DB_USER,
  password: db.DB_PASSWORD,
  database: db.DB_NAME,
  synchronize: false,
  logging: true,
  entities: ['src/core/adapters/secondary/orm/typeorm/models/**/*.ts'],
  subscribers: [],
  migrations: [],
  uuidExtension: 'pgcrypto'
})
