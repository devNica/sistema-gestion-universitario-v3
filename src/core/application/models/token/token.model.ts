import { type UserEntity } from '@auth/domain/entities/AuthEntity'

export interface TokenModel {
  userId: string
  token: string
  expiresIn: string
}

export type TokenPayloadModel = Pick<UserEntity, 'userId'> & {
  rol: string
}

export interface SignedToken {
  token: string
  expirationDate: Date
}

export type TokenResponseModel = Pick<TokenModel, 'userId' | 'expiresIn'>
