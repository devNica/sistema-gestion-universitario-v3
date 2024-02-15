import { type VerifiedTokenResponseModel, type SignedToken, type TokenPayloadModel } from '@core/models/token/token.model'

export interface JWTOutputPort {
  signAccessToken: (payload: TokenPayloadModel) => SignedToken
  signRefreshToken: (payload: TokenPayloadModel) => SignedToken
  verify: (jwtToken: string, isAccessToken?: boolean) => VerifiedTokenResponseModel
}
