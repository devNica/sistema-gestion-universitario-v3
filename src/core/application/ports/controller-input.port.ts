import { type HttpRequestModel } from '../models/http/http-request.model'
import { type HttpResponseModel } from '../models/http/http-response.model'

export interface ControllerInputPort<T=unknown> {
  handleRequest: (request: HttpRequestModel) => Promise<HttpResponseModel<T>>
}
