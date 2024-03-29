import authenticationRouter from '@auth/infraestructure/routes/auth.routes'
import { type ControllerModel } from '@core/domain/models/api/controller.model'
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
  }

  public async start (): Promise<void> {
    this.controllerRegister()
    await setupGlobalMiddleware(this.expressApp)
    await setupProxy(this.expressApp)
    await setupRoutes(this.expressApp, this.controllers)
    await setupErrorHandler(this.expressApp)

    this.server.listen(this.serverPort, () => {
      console.log(`Server is running on port: ${this.serverPort}`)
    })
  }
}
