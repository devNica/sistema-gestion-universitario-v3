import RequestValidationErrorPresenter from '@core/adapters/primary/presenters/req-validation-error.presenter'
import { type EmptyResponseModel } from '@core/models/generic/response.model'
import { type HttpRequestModel } from '@core/models/http/http-request.model'
import { type HttpResponseModel } from '@core/models/http/http-response.model'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { type PresenterOutputPort } from '@core/ports/output/presenter/presenter-output.port'
import { objectKeyExists } from '@core/shared/utils/object-key-exists'
import { type CourseIC } from '@org/models/controllers/controller-input.model'
import { type CourseRegistrationSrvI } from '@org/services/course-registration.service'

export class CourseRegistrationController implements ControllerInputPort<EmptyResponseModel | never> {
  constructor (
    private readonly service: CourseRegistrationSrvI,
    private readonly presenter: PresenterOutputPort<EmptyResponseModel>
  ) {}

  async handleRequest (request: HttpRequestModel<CourseIC>): Promise<HttpResponseModel<EmptyResponseModel>> {
    if (!objectKeyExists(request, 'body')) {
      throw new RequestValidationErrorPresenter('Error in request body')
    }
    await this.service.courseReg({ ...request.body })
    return await this.presenter.handleResponse({}, 'Registro de carrera exitoso')
  }
}
