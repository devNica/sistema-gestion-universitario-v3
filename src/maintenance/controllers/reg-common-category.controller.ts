import { type CategoryCtrlInputModel } from '@maintenance/models/controllers/controller.input.model'
import { type RegisterCommonCategorySrvI } from '@maintenance/services/reg-common-category.service'
import RequestValidationErrorPresenter from '@core/adapters/primary/presenters/req-validation-error.presenter'
import { type EmptyResponseModel } from '@core/models/generic/response.model'
import { type HttpRequestModel } from '@core/models/http/http-request.model'
import { type HttpResponseModel } from '@core/models/http/http-response.model'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { type PresenterOutputPort } from '@core/ports/output/presenter/presenter-output.port'
import { objectKeyExists } from '@core/shared/utils/object-key-exists'

export class RegisterCommonCategoryController implements ControllerInputPort<EmptyResponseModel | never> {
  constructor (
    private readonly service: RegisterCommonCategorySrvI,
    private readonly presenter: PresenterOutputPort<EmptyResponseModel>
  ) { }

  async handleRequest (request: HttpRequestModel<CategoryCtrlInputModel>): Promise<HttpResponseModel<EmptyResponseModel>> {
    if (!objectKeyExists(request, 'body')) {
      throw new RequestValidationErrorPresenter('Error en el cuerpo de la peticion')
    }

    await this.service.registerCommonCategory(request.body)
    return await this.presenter.handleResponse({}, 'Successfull')
  }
}
