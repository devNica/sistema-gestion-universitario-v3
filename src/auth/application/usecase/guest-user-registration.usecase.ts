import { type RegisteredAccountApplicationModel, type GuestRegistrationApplicationModel } from '@auth/domain/ports/application/application-domain.model'
import { type GuestUserRegistrationPort } from '@auth/domain/ports/application/application-domain.port'
import { type HttpRequestModel } from '@core/application/models/http/http-request.model'
import { type HttpResponseModel } from '@core/application/models/http/http-response.model'
import { type ControllerInputPort } from '@core/application/ports/controller-input.port'
import { type PresenterOutputPort } from '@core/application/ports/presenter-output.port'
import RequestValidationErrorPresenter from '@core/application/presenter/request-validation.presenter'
import { objectKeyExists } from '@core/shared/utils/object-key-exist'

export default class GuestUserRegistrationUseCase
implements ControllerInputPort<RegisteredAccountApplicationModel | never> {
  constructor (
    private readonly service: GuestUserRegistrationPort,
    private readonly presenter: PresenterOutputPort<RegisteredAccountApplicationModel>
  ) {}

  async handleRequest (request: HttpRequestModel<GuestRegistrationApplicationModel>): Promise<HttpResponseModel<RegisteredAccountApplicationModel>> {
    if (!objectKeyExists(request, 'body')) {
      throw new RequestValidationErrorPresenter('Invalid Request')
    }

    const result = await this.service.register({ ...request.body })
    return await this.presenter.handleResponse(result, 'Registro exitoso!')
  }
}
