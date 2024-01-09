import { type EmptyResponseModel } from '@auth/models/controllers/generic-controller.model'
import { type RegisterCommonUserSrvI } from '@auth/services/reg-common-user.service'
import { type HttpRequestModel } from '@core/models/http/http-request.model'
import { type HttpResponseModel } from '@core/models/http/http-response.model'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { type PresenterOutputPort } from '@core/ports/output/presenter/presenter-output.port'
import { objectKeyExists } from '@core/shared/utils/object-key-exists'

export class RegisterCommonUserController implements ControllerInputPort<EmptyResponseModel | never> {
  constructor (
    private readonly service: RegisterCommonUserSrvI,
    private readonly presenter: PresenterOutputPort<EmptyResponseModel>
  ) {}

  async handleRequest (request: HttpRequestModel<{ email: string, password: string }>): Promise<HttpResponseModel<EmptyResponseModel>> {
    try {
      if (!objectKeyExists(request, 'body')) {
        throw new Error('Invalid Request')
      }

      const { email, password } = request.body
      await this.service.createCommonUser({ email, password })
      return await this.presenter.handleResponse({}, 'Successfull')
    } catch (error) {
      throw new Error(String(error))
    }
  }
}