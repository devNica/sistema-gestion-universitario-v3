import 'dotenv/config'

export default {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  SERVER_PORT: Number(process.env.SERVER_PORT) ?? 4400,
  PREFIX: '/hw/core/v1',

  DB_NAME_DEV: process.env.DB_NAME_DEV,
  DB_USER_DEV: process.env.DB_USER_DEV,
  DB_PASSWORD_DEV: process.env.DB_PASSWORD_DEV,
  DB_HOST_DEV: process.env.DB_HOST_DEV,
  DB_DIALECT_DEV: process.env.DB_DIALECT_DEV,
  DB_SCHEMA_DEV: process.env.DB_SCHEMA_DEV,

  DB_SCHEMA_PROD: process.env.DB_SCHEMA_PROD,
  DB_NAME_PROD: process.env.DB_NAME_PROD,
  DB_USER_PROD: process.env.DB_USER_PROD,
  DB_PASSWORD_PROD: process.env.DB_PASSWORD_PROD,
  DB_HOST_PROD: process.env.DB_HOST_PROD,
  DB_DIALECT_PROD: process.env.DB_DIALECT_PROD,

  DB_SCHEMA_TEST: process.env.DB_SCHEMA_TEST,
  DB_NAME_TEST: process.env.DB_NAME_TEST,
  DB_USER_TEST: process.env.DB_USER_TEST,
  DB_PASSWORD_TEST: process.env.DB_PASSWORD_TEST,
  DB_HOST_TEST: process.env.DB_HOST_TEST,
  DB_DIALECT_TEST: process.env.DB_DIALECT_TEST

}
