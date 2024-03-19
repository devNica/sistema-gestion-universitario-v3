import { type HttpRequestModel } from '@core/application/models/http/http-request.model'

export interface MiddlewareRequestModel extends HttpRequestModel {
  method?: string
}
