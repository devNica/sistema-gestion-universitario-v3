import GuestUserRegistrationUseCase from '@auth/application/usecase/guest-user-registration.usecase'
import { type RegisteredAccountApplicationModel } from '@auth/domain/ports/application/application-domain.model'
import GuestUserRegistrationDomainService from '@auth/domain/services/guest-user-registration.service'
import { createUserRepository } from '@auth/infrastructure/repositories/auth-repository.adapter'
import { rolRepository } from '@auth/infrastructure/repositories/rol-repository.adapter'
import { type ControllerInputPort } from '@core/application/ports/controller-input.port'
import SuccessfulInsertRequestPresenter from '@core/application/presenter/successful-insert-request.presenter'
import { passwordEncryptorService } from '@core/infrastructure/argon/password-encryptor.adapter'

function factory (): ControllerInputPort {
  const service = new GuestUserRegistrationDomainService(
    createUserRepository,
    rolRepository,
    passwordEncryptorService
  )

  const presenter = new SuccessfulInsertRequestPresenter<RegisteredAccountApplicationModel>()

  const usecase = new GuestUserRegistrationUseCase(
    service,
    presenter
  )

  return usecase
}

export const guestUserRegistrationFactory = factory()
