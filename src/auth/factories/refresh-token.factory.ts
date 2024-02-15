import RefreshTokenController from '@auth/controllers/refresh-token.controller'
import { type RefreshTokenOC } from '@auth/models/controllers/controller-output.model'
import RefreshTokenService from '@auth/services/refresh-token.service'
import SuccessFulRequestPresenter from '@core/adapters/primary/presenters/successful-request.presenter'
import { fetchUserAccountByParamsRepo } from '@core/adapters/secondary/repositories/useraccount-repository.adapter'
import { type StoreTokenModel } from '@core/models/token/token.model'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import CacheService from '@core/services/cache/cache.service'
import { jwtTokenService } from '@core/services/token/jsonwebtoken.service'

function factory (): ControllerInputPort {
  const service = new RefreshTokenService(
    fetchUserAccountByParamsRepo,
    jwtTokenService,
    new CacheService<StoreTokenModel>()
  )

  const presenter = new SuccessFulRequestPresenter<RefreshTokenOC>()

  const controller = new RefreshTokenController(
    service,
    presenter
  )

  return controller
}

export const refreshTokenFactory = factory()
