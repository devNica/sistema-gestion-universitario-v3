import { fetchUserAccountByParamsRepo } from '@auth/interface/adapters/secondary/repositories/auth-repository.adapter'
import UserLoginController from '@auth/interface/adapters/primary/controllers/user-login.controller'
import { type UserLoginOC } from '@auth/domain/models/controllers/controller-output.model'
import UserLoginUsecase from '@auth/application/usecase/user-login.usecase'
import SuccessFulRequestPresenter from '@core/adapters/primary/presenters/successful-request.presenter'
import { type StoreTokenModel } from '@core/models/token/token.model'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import CacheService from '@core/services/cache/cache.service'
import { passwordEncryptorService } from '@core/services/encrypters/password-encryptor.service'
import { jwtTokenService } from '@core/services/token/jsonwebtoken.service'

function factory (): ControllerInputPort {
  const usecase = new UserLoginUsecase(
    fetchUserAccountByParamsRepo,
    passwordEncryptorService,
    jwtTokenService,
    new CacheService<StoreTokenModel>()
  )

  const presenter = new SuccessFulRequestPresenter<UserLoginOC>()

  const controller = new UserLoginController(
    usecase,
    presenter
  )

  return controller
}

export const userLoginFactory = factory()
