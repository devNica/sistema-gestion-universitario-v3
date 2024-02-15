import { type UserAccountEntity } from '../entities/auth.entity'
import { type UUID } from '../generic/custom-types.model'

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

export interface StoreTokenModel {
  token: string
  userId: UUID
  createdAt: number
}

export interface VerifiedTokenResponseModel {
  id: string
  rol: string
}
