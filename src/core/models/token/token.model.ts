// import { type UserAccountEntity } from '../entities/UserAccountEntity'

export interface TokenModel {
  userId: string
  token: string
  expiresIn: string
}

export interface TokenPayloadModel {
  userId: string
  rol: string
}

export interface SignedToken {
  token: string
  expirationDate: Date
}

export type TokenResponseModel = Pick<TokenModel, 'userId' | 'expiresIn'>
