import { type ControllerModel } from '@core/models/api/controller.model'
import { setupAsyncErrors } from '@frameworks/express/express-setup-async-error'
import { setupGlobalMiddleware } from '@frameworks/express/express-setup-global-middlewares'
import { setupProxy } from '@frameworks/express/express-setup-proxy'
import { setupRoutes } from '@frameworks/express/express-setup-routes'
import { type Application } from 'express'
import { type Server } from 'http'
import authRouter from '@auth/routes/auth.routes'
import constants from '@core/shared/constants'
import userRouter from '@auth/routes/user.routes'

export class ExpressHttpServerAdapter {
  private readonly controllers: ControllerModel[] = []

  constructor (
    private readonly serverPort: number,
    private readonly expressApp: Application,
    private readonly server: Server
  ) {}

  private async addController (): Promise<void> {
    this.controllers.push({ path: `${constants.PREFIX}/user`, controller: userRouter })
    this.controllers.push({ path: `${constants.PREFIX}/auth`, controller: authRouter })
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
