import { type UserLoginResponseModel } from '@auth/models/controllers/auth.controller.model'
import { type SigninCommonUserSrvI } from '@auth/services/signin-common-user.service'
import { DefaultApplicationErrorAdapter } from '@core/adapters/primary/errors/default-application-error.adapter'
import { type HttpRequestModel } from '@core/models/http/http-request.model'
import { type HttpResponseModel } from '@core/models/http/http-response.model'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { type PresenterOutputPort } from '@core/ports/output/presenter/presenter-output.port'
import { objectKeyExists } from '@core/shared/utils/object-key-exists'

export class SigninCommonUserController implements ControllerInputPort<UserLoginResponseModel | never> {
  constructor (
    private readonly service: SigninCommonUserSrvI,
    private readonly presenter: PresenterOutputPort<UserLoginResponseModel>
  ) {}

  async handleRequest (request: HttpRequestModel<{ email: string, password: string }>): Promise<HttpResponseModel<UserLoginResponseModel>> {
    try {
      if (!objectKeyExists(request, 'body')) {
        throw new Error('Invalid Request')
      }

      const { email, password } = request.body
      const result = await this.service.signinCommonUser({ email, password })
      return await this.presenter.handleResponse(result, 'Successfull')
    } catch (error) {
      throw new DefaultApplicationErrorAdapter(String(error))
    }
  }
}
