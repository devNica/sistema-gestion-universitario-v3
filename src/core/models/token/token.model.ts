import { type UserAccountEntity } from '../entities/auth.entity'

export interface TokenModel {
  userId: string
  token: string
  expiresIn: string
}

export type TokenPayloadModel = Pick<UserAccountEntity, 'id'> & {
  rol: string
}

export interface SignedToken {
  token: string
  expirationDate: Date
}

export type TokenResponseModel = Pick<TokenModel, 'userId' | 'expiresIn'>
