/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IsAuthenticatedMiddlewareAdapter } from '@core/adapters/primary/middlewares/is-authenticated-middleware.adapter'
import { jwtTokenService } from '@core/services/token/jsonwebtoken.service'

function factory () {
  const authMiddleware = new IsAuthenticatedMiddlewareAdapter(
    jwtTokenService, 'administrador'
  )

  return authMiddleware
}

export const authenticateAdminFactory = factory()
