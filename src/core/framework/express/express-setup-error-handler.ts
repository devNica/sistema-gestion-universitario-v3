import { expressErrorAdapter } from '@core/infrastructure/express/express-error.adapter'
import { type Application } from 'express'

export async function setupErrorHandler (app: Application): Promise<void> {
  app.use(expressErrorAdapter)
}
