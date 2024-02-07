import UserAccountRegistrationController from '@auth/controllers/useraccount-registration.controller'
import { UserAccountRegistrationService } from '@auth/services/useraccount-registration.service'
import SuccessfulInsertRequestPresenter from '@core/adapters/primary/presenters/successful-insert-request.presenter'
import { createUserAccountRepo } from '@core/adapters/secondary/repositories/useraccount-repository.adapter'
import { type EmptyResponseModel } from '@core/models/generic/response.model'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { passwordEncryptorService } from '@core/services/encrypters/password-encryptor.service'

function factory (): ControllerInputPort {
  const service = new UserAccountRegistrationService(
    createUserAccountRepo,
    passwordEncryptorService
  )

  const presenter = new SuccessfulInsertRequestPresenter<EmptyResponseModel>()

  const controller = new UserAccountRegistrationController(
    service,
    presenter
  )

  return controller
}

export const userAccountRegistrationFactory = factory()
