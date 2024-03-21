import { type UserLoginApplicationModel, type LoggedUserModel } from '@auth/domain/ports/application/application-domain.model'
import { type UserLoginPort } from '@auth/domain/ports/application/application-domain.port'
import { type HttpRequestModel } from '@core/application/models/http/http-request.model'
import { type HttpResponseModel } from '@core/application/models/http/http-response.model'
import { type ControllerInputPort } from '@core/application/ports/controller-input.port'
import { type PresenterOutputPort } from '@core/application/ports/presenter-output.port'
import RequestValidationErrorPresenter from '@core/application/presenter/request-validation.presenter'
import { objectKeyExists } from '@core/shared/utils/object-key-exist'

export default class UserLoginUseCase
implements ControllerInputPort<LoggedUserModel | never> {
  constructor (
    private readonly service: UserLoginPort,
    private readonly presenter: PresenterOutputPort<LoggedUserModel>
  ) {}

  async handleRequest (request: HttpRequestModel<UserLoginApplicationModel>): Promise<HttpResponseModel<LoggedUserModel>> {
    if (!objectKeyExists(request, 'body')) {
      throw new RequestValidationErrorPresenter('Invalid Request')
    }

    const result = await this.service.login({ ...request.body })
    return await this.presenter.handleResponse(result, 'Inicio de Sesion Exitoso!')
  }
}
