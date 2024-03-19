import { type PasswordProtectionServiceOutputPort } from '@core/domain/ports/security/password-protection-service.port'
import { type UserEntity } from '../entities/AuthEntity'
import { type UserRepositoryPort } from '../ports/repository/repository-domain.port'
import ServiceValidationErrorPresenter from '@core/application/presenter/service-validation-error.presenter'
import { type EmptyResponseModel } from '@core/domain/models/api/controller.model'
import { setPasswordExpiration } from '@core/shared/utils/create-future-date'
import { objectKeyExists } from '@core/shared/utils/object-key-exist'
import { type ResetPasswordModel } from '../ports/application/application-domain.model'
import { type ResetPasswordPort } from '../ports/application/application-domain.port'

export default class ResetPasswordDomainService implements ResetPasswordPort {
  constructor (
    private readonly repository: UserRepositoryPort<UserEntity>,
    private readonly encryptor: PasswordProtectionServiceOutputPort
  ) { }

  async resetPassword (request: ResetPasswordModel): Promise<EmptyResponseModel> {
    if (request?.rol === 'administrador') {
      await this.repository.update(
        { username: request.username },
        {
          passwordHashed: await this.encryptor.passwordEncrypt(request.newPassword),
          expiresIn: setPasswordExpiration()
        })
    } else {
      if (!objectKeyExists(request, 'prevPassword')) {
        throw new ServiceValidationErrorPresenter('badRequest', 'Contrasenia previa es requerida')
      }
      const userFound = await this.repository.fetch({ username: request.username })
      const verify = await this.encryptor.validatePassword(userFound.passwordHashed, request.prevPassword)

      if (!verify) throw new ServiceValidationErrorPresenter('unAuthorizedRequest', 'La contrasenia anterior no pudo ser verificada')

      await this.repository.update(
        { username: request.username },
        {
          passwordHashed: await this.encryptor.passwordEncrypt(request.newPassword),
          expiresIn: setPasswordExpiration()
        })
    }

    return {}
  }
}
