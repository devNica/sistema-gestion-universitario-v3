import { type MiddlewareRequestModel } from '@core/application/models/middlewares/middleware.model'

export interface MiddlewareInputPort <T=unknown> {
  handleRequest: (request: MiddlewareRequestModel) => Promise<T | never>
}
