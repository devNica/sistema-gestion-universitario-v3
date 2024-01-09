import { type UserAccountEntity } from '../entities/UserAccountEntity'

export type UserRegisterRepoModel = Pick<UserAccountEntity, 'email' | 'password' | 'isRoot' | 'createdAt'>

export type UserParamsRepoModel = Partial<Pick<UserAccountEntity, 'id' | 'email' | 'username'>>

export type UserListRepoModel = Omit<UserAccountEntity, 'createdAt' | 'updatedAt'>
