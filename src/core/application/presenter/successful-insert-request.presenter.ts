import { type HttpResponseModel, HttpStatusRecord } from '../models/http/http-response.model'
import { type PresenterOutputPort } from '../ports/presenter-output.port'

export default class SuccessfulInsertRequestPresenter<T> implements PresenterOutputPort<T> {
  async handleResponse (meta: T, message: string): Promise<HttpResponseModel<T>> {
    return {
      statusCode: HttpStatusRecord.createdRequest,
      meta,
      message
    }
  }
}
