import { type UpdateProfileControllerModel } from '@auth/models/controllers/auth.controller.model'
import { type EmptyResponseModel } from '@auth/models/controllers/generic-controller.model'
import { type UpdProfileUserSrvI } from '@auth/services/upd-profile-user.service'
import RequestValidationErrorPresenter from '@core/adapters/primary/presenters/req-validation-error.presenter'
import { type HttpRequestModel } from '@core/models/http/http-request.model'
import { type HttpResponseModel } from '@core/models/http/http-response.model'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { type PresenterOutputPort } from '@core/ports/output/presenter/presenter-output.port'
import { objectKeyExists } from '@core/shared/utils/object-key-exists'

export class UpdateProfileUserController implements ControllerInputPort<EmptyResponseModel | never> {
  constructor (
    private readonly service: UpdProfileUserSrvI,
    private readonly presenter: PresenterOutputPort<EmptyResponseModel>
  ) { }

  async handleRequest (request: HttpRequestModel<UpdateProfileControllerModel>): Promise<HttpResponseModel<EmptyResponseModel>> {
    if (!objectKeyExists(request, 'body')) {
      throw new RequestValidationErrorPresenter('Error en el cuerpo de la peticion')
    }

    const { email, phoneNumber, fullname } = request.body
    const { userId } = request.params
    await this.service.UpdProfileUserSrvI({ email, phoneNumber, fullname, id: userId })
    return await this.presenter.handleResponse({}, 'Successfull')
  }
}
