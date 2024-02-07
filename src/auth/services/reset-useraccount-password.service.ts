import { type ResetUserPasswordIC } from '@auth/models/controllers/controller-input.model'
import { type UpdateUserAccountPasswordOP } from '@auth/ports/output/auth-repository.output.port'
import { type EmptyResponseModel } from '@core/models/generic/response.model'
import { type PasswordEncryptorOutputPort } from '@core/ports/output/security/password-encryptor-output.port'

export interface ResetUserAccountPasswordSrvI {
  resetPassword: (request: ResetUserPasswordIC) => Promise<EmptyResponseModel>
}

export default class ResetUserAccountPasswordService implements ResetUserAccountPasswordSrvI {
  constructor (
    private readonly port: UpdateUserAccountPasswordOP,
    private readonly encryptor: PasswordEncryptorOutputPort
  ) {}

  async resetPassword (request: ResetUserPasswordIC): Promise<EmptyResponseModel> {
    await this.port.updatePassword({
      username: request.username,
      passwordHashed: await this.encryptor.passwordEncrypt(request.newPassword)
    })

    return {}
  }
}
