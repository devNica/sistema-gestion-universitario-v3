import { type ControllerModel } from '@core/models/api/controller.model'
import { type Application } from 'express'

export async function setupRoutes (app: Application, api: ControllerModel[]): Promise<void> {
  api.forEach(route => {
    app.use(route.path, route.controller)
  })
}
