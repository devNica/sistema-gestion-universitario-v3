import { type UserAccountRegistrationSrvI } from '@auth/services/useraccount-registration.service'
import RequestValidationErrorPresenter from '@core/adapters/primary/presenters/req-validation-error.presenter'
import { type UUID } from '@core/models/generic/custom-types.model'
import { type EmptyResponseModel } from '@core/models/generic/response.model'
import { type HttpRequestModel } from '@core/models/http/http-request.model'
import { type HttpResponseModel } from '@core/models/http/http-response.model'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { type PresenterOutputPort } from '@core/ports/output/presenter/presenter-output.port'
import { objectKeyExists } from '@core/shared/utils/object-key-exists'

export default class UserAccountRegistrationController implements ControllerInputPort<EmptyResponseModel | never> {
  constructor (
    private readonly service: UserAccountRegistrationSrvI,
    private readonly presenter: PresenterOutputPort<EmptyResponseModel>
  ) {}

  async handleRequest (request: HttpRequestModel<{ email: string, password: string, profileId: UUID }>): Promise<HttpResponseModel<EmptyResponseModel>> {
    if (!objectKeyExists(request, 'body')) {
      throw new RequestValidationErrorPresenter('Error in request body')
    }

    await this.service.register({ ...request.body })
    return await this.presenter.handleResponse({}, 'Success')
  }
}
