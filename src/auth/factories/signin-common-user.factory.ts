import { SigninCommonUserController } from '@auth/controllers/signin-common-user.controller'
import { type UserLoginResponseModel } from '@auth/models/controllers/auth.controller.model'
import SigninCommonUserService from '@auth/services/signin-common-user.service'
import SuccessFulRequestPresenter from '@core/adapters/primary/presenters/successful-request.presenter'
import { fetchUsersByParamsRepo } from '@core/adapters/secondary/repositories/typeorm/user-repository.adapter'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { passwordEncryptorService } from '@core/services/encrypters/password-encryptor.service'
import { jwtTokenService } from '@core/services/token/jsonwebtoken.service'

function factory (): ControllerInputPort {
  const service = new SigninCommonUserService(
    fetchUsersByParamsRepo,
    passwordEncryptorService,
    jwtTokenService
  )

  const presenter = new SuccessFulRequestPresenter<UserLoginResponseModel>()

  const controller = new SigninCommonUserController(
    service,
    presenter
  )

  return controller
}

export const loginCommonUserFactory = factory()
