import { type UniversityProfessorRegistrationIC } from '@auth/models/controllers/controller-input.model'
import { type UniversityProfessorRegistrationOC } from '@auth/models/controllers/controller-output.model'
import { type UniversityProfessorRegistrationSrvI } from '@auth/services/university-professor-registration.service'
import RequestValidationErrorPresenter from '@core/adapters/primary/presenters/req-validation-error.presenter'
import { type HttpRequestModel } from '@core/models/http/http-request.model'
import { type HttpResponseModel } from '@core/models/http/http-response.model'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { type PresenterOutputPort } from '@core/ports/output/presenter/presenter-output.port'
import { objectKeyExists } from '@core/shared/utils/object-key-exists'

export default class UniversityProfessorRegistrationController implements ControllerInputPort<UniversityProfessorRegistrationOC | never> {
  constructor (
    private readonly service: UniversityProfessorRegistrationSrvI,
    private readonly presenter: PresenterOutputPort<UniversityProfessorRegistrationOC>
  ) {}

  async handleRequest (request: HttpRequestModel<UniversityProfessorRegistrationIC>): Promise<HttpResponseModel<UniversityProfessorRegistrationOC>> {
    if (!objectKeyExists(request, 'body')) {
      throw new RequestValidationErrorPresenter('Error in request body')
    }

    const result = await this.service.register({ ...request.body })
    return await this.presenter.handleResponse(result, 'Registro de Aspirante Universitatio Exitoso')
  }
}
