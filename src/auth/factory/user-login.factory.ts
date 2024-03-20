import UserLoginUseCase from '@auth/application/usecase/user-login.usecase'
import { type LoggedUserModel } from '@auth/domain/ports/application/application-domain.model'
import UserLoginDomainService from '@auth/domain/services/user-login.service'
import { userRepository } from '@auth/infrastructure/repositories/auth-repository.adapter'
import { type ControllerInputPort } from '@core/application/ports/controller-input.port'
import SuccessfulInsertRequestPresenter from '@core/application/presenter/successful-insert-request.presenter'
import CacheService from '@core/application/service/cache.service'
import { type StoreTokenModel } from '@core/domain/models/token/token.model'
import { passwordEncryptorService } from '@core/infrastructure/argon/password-encryptor.adapter'
import { jwtTokenService } from '@core/infrastructure/jsonwebtoken/jwt-token.adapter'

function factory (): ControllerInputPort {
  const service = new UserLoginDomainService(
    userRepository,
    passwordEncryptorService,
    jwtTokenService,
    new CacheService<StoreTokenModel>()
  )

  const presenter = new SuccessfulInsertRequestPresenter<LoggedUserModel>()

  const usecase = new UserLoginUseCase(
    service,
    presenter
  )

  return usecase
}

export const userLoginFactory = factory()
