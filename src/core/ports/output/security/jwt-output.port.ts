import { type SignedToken, type TokenPayloadModel } from '@core/models/token/token.model'

export interface JWTOutputPort {
  signAccessToken: (payload: TokenPayloadModel) => SignedToken
  verify: (jwtToken: string, isAccessToken?: boolean) => string
}