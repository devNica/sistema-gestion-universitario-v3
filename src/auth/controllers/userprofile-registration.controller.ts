import { type UserProfileRegistrationIC } from '@auth/models/controllers/controller-input.model'
import { type UserProfileRegistrationOC } from '@auth/models/controllers/controller-output.model'
import { type UserProfileRegistrationSrvI } from '@auth/services/userprofile-registration.service'
import RequestValidationErrorPresenter from '@core/adapters/primary/presenters/req-validation-error.presenter'
import { type HttpRequestModel } from '@core/models/http/http-request.model'
import { type HttpResponseModel } from '@core/models/http/http-response.model'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { type PresenterOutputPort } from '@core/ports/output/presenter/presenter-output.port'
import { objectKeyExists } from '@core/shared/utils/object-key-exists'

export default class UserProfileRegistrationController implements ControllerInputPort<UserProfileRegistrationOC | never> {
  constructor (
    private readonly service: UserProfileRegistrationSrvI,
    private readonly presenter: PresenterOutputPort<UserProfileRegistrationOC>
  ) {}

  async handleRequest (request: HttpRequestModel<UserProfileRegistrationIC>): Promise<HttpResponseModel<UserProfileRegistrationOC>> {
    if (!objectKeyExists(request, 'body')) {
      throw new RequestValidationErrorPresenter('Error in request body')
    }

    const result = await this.service.profileRegister({ ...request.body })
    return await this.presenter.handleResponse(result, 'Success')
  }
}
