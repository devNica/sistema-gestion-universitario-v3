import { RegisterCommonUserController } from '@auth/controllers/reg-common-user.controller'
import { type EmptyResponseModel } from '@auth/models/controllers/generic-controller.model'
import RegisterCommonUserService from '@auth/services/reg-common-user.service'
import SuccessfulInsertRequestPresenter from '@core/adapters/primary/presenters/successful-insert-request.presenter'
import { insertUserRepo } from '@core/adapters/secondary/repositories/typeorm/user-repository.adapter'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { passwordEncryptorService } from '@core/services/encrypters/password-encryptor.service'

function factory (): ControllerInputPort {
  const service = new RegisterCommonUserService(
    insertUserRepo,
    passwordEncryptorService
  )

  const presenter = new SuccessfulInsertRequestPresenter<EmptyResponseModel>()

  const controller = new RegisterCommonUserController(
    service,
    presenter
  )

  return controller
}

export const registerCommonUserFactory = factory()
