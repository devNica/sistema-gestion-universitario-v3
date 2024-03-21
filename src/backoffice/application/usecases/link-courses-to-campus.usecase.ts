import { type LinkCoursesToCampusModel } from '@backoffice/domain/ports/application/application-domain.model'
import { type LinkCoursesToCampusPort } from '@backoffice/domain/ports/application/application-domain.port'
import { type HttpRequestModel } from '@core/application/models/http/http-request.model'
import { type HttpResponseModel } from '@core/application/models/http/http-response.model'
import { type ControllerInputPort } from '@core/application/ports/controller-input.port'
import { type PresenterOutputPort } from '@core/application/ports/presenter-output.port'
import RequestValidationErrorPresenter from '@core/application/presenter/request-validation.presenter'
import { type EmptyResponseModel } from '@core/domain/models/api/controller.model'
import { objectKeyExists } from '@core/shared/utils/object-key-exist'

export default class LinkCoursesToCampusUseCase implements ControllerInputPort<EmptyResponseModel> {
  constructor (
    private readonly service: LinkCoursesToCampusPort,
    private readonly presenter: PresenterOutputPort<EmptyResponseModel>
  ) {}

  async handleRequest (request: HttpRequestModel<
  Pick<LinkCoursesToCampusModel, 'courses'>, { id: string }>): Promise<HttpResponseModel<EmptyResponseModel>> {
    if (!objectKeyExists(request, 'body')) {
      throw new RequestValidationErrorPresenter('Invalid Request')
    }

    if (!objectKeyExists(request, 'params')) {
      throw new RequestValidationErrorPresenter('Invalid Request')
    }

    const result = await this.service.linkUp({ campusId: request.params.id, courses: request.body.courses })
    return await this.presenter.handleResponse(result, 'Los cursos se han vinculado correctamente al campus')
  }
}
