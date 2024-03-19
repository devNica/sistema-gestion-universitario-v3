import { type HttpResponseModel } from '../models/http/http-response.model'

export interface PresenterOutputPort<T> {
  handleResponse: (meta: T, message: string) => Promise<HttpResponseModel<T>>
}
