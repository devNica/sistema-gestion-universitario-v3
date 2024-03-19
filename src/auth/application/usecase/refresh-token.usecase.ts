import { type NewTokenModel, type RefreshTokenModel } from '@auth/domain/ports/application/application-domain.model'
import { type RefreshTokenPort } from '@auth/domain/ports/application/application-domain.port'
import { type HttpRequestModel } from '@core/application/models/http/http-request.model'
import { type HttpResponseModel } from '@core/application/models/http/http-response.model'
import { type ControllerInputPort } from '@core/application/ports/controller-input.port'
import { type PresenterOutputPort } from '@core/application/ports/presenter-output.port'
import RequestValidationErrorPresenter from '@core/application/presenter/request-validation.presenter'
import { objectKeyExists } from '@core/shared/utils/object-key-exist'

export default class RefreshTokenUseCase
implements ControllerInputPort<NewTokenModel | never> {
  constructor (
    private readonly service: RefreshTokenPort,
    private readonly presenter: PresenterOutputPort<NewTokenModel>
  ) {}

  async handleRequest (request: HttpRequestModel<RefreshTokenModel>): Promise<HttpResponseModel<NewTokenModel>> {
    if (!objectKeyExists(request, 'params')) {
      throw new RequestValidationErrorPresenter('Error in request body')
    }

    const { userId } = request.params

    const result = await this.service.refreshToken({ userId })
    return await this.presenter.handleResponse(result, 'Refresco de token exitoso')
  }
}
