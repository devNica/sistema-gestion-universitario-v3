import RefreshTokenUseCase from '@auth/application/usecase/refresh-token.usecase'
import { type NewTokenModel } from '@auth/domain/ports/application/application-domain.model'
import RefreshTokenDomainService from '@auth/domain/services/refresh-token.service'
import { userRepository } from '@auth/infrastructure/repositories/auth-repository.adapter'
import { type ControllerInputPort } from '@core/application/ports/controller-input.port'
import SuccessfulRequestPresenter from '@core/application/presenter/successful-request.presenter'
import CacheService from '@core/application/service/cache.service'
import { type StoreTokenModel } from '@core/domain/models/token/token.model'
import { jwtTokenService } from '@core/infrastructure/jsonwebtoken/jwt-token.adapter'

function factory (): ControllerInputPort {
  const service = new RefreshTokenDomainService(
    userRepository,
    jwtTokenService,
    new CacheService<StoreTokenModel>()
  )

  const presenter = new SuccessfulRequestPresenter<NewTokenModel>()

  const usecase = new RefreshTokenUseCase(
    service,
    presenter
  )

  return usecase
}

export const refreshTokenFactory = factory()
