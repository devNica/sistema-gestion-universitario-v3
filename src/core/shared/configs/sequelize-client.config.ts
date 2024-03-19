import { Sequelize } from 'sequelize'
import { getDatabaseCredential } from './database-crendential.config'

const db = getDatabaseCredential()

const sequelizeOptions = {
  user: db.DB_USER,
  password: db.DB_PASSWORD,
  database: db.DB_NAME,
  options: {
    schema: db.DB_SCHEMA,
    dialect: db.DB_DIALECT,
    host: db.DB_HOST,
    dialectOptions: {
      multipleStatements: true
    },
    logging: false,
    timezone: '-06:00',
    define: {
      freezeTableName: true,
      timestamps: false,
      underscored: true
    }
  }
}

export const sequelizeInstance = new Sequelize(
  sequelizeOptions.database,
  sequelizeOptions.user,
  sequelizeOptions.password,
  sequelizeOptions.options
)
