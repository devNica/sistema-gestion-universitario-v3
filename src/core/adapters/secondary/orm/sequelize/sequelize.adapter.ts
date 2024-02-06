import { type DatabaseOutputPort } from '@core/ports/output/db/db-output.port'
import { sequelizeInstance } from '@frameworks/sequelize/database-squelize-conn'
import { type Sequelize } from 'sequelize'

export class SequelizeAdapter implements DatabaseOutputPort {
  private readonly sequelize: Sequelize

  constructor () {
    this.sequelize = sequelizeInstance
  }

  async connect (): Promise<void> {
    try {
      await this.sequelize.authenticate()
    } catch (error) {
      throw new Error('Database connection failed')
    }
  }

  async syncModels (alter: boolean): Promise<void> {
    try {
      if (alter) {
        await this.sequelize.sync({ alter })
      }
    } catch (error) {
      throw new Error(String(error))
    }
  }
}
