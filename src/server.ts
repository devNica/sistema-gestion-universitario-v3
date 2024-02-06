import 'reflect-metadata'
import 'source-map-support/register'
import 'module-alias/register'

import constants from '@core/shared/constants'
import { ExpressHttpServerAdapter } from '@core/adapters/primary/express/express-server.adapter'
import { appExpress, server } from '@core/configs/server.config'
// import { TypeOrmAdapter } from '@core/adapters/secondary/orm/typeorm/typeorm.adapter'
import { SequelizeAdapter } from '@core/adapters/secondary/orm/sequelize/sequelize.adapter'

const { SERVER_PORT } = constants

void startServer()

async function startServer (): Promise<void> {
  // const db = new TypeOrmAdapter()

  const db = new SequelizeAdapter()

  db.connect()
    .then(() => { console.log('Database connected success') })
    .catch(error => { console.error(error) })

  const httpServer = new ExpressHttpServerAdapter(SERVER_PORT, appExpress, server)
  await httpServer.start()
}
