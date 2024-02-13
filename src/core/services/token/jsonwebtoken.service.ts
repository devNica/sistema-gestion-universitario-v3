/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type TokenPayloadModel, type SignedToken } from '@core/models/token/token.model'
import { type JWTOutputPort } from '@core/ports/output/security/jwt-output.port'
import constants from '@core/shared/constants'
import { createFutureDate } from '@core/shared/utils/create-future-date'
import jwt from 'jsonwebtoken'

export class JsonWebTokenService implements JWTOutputPort {
  constructor (
    private readonly secret: string,
    private readonly refreshSecret: string,
    private readonly accessTokenExpirationInSecond = 600, // 10 minutes
    private readonly refreshTokenExpirationInSecond = 1800 // 30 minutes
  ) {}

  signAccessToken (payload: TokenPayloadModel): SignedToken {
    const expirationDate = createFutureDate(
      new Date(),
      this.accessTokenExpirationInSecond
    )

    const token = jwt.sign(payload, this.secret, {
      expiresIn: this.accessTokenExpirationInSecond
    })

    return { token, expirationDate }
  }

  signRefreshToken (payload: TokenPayloadModel): SignedToken {
    const expirationDate = createFutureDate(
      new Date(),
      this.refreshTokenExpirationInSecond
    )

    const token = jwt.sign(payload, this.refreshSecret, {
      expiresIn: this.refreshTokenExpirationInSecond
    })

    return { token, expirationDate }
  }

  verify (token: string, isAccessToken?: boolean | undefined): string {
    const secret = isAccessToken ? this.secret : this.refreshSecret
    const userData = jwt.verify(token, secret) as { id: string }
    return userData.id
  }
}

const secret = constants.JWT_SECRET
const refreshSecret = constants.JWT_SECRET_REFRESH
const secretExpiration = Number(constants.JWT_SECRET_EXPIRATION_SECS)
const refreshSecretExpiration = Number(constants.JWT_SECRET_REFRESH_EXPIRATION_SECS)

export const jwtTokenService = new JsonWebTokenService(
  secret,
  refreshSecret,
  secretExpiration,
  refreshSecretExpiration
)

console.log(jwtTokenService)
