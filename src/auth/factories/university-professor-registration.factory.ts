import { createProfessorUserRepo, fetchRolByNameRepo } from '@auth/interface/adapters/secondary/repositories/auth-repository.adapter'
import UniversityProfessorRegistrationController from '@auth/interface/adapters/primary/controllers/university-professor-registration.controller'
import { type UniversityProfessorRegistrationOC } from '@auth/domain/models/controllers/controller-output.model'
import UniversityProfessorRegistrationUsecase from '@auth/application/usecase/university-professor-registration.usecase'
import SuccessfulInsertRequestPresenter from '@core/adapters/primary/presenters/successful-insert-request.presenter'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { passwordEncryptorService } from '@core/services/encrypters/password-encryptor.service'

function factory (): ControllerInputPort {
  const usecase = new UniversityProfessorRegistrationUsecase(
    createProfessorUserRepo,
    fetchRolByNameRepo,
    passwordEncryptorService
  )

  const presenter = new SuccessfulInsertRequestPresenter<UniversityProfessorRegistrationOC>()

  const controller = new UniversityProfessorRegistrationController(
    usecase,
    presenter
  )

  return controller
}

export const universityProfessorRegistrationFactory = factory()
