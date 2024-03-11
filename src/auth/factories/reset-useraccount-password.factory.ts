import { updateUserAccountPasswordRepo, fetchUserAccountByParamsRepo } from '@auth/interface/adapters/secondary/repositories/auth-repository.adapter'
import ResetUserAccountPasswordController from '@auth/interface/adapters/primary/controllers/reset-useraccount-password.controller'
import ResetUserAccountPasswordUsecase from '@auth/application/usecase/reset-useraccount-password.usecase'
import SuccessFulUpdatedPresenter from '@core/adapters/primary/presenters/successful-update.presenter'
import { type EmptyResponseModel } from '@core/models/generic/response.model'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { passwordEncryptorService } from '@core/services/encrypters/password-encryptor.service'

function factory (): ControllerInputPort {
  const usecase = new ResetUserAccountPasswordUsecase(
    updateUserAccountPasswordRepo,
    fetchUserAccountByParamsRepo,
    passwordEncryptorService
  )

  const presenter = new SuccessFulUpdatedPresenter<EmptyResponseModel>()

  const controller = new ResetUserAccountPasswordController(
    usecase,
    presenter
  )

  return controller
}

export const resetUserAccountPasswordFactory = factory()
