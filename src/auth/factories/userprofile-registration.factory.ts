import UserProfileRegistrationController from '@auth/controllers/userprofile-registration.controller'
import { type UserProfileRegistrationOC } from '@auth/models/controllers/controller-output.model'
import { UserProfileRegistrationService } from '@auth/services/userprofile-registration.service'
import SuccessfulInsertRequestPresenter from '@core/adapters/primary/presenters/successful-insert-request.presenter'
import { createUserProfileRepo } from '@core/adapters/secondary/repositories/useraccount-repository.adapter'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'

function factory (): ControllerInputPort {
  const service = new UserProfileRegistrationService(
    createUserProfileRepo
  )

  const presenter = new SuccessfulInsertRequestPresenter<UserProfileRegistrationOC>()

  const controller = new UserProfileRegistrationController(
    service,
    presenter
  )

  return controller
}

export const userProfileRegistrationFactory = factory()
