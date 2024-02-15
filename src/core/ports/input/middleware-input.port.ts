import { type MiddlewareRequestModel } from '@core/models/middleware/middleware-request.model'

export interface MiddlewareInputPort <T=unknown> {
  handleRequest: (request: MiddlewareRequestModel) => Promise<T | never>
}
