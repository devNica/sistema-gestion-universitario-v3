import { type FetchUserAccountByParamsOP, type UpdateUserAccountPasswordOP } from '@auth/domain/ports/output/auth-repository.output.port'
import ServiceValidationErrorPresenter from '@core/adapters/primary/presenters/service-validation-error.presenter'
import { type EmptyResponseModel } from '@core/models/generic/response.model'
import { type PasswordEncryptorOutputPort } from '@core/ports/output/security/password-encryptor-output.port'
import { setPasswordExpiration } from '@core/shared/utils/create-future-date'
import { objectKeyExists } from '@core/shared/utils/object-key-exists'
import { type ResetUserAccountPasswordUsecaseIP } from '@auth/domain/ports/input/auth-usecase.input.port'
import { type ResetUserPasswordIC } from '@auth/domain/models/controllers/controller-input.model'

export default class ResetUserAccountPasswordUsecase implements ResetUserAccountPasswordUsecaseIP {
  constructor (
    private readonly portA: UpdateUserAccountPasswordOP,
    private readonly portB: FetchUserAccountByParamsOP,
    private readonly encryptor: PasswordEncryptorOutputPort
  ) { }

  async resetPassword (request: ResetUserPasswordIC): Promise<EmptyResponseModel> {
    if (request?.rol === 'administrador') {
      await this.portA.updatePassword({
        username: request.username,
        passwordHashed: await this.encryptor.passwordEncrypt(request.newPassword),
        expiresIn: setPasswordExpiration()
      })
    } else {
      if (!objectKeyExists(request, 'prevPassword')) {
        throw new ServiceValidationErrorPresenter('Contrasenia previa es requerida')
      }
      const userFound = await this.portB.fetchAccount({ username: request.username })
      const verify = await this.encryptor.validatePassword(userFound.password, request.prevPassword)

      if (!verify) throw new ServiceValidationErrorPresenter('La contrasenia anterior no pudo ser verificada')

      await this.portA.updatePassword({
        username: request.username,
        passwordHashed: await this.encryptor.passwordEncrypt(request.newPassword),
        expiresIn: setPasswordExpiration()
      })
    }

    return {}
  }
}
