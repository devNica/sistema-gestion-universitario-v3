import { expressErrorAdapter } from '@core/infraestructure/express/express-error.adapter'
import { type Application } from 'express'

export async function setupErrorHandler (app: Application): Promise<void> {
  app.use(expressErrorAdapter)
}
