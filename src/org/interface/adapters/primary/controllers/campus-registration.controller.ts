import RequestValidationErrorPresenter from '@core/adapters/primary/presenters/req-validation-error.presenter'
import { type EmptyResponseModel } from '@core/models/generic/response.model'
import { type HttpRequestModel } from '@core/models/http/http-request.model'
import { type HttpResponseModel } from '@core/models/http/http-response.model'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { type PresenterOutputPort } from '@core/ports/output/presenter/presenter-output.port'
import { objectKeyExists } from '@core/shared/utils/object-key-exists'
import { type CampusIC } from '@org/domain/models/controllers/controller-input.model'
import { type CampusRegistrationIP } from '@org/domain/ports/input/unit-organization.input.port'

export class CampusRegistrationController implements ControllerInputPort<EmptyResponseModel | never> {
  constructor (
    private readonly service: CampusRegistrationIP,
    private readonly presenter: PresenterOutputPort<EmptyResponseModel>
  ) {}

  async handleRequest (request: HttpRequestModel<CampusIC>): Promise<HttpResponseModel<EmptyResponseModel | never>> {
    if (!objectKeyExists(request, 'body')) {
      throw new RequestValidationErrorPresenter('Error in request body')
    }

    await this.service.campusReg({ ...request.body })
    return await this.presenter.handleResponse({}, 'Registro de Sede satisfactorio')
  }
}
