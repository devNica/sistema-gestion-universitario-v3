import ResetPasswordUseCase from '@auth/application/usecase/reset-password.usecase'
import ResetPasswordDomainService from '@auth/domain/services/reset-password.service'
import { userRepository } from '@auth/infrastructure/repositories/auth-repository.adapter'
import { type ControllerInputPort } from '@core/application/ports/controller-input.port'
import SuccessFulUpdatedPresenter from '@core/application/presenter/successful-update.presenter'
import { type EmptyResponseModel } from '@core/domain/models/api/controller.model'
import { passwordEncryptorService } from '@core/infrastructure/argon/password-encryptor.adapter'

function factory (): ControllerInputPort {
  const service = new ResetPasswordDomainService(
    userRepository,
    passwordEncryptorService
  )

  const presenter = new SuccessFulUpdatedPresenter<EmptyResponseModel>()

  const usecase = new ResetPasswordUseCase(
    service,
    presenter
  )

  return usecase
}

export const resetUserAccountPasswordFactory = factory()
