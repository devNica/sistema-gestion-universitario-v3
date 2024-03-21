import authenticationRouter from '@auth/infrastructure/routes/auth.router'
import backofficeRouter from '@backoffice/infrastructure/routes/backoffice.router'
import { type ControllerModel } from '@core/domain/models/api/controller.model'
import { expressPrintRoutes } from '@core/framework/express/express-print-routes'
import { setupErrorHandler } from '@core/framework/express/express-setup-error-handler'
import { setupGlobalMiddleware } from '@core/framework/express/express-setup-global-middlewares'
import { setupProxy } from '@core/framework/express/express-setup-proxy'
import { setupRoutes } from '@core/framework/express/express-setup-routes'
import constants from '@core/shared/constants'
import { type Application } from 'express'
import { type Server } from 'http'

export class ExpressServerAdapter {
  private readonly controllers: ControllerModel[] = []

  constructor (
    private readonly serverPort: number,
    private readonly expressApp: Application,
    private readonly server: Server
  ) {}

  private controllerRegister (): void {
    this.controllers.push({ path: `${constants.PREFIX}/auth`, controller: authenticationRouter })
    this.controllers.push({ path: `${constants.PREFIX}/backoffice`, controller: backofficeRouter })
  }

  public async start (): Promise<void> {
    this.controllerRegister()
    await setupGlobalMiddleware(this.expressApp)
    await setupProxy(this.expressApp)
    await setupRoutes(this.expressApp, this.controllers)
    // visualizar las rutas declaradas en el servidor, cuando el segundo argumento es true
    await expressPrintRoutes(this.expressApp, false)
    await setupErrorHandler(this.expressApp)

    this.server.listen(this.serverPort, () => {
      console.log(`Server is running on port: ${this.serverPort}`)
    })
  }
}
