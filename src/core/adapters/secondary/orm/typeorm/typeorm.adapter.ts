import { type DatabaseOutputPort } from '@core/ports/output/db/db-output.port'
import { appDataSource } from '@frameworks/typeorm/database-connection'
import { type DataSource } from 'typeorm'

export class TypeOrmAdapter implements DatabaseOutputPort {
  private readonly typeOrm: DataSource

  constructor () {
    this.typeOrm = appDataSource
  }

  async connect (): Promise<void> {
    try {
      await this.typeOrm.initialize()
    } catch (error) {
      throw new Error(`Database connection error: ${String(error)}`)
    }
  }
}
