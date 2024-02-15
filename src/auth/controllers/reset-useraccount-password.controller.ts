import { type ResetUserPasswordIC } from '@auth/models/controllers/controller-input.model'
import { type ResetUserAccountPasswordSrvI } from '@auth/services/reset-useraccount-password.service'
import RequestValidationErrorPresenter from '@core/adapters/primary/presenters/req-validation-error.presenter'
import { type EmptyResponseModel } from '@core/models/generic/response.model'
import { type HttpRequestModel } from '@core/models/http/http-request.model'
import { type HttpResponseModel } from '@core/models/http/http-response.model'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { type PresenterOutputPort } from '@core/ports/output/presenter/presenter-output.port'
import { objectKeyExists } from '@core/shared/utils/object-key-exists'

export default class ResetUserAccountPasswordController implements ControllerInputPort<EmptyResponseModel | never> {
  constructor (
    private readonly service: ResetUserAccountPasswordSrvI,
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
