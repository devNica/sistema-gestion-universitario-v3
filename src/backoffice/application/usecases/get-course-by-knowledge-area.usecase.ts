import { type FoundCoursesModel } from '@backoffice/domain/ports/application/application-domain.model'
import { type GetCoursesByKnowledgeAreaPort } from '@backoffice/domain/ports/application/application-domain.port'
import { type HttpRequestModel } from '@core/application/models/http/http-request.model'
import { type HttpResponseModel } from '@core/application/models/http/http-response.model'
import { type ControllerInputPort } from '@core/application/ports/controller-input.port'
import { type PresenterOutputPort } from '@core/application/ports/presenter-output.port'
import RequestValidationErrorPresenter from '@core/application/presenter/request-validation.presenter'
import { type EmptyRequestModel } from '@core/domain/models/api/controller.model'
import { objectKeyExists } from '@core/shared/utils/object-key-exist'

export default class GetCoursesByKnowledgeAreaUseCase implements ControllerInputPort<FoundCoursesModel[]> {
  constructor (
    private readonly service: GetCoursesByKnowledgeAreaPort,
    private readonly presenter: PresenterOutputPort<FoundCoursesModel[]>
  ) {}

  async handleRequest (request: HttpRequestModel<EmptyRequestModel, { id: string }>): Promise<HttpResponseModel<FoundCoursesModel[]>> {
    if (!objectKeyExists(request, 'params')) {
      throw new RequestValidationErrorPresenter('Invalid Request')
    }

    const result = await this.service.getCourses(request.params.id)
    return await this.presenter.handleResponse(result, 'consulta exitosa!')
  }
}
