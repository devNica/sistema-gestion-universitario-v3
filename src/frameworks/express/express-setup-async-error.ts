import { expressAsyncErrorAdapter } from '@core/adapters/primary/express/express-error.adapter'
import { type Application } from 'express'

export async function setupAsyncErrors (app: Application): Promise<void> {
  app.use(expressAsyncErrorAdapter)
}
