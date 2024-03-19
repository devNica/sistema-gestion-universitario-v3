import { type UserAccountEntity } from '@core/domain/entities/AuthEntity'

export interface TokenModel {
  userId: string
  token: string
  expiresIn: string
}

export type TokenPayloadModel = Pick<UserAccountEntity, 'userId'> & {
  rol: string
}

export interface SignedToken {
  token: string
  expirationDate: Date
}

export type TokenResponseModel = Pick<TokenModel, 'userId' | 'expiresIn'>
