import { type HttpRequestModel } from '../http/http-request.model'

export interface MiddlewareRequestModel extends HttpRequestModel {
  method?: string
}
