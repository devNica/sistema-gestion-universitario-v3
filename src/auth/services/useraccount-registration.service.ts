import { type UserRegistrationIC } from '@auth/models/controllers/controller-input.model'
import { type CreateUserAccountOP } from '@auth/ports/output/auth-repository.output.port'
import { type EmptyResponseModel } from '@core/models/generic/response.model'
import { type PasswordEncryptorOutputPort } from '@core/ports/output/security/password-encryptor-output.port'

export interface UserAccountRegistrationSrvI {
  register: (request: UserRegistrationIC) => Promise<EmptyResponseModel>
}

export class UserAccountRegistrationService implements UserAccountRegistrationSrvI {
  constructor (
    private readonly port: CreateUserAccountOP,
    private readonly encrypt: PasswordEncryptorOutputPort
  ) {}

  async register (request: UserRegistrationIC): Promise<EmptyResponseModel> {
    await this.port.create({
      email: request.email,
      profileId: request.profileId,
      passwordHashed: await this.encrypt.passwordEncrypt(request.password)
    })

    return {}
  }
}
