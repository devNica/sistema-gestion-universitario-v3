import RequestValidationErrorPresenter from '@core/adapters/primary/presenters/req-validation-error.presenter'
import { type EmptyResponseModel } from '@core/models/generic/response.model'
import { type HttpRequestModel } from '@core/models/http/http-request.model'
import { type HttpResponseModel } from '@core/models/http/http-response.model'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { type PresenterOutputPort } from '@core/ports/output/presenter/presenter-output.port'
import { objectKeyExists } from '@core/shared/utils/object-key-exists'
import { type OrganizationalUnitIC } from '@org/domain/models/controllers/controller-input.model'
import { type KnowledgeAreaIP } from '@org/domain/ports/input/unit-organization.input.port'

export class KnowledgeAreaRegistrationController implements ControllerInputPort<EmptyResponseModel | never> {
  constructor (
    private readonly service: KnowledgeAreaIP,
    private readonly presenter: PresenterOutputPort<EmptyResponseModel>
  ) {}

  async handleRequest (request: HttpRequestModel<OrganizationalUnitIC>): Promise<HttpResponseModel<EmptyResponseModel | never>> {
    if (!objectKeyExists(request, 'body')) {
      throw new RequestValidationErrorPresenter('Error in request body')
    }

    console.log('requestBody: ', request.body)

    await this.service.knowledgeAreaReg({ ...request.body })
    return await this.presenter.handleResponse({}, 'Registro de arae de conocimiento satisfactorio')
  }
}
