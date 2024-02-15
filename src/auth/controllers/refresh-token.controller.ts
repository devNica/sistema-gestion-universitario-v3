import { type RefreshTokenIC } from '@auth/models/controllers/controller-input.model'
import { type RefreshTokenOC } from '@auth/models/controllers/controller-output.model'
import { type RefreshTokenSrvI } from '@auth/services/refresh-token.service'
import RequestValidationErrorPresenter from '@core/adapters/primary/presenters/req-validation-error.presenter'
import { type HttpRequestModel } from '@core/models/http/http-request.model'
import { type HttpResponseModel } from '@core/models/http/http-response.model'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { type PresenterOutputPort } from '@core/ports/output/presenter/presenter-output.port'
import { objectKeyExists } from '@core/shared/utils/object-key-exists'

export default class RefreshTokenController implements ControllerInputPort<RefreshTokenOC | never> {
  constructor (
    private readonly service: RefreshTokenSrvI,
    private readonly presenter: PresenterOutputPort<RefreshTokenOC>
  ) {}

  async handleRequest (request: HttpRequestModel<RefreshTokenIC>): Promise<HttpResponseModel<RefreshTokenOC>> {
    if (!objectKeyExists(request, 'params')) {
      throw new RequestValidationErrorPresenter('Error in request body')
    }

    const { userId } = request.params

    const result = await this.service.refreshToken({ userId })
    return await this.presenter.handleResponse(result, 'Refresco de token exitoso')
  }
}
