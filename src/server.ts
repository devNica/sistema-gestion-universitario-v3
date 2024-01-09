import 'reflect-metadata'
import 'source-map-support/register'
import 'module-alias/register'

import constants from '@core/shared/constants'
import { ExpressHttpServerAdapter } from '@core/adapters/primary/express/express-server.adapter'
import { appExpress, server } from '@core/configs/server.config'

const { SERVER_PORT } = constants

void startServer()

async function startServer (): Promise<void> {
  console.log(process.env)

  const httpServer = new ExpressHttpServerAdapter(SERVER_PORT, appExpress, server)
  await httpServer.start()
}
