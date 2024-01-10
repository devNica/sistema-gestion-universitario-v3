import { type UserAccountEntity } from '../entities/UserAccountEntity'

export interface TokenModel {
  userId: string
  token: string
  expiresIn: string
}

export type TokenPayloadModel = Pick<UserAccountEntity, 'id'>

export interface SignedToken {
  token: string
  expirationDate: Date
}

export type TokenResponseModel = Pick<TokenModel, 'userId' | 'expiresIn'>
