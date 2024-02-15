import UniversitaryApplicantRegistrationController from '@auth/controllers/universitary-applicant-registration.controller'
import { type UniversitaryApplicantRegistrationOC } from '@auth/models/controllers/controller-output.model'
import UniversitaryApplicantRegistrationService from '@auth/services/universitary-applicant-registrarion.service'
import SuccessfulInsertRequestPresenter from '@core/adapters/primary/presenters/successful-insert-request.presenter'
import { createGuestUserRepo, fetchRolByNameRepo } from '@core/adapters/secondary/repositories/useraccount-repository.adapter'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { passwordEncryptorService } from '@core/services/encrypters/password-encryptor.service'

function factory (): ControllerInputPort {
  const service = new UniversitaryApplicantRegistrationService(
    createGuestUserRepo,
    fetchRolByNameRepo,
    passwordEncryptorService
  )

  const presenter = new SuccessfulInsertRequestPresenter<UniversitaryApplicantRegistrationOC>()

  const controller = new UniversitaryApplicantRegistrationController(
    service,
    presenter
  )

  return controller
}

export const universitaryApplicantRegistrationFactory = factory()
