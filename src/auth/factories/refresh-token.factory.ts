import RefreshTokenController from '@auth/interface/adapters/primary/controllers/refresh-token.controller'
import { fetchUserAccountByParamsRepo } from '@auth/interface/adapters/secondary/repositories/auth-repository.adapter'
import { type RefreshTokenOC } from '@auth/domain/models/controllers/controller-output.model'
import RefreshTokenUsecase from '@auth/application/usecase/refresh-token.usecase'
import SuccessFulRequestPresenter from '@core/adapters/primary/presenters/successful-request.presenter'
import { type StoreTokenModel } from '@core/models/token/token.model'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import CacheService from '@core/services/cache/cache.service'
import { jwtTokenService } from '@core/services/token/jsonwebtoken.service'

function factory (): ControllerInputPort {
  const usecase = new RefreshTokenUsecase(
    fetchUserAccountByParamsRepo,
    jwtTokenService,
    new CacheService<StoreTokenModel>()
  )

  const presenter = new SuccessFulRequestPresenter<RefreshTokenOC>()

  const controller = new RefreshTokenController(
    usecase,
    presenter
  )

  return controller
}

export const refreshTokenFactory = factory()
