import UserLoginController from '@auth/controllers/user-login.controller'
import { type UserLoginOC } from '@auth/models/controllers/controller-output.model'
import UserLoginService from '@auth/services/user-login.service'
import SuccessFulRequestPresenter from '@core/adapters/primary/presenters/successful-request.presenter'
import { fetchAccountByUsernameRepo } from '@core/adapters/secondary/repositories/useraccount-repository.adapter'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { passwordEncryptorService } from '@core/services/encrypters/password-encryptor.service'
import { jwtTokenService } from '@core/services/token/jsonwebtoken.service'

function factory (): ControllerInputPort {
  const service = new UserLoginService(
    fetchAccountByUsernameRepo,
    passwordEncryptorService,
    jwtTokenService
  )

  const presenter = new SuccessFulRequestPresenter<UserLoginOC>()

  const controller = new UserLoginController(
    service,
    presenter
  )

  return controller
}

export const userLoginFactory = factory()
