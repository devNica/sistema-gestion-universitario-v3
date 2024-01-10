import { type ExpressMiddlewareModel } from '@core/models/middleware/express-middleware.model'

export interface MiddlewareInputPort {
  handleRequest: (request: ExpressMiddlewareModel) => Promise<void | never>
}
