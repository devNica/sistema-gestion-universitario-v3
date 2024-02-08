import UniversityProfessorRegistrationController from '@auth/controllers/university-professor-registration.controller'
import { type UniversityProfessorRegistrationOC } from '@auth/models/controllers/controller-output.model'
import UniversityProfessorRegistrationService from '@auth/services/university-professor-registration.service'
import SuccessfulInsertRequestPresenter from '@core/adapters/primary/presenters/successful-insert-request.presenter'
import { createProfessorUserRepo, fetchRolByNameRepo } from '@core/adapters/secondary/repositories/useraccount-repository.adapter'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { passwordEncryptorService } from '@core/services/encrypters/password-encryptor.service'

function factory (): ControllerInputPort {
  const service = new UniversityProfessorRegistrationService(
    createProfessorUserRepo,
    fetchRolByNameRepo,
    passwordEncryptorService
  )

  const presenter = new SuccessfulInsertRequestPresenter<UniversityProfessorRegistrationOC>()

  const controller = new UniversityProfessorRegistrationController(
    service,
    presenter
  )

  return controller
}

export const universityProfessorRegistrationFactory = factory()
