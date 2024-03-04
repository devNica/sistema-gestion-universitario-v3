import RequestValidationErrorPresenter from '@core/adapters/primary/presenters/req-validation-error.presenter'
import { type UUID } from '@core/models/generic/custom-types.model'
import { type HttpRequestModel } from '@core/models/http/http-request.model'
import { type HttpResponseModel } from '@core/models/http/http-response.model'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { type PresenterOutputPort } from '@core/ports/output/presenter/presenter-output.port'
import { objectKeyExists } from '@core/shared/utils/object-key-exists'
import { type CourseOC } from '@org/models/controllers/controller-output.model'
import { type CourseListSrvI } from '@org/services/course-by-knowledge-area.service'

export class CourseByKnowledgeAreaListController implements ControllerInputPort<CourseOC | never> {
  constructor (
    private readonly service: CourseListSrvI,
    private readonly presenter: PresenterOutputPort<CourseOC>
  ) {}

  async handleRequest (request: HttpRequestModel<any, { id: UUID }>): Promise<HttpResponseModel<CourseOC | never>> {
    if (!objectKeyExists(request, 'params')) {
      throw new RequestValidationErrorPresenter('Error in request body')
    }

    const result = await this.service.courseByKnowledgeAreaList(request.params.id)
    return await this.presenter.handleResponse(result, 'Registro de Sede satisfactorio')
  }
}
