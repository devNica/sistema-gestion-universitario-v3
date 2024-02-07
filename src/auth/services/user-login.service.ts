import { type UserLoginIC } from '@auth/models/controllers/controller-input.model'
import { type UserLoginOC } from '@auth/models/controllers/controller-output.model'
import { type FetchAccountByUsernameOP } from '@auth/ports/output/auth-repository.output.port'
import ServiceValidationErrorPresenter from '@core/adapters/primary/presenters/service-validation-error.presenter'
import { type JWTOutputPort } from '@core/ports/output/security/jwt-output.port'
import { type PasswordEncryptorOutputPort } from '@core/ports/output/security/password-encryptor-output.port'

export interface UserLoginSrvI {
  login: (request: UserLoginIC) => Promise<UserLoginOC>
}

export default class UserLoginService implements UserLoginSrvI {
  constructor (
    private readonly port: FetchAccountByUsernameOP,
    private readonly encryptor: PasswordEncryptorOutputPort,
    private readonly tokenService: JWTOutputPort
  ) {}

  async login (request: UserLoginIC): Promise<UserLoginOC> {
    const userfound = await this.port.fetchAccount({
      username: request.username
    })

    const verifyPassword = await this.encryptor.validatePassword(userfound.password, request.password)

    console.log(verifyPassword)

    if (!verifyPassword) {
      throw new ServiceValidationErrorPresenter('Crendenciales Incorrectas')
    }

    const { token } = this.tokenService.signAccessToken({ id: userfound.id, rol: userfound.rol })

    return {
      nameAcronyms: userfound.firstname.charAt(0) + userfound.lastname.charAt(0),
      firstname: userfound.firstname,
      lastname: userfound.lastname,
      token
    }
  }
}
