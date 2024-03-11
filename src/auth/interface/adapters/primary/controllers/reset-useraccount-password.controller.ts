import { type ResetUserPasswordIC } from '@auth/domain/models/controllers/controller-input.model'
import { type ResetUserAccountPasswordUsecaseIP } from '@auth/domain/ports/input/auth-usecase.input.port'
import RequestValidationErrorPresenter from '@core/adapters/primary/presenters/req-validation-error.presenter'
import { type EmptyResponseModel } from '@core/models/generic/response.model'
import { type HttpRequestModel } from '@core/models/http/http-request.model'
import { type HttpResponseModel } from '@core/models/http/http-response.model'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { type PresenterOutputPort } from '@core/ports/output/presenter/presenter-output.port'
import { objectKeyExists } from '@core/shared/utils/object-key-exists'

export default class ResetUserAccountPasswordController implements ControllerInputPort<EmptyResponseModel | never> {
  constructor (
    private readonly service: ResetUserAccountPasswordUsecaseIP,
    private readonly presenter: PresenterOutputPort<EmptyResponseModel>
  ) {}

  async handleRequest (request: HttpRequestModel<ResetUserPasswordIC>): Promise<HttpResponseModel<EmptyResponseModel>> {
    if (!objectKeyExists(request, 'body')) {
      throw new RequestValidationErrorPresenter('Error in request body')
    }

    await this.service.resetPassword({ ...request.body })
    return await this.presenter.handleResponse({}, 'Actualizacion de contraseña exitosa')
  }
}
