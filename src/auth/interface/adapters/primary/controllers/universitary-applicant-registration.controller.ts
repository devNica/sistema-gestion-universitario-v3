import { type UniversitaryApplicantRegistrationIC } from '@auth/domain/models/controllers/controller-input.model'
import { type UniversitaryApplicantRegistrationOC } from '@auth/domain/models/controllers/controller-output.model'
import { type UniversitaryApplicantRegistrationIP } from '@auth/domain/ports/input/auth-usecase.input.port'
import RequestValidationErrorPresenter from '@core/adapters/primary/presenters/req-validation-error.presenter'
import { type HttpRequestModel } from '@core/models/http/http-request.model'
import { type HttpResponseModel } from '@core/models/http/http-response.model'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { type PresenterOutputPort } from '@core/ports/output/presenter/presenter-output.port'
import { objectKeyExists } from '@core/shared/utils/object-key-exists'

export default class UniversitaryApplicantRegistrationController implements ControllerInputPort<UniversitaryApplicantRegistrationOC | never> {
  constructor (
    private readonly service: UniversitaryApplicantRegistrationIP,
    private readonly presenter: PresenterOutputPort<UniversitaryApplicantRegistrationOC>
  ) {}

  async handleRequest (request: HttpRequestModel<UniversitaryApplicantRegistrationIC>): Promise<HttpResponseModel<UniversitaryApplicantRegistrationOC>> {
    if (!objectKeyExists(request, 'body')) {
      throw new RequestValidationErrorPresenter('Error in request body')
    }

    const result = await this.service.register({ ...request.body })
    return await this.presenter.handleResponse(result, 'Registro de Aspirante Universitatio Exitoso')
  }
}
