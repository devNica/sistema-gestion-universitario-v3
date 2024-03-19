/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IsAuthenticatedMiddlewareAdapter } from '@core/application/middlewares/is-auth.middleware'
import { jwtTokenService } from '@core/infraestructure/jsonwebtoken/jwt-token.adapter'

function factory () {
  const authMiddleware = new IsAuthenticatedMiddlewareAdapter(
    jwtTokenService, 'administrador'
  )

  return authMiddleware
}

export const authenticateAdminFactory = factory()
