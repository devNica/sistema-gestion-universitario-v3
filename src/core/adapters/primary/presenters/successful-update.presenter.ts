import { type HttpResponseModel, HttpStatusRecord } from '@core/models/http/http-response.model'
import { type PresenterOutputPort } from '@core/ports/output/presenter/presenter-output.port'

export default class SuccessFulUpdatedPresenter<T> implements PresenterOutputPort<T> {
  async handleResponse (meta: T, message: string): Promise<HttpResponseModel<T>> {
    return {
      statusCode: HttpStatusRecord.successRequest,
      meta,
      message
    }
  }
}
