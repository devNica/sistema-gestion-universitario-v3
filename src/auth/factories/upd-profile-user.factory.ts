import { UpdateProfileUserController } from '@auth/controllers/upd-profile-user.controller'
import { type EmptyResponseModel } from '@auth/models/controllers/generic-controller.model'
import UpdateProfileUserService from '@auth/services/upd-profile-user.service'
import SuccessfulInsertRequestPresenter from '@core/adapters/primary/presenters/successful-insert-request.presenter'
import { updateUserRepo } from '@core/adapters/secondary/repositories/typeorm/user-repository.adapter'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'

function factory (): ControllerInputPort {
  const service = new UpdateProfileUserService(
    updateUserRepo
  )

  const presenter = new SuccessfulInsertRequestPresenter<EmptyResponseModel>()

  const controller = new UpdateProfileUserController(
    service,
    presenter
  )

  return controller
}

export const updateProfileUserFactory = factory()
