import { type TokenPayloadModel, type SignedToken } from '@core/application/models/token/token.model'
import { type VerifiedTokenResponseModel } from '@core/domain/models/token/token.model'

export interface TokenServiceOutputPort {
  signAccessToken: (payload: TokenPayloadModel) => SignedToken
  signRefreshToken: (payload: TokenPayloadModel) => SignedToken
  verify: (jwtToken: string, isAccessToken?: boolean) => VerifiedTokenResponseModel
}
