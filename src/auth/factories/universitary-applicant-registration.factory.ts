import { createGuestUserRepo, fetchRolByNameRepo, registerInitAccuRepo } from '@auth/interface/adapters/secondary/repositories/auth-repository.adapter'
import UniversitaryApplicantRegistrationController from '@auth/interface/adapters/primary/controllers/universitary-applicant-registration.controller'
import { type UniversitaryApplicantRegistrationOC } from '@auth/domain/models/controllers/controller-output.model'
import UniversitaryApplicantRegistrarionUsecase from '@auth/application/usecase/universitary-applicant-registrarion.usecase'
import SuccessfulInsertRequestPresenter from '@core/adapters/primary/presenters/successful-insert-request.presenter'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { passwordEncryptorService } from '@core/services/encrypters/password-encryptor.service'

function factory (): ControllerInputPort {
  const usecase = new UniversitaryApplicantRegistrarionUsecase(
    createGuestUserRepo,
    fetchRolByNameRepo,
    registerInitAccuRepo,
    passwordEncryptorService
  )

  const presenter = new SuccessfulInsertRequestPresenter<UniversitaryApplicantRegistrationOC>()

  const controller = new UniversitaryApplicantRegistrationController(
    usecase,
    presenter
  )

  return controller
}

export const universitaryApplicantRegistrationFactory = factory()
