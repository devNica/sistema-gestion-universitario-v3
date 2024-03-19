import ProfesorUserRegistrationUseCase from '@auth/application/usecase/profesor-user-registration.usecase'
import { type RegisteredAccountApplicationModel } from '@auth/domain/ports/application/application-domain.model'
import ProfessorUserRegistrationDomainService from '@auth/domain/services/professor-user-registration.service'
import { createUserRepository } from '@auth/infraestructure/repositories/auth-repository.adapter'
import { rolRepository } from '@auth/infraestructure/repositories/rol-repository.adapter'
import { type ControllerInputPort } from '@core/application/ports/controller-input.port'
import SuccessfulInsertRequestPresenter from '@core/application/presenter/successful-insert-request.presenter'
import { passwordEncryptorService } from '@core/infraestructure/argon/password-encryptor.adapter'

function factory (): ControllerInputPort {
  const service = new ProfessorUserRegistrationDomainService(
    createUserRepository,
    rolRepository,
    passwordEncryptorService
  )

  const presenter = new SuccessfulInsertRequestPresenter<RegisteredAccountApplicationModel>()

  const usecase = new ProfesorUserRegistrationUseCase(
    service,
    presenter
  )

  return usecase
}

export const professorUserRegistrationFactory = factory()
