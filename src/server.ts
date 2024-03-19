import 'reflect-metadata'
import 'source-map-support/register'
import 'module-alias/register'

import { SequelizeAdapter } from '@core/infraestructure/sequelize/sequelize.adapter'
import { ExpressServerAdapter } from '@core/infraestructure/express/express-server-adapter'
import constants from '@core/shared/constants'
import { appExpress, server } from '@core/shared/configs/server.config'

const { SERVER_PORT } = constants

void startServer()

async function startServer (): Promise<void> {
  const db = new SequelizeAdapter()

  db.connect()
    .then(() => { console.log('Database connected success') })
    .catch(err => { console.error(err) })

  db.syncModels(false)
    .then(() => { console.log('Modelos sincronizados') })
    .catch(err => { console.error(err) })

  const httpServer = new ExpressServerAdapter(SERVER_PORT, appExpress, server)
  await httpServer.start()
}
