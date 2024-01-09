import { type ControllerModel } from '@core/models/api/controller.model'
import { setupAsyncErrors } from '@frameworks/express/express-setup-async-error'
import { setupGlobalMiddleware } from '@frameworks/express/express-setup-global-middlewares'
import { setupProxy } from '@frameworks/express/express-setup-proxy'
import { setupRoutes } from '@frameworks/express/express-setup-routes'
import { type Application } from 'express'
import { type Server } from 'http'

export class ExpressHttpServerAdapter {
  private readonly controllers: ControllerModel[] = []

  constructor (
    private readonly serverPort: number,
    private readonly expressApp: Application,
    private readonly server: Server
  ) {}

  private async addController (): Promise<void> {

  }

  public async start (): Promise<void> {
    await this.addController()
    await setupGlobalMiddleware(this.expressApp)
    await setupProxy(this.expressApp)
    await setupRoutes(this.expressApp, this.controllers)
    await setupAsyncErrors(this.expressApp)
    this.server.listen(this.serverPort, () => { console.log(`Server is running on port: ${this.serverPort}`) })
  }
}
