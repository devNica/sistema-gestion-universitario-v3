import { type UserLoginResponseModel } from '@auth/models/controllers/auth.controller.model'
import { type UserSigninServiceModel } from '@auth/models/services/auth-service.model'
import ServiceValidationErrorPresenter from '@core/adapters/primary/presenters/service-validation-error.presenter'
import { type FetchUserByParamsRepoI } from '@core/ports/output/repositories/user-repository-output.port'
import { type JWTOutputPort } from '@core/ports/output/security/jwt-output.port'
import { type PasswordEncryptorOutputPort } from '@core/ports/output/security/password-encryptor-output.port'

export interface SigninCommonUserSrvI {
  signinCommonUser: (data: UserSigninServiceModel) => Promise<UserLoginResponseModel>
}

export default class SigninCommonUserService implements SigninCommonUserSrvI {
  constructor (
    private readonly repository: FetchUserByParamsRepoI,
    private readonly encryptor: PasswordEncryptorOutputPort,
    private readonly tokenService: JWTOutputPort
  ) { }

  private async validatePassword (passwordHash: string, password: string): Promise<void> {
    await this.encryptor.validatePassword(passwordHash, password)
  }

  async signinCommonUser (data: UserSigninServiceModel): Promise<UserLoginResponseModel> {
    const user = await this.repository.fetchByParams({ ...data })

    if (user.length === 0) {
      throw new ServiceValidationErrorPresenter('Usuario no encontrado')
    }

    await this.validatePassword(user[0].password, data.password)

    const { token } = this.tokenService.signAccessToken({ id: user[0].id })

    return {
      id: user[0].id,
      email: user[0].email,
      fullname: user[0].fullname,
      token
    }
  }
}
