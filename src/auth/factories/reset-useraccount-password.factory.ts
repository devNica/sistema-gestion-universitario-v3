import ResetUserAccountPasswordController from '@auth/controllers/reset-useraccount-password.controller'
import ResetUserAccountPasswordService from '@auth/services/reset-useraccount-password.service'
import SuccessFulUpdatedPresenter from '@core/adapters/primary/presenters/successful-update.presenter'
import { updateUserAccountPasswordRepo } from '@core/adapters/secondary/repositories/useraccount-repository.adapter'
import { type EmptyResponseModel } from '@core/models/generic/response.model'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { passwordEncryptorService } from '@core/services/encrypters/password-encryptor.service'

function factory (): ControllerInputPort {
  const service = new ResetUserAccountPasswordService(
    updateUserAccountPasswordRepo,
    passwordEncryptorService
  )

  const presenter = new SuccessFulUpdatedPresenter<EmptyResponseModel>()

  const controller = new ResetUserAccountPasswordController(
    service,
    presenter
  )

  return controller
}

export const resetUserAccountPasswordFactory = factory()
