import { type HttpRequestModel } from '../http/http-request.model'

export interface ExpressMiddlewareModel extends HttpRequestModel {
  method?: string
}
