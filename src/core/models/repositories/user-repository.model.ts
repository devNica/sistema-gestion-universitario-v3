import { type UserAccountEntity } from '../entities/UserAccountEntity'

export type UserRegisterRepoModel = Pick<UserAccountEntity, 'email' | 'password' | 'isRoot' | 'createdAt'>

export type UserParamsRepoModel = Partial<Pick<UserAccountEntity, 'email' | 'fullname'>>

export type UserListRepoModel = Omit<UserAccountEntity, 'createdAt' | 'updatedAt'>

export type UserUpdateRepoModel = Partial<Pick<UserAccountEntity, 'email' | 'fullname' | 'phoneNumber' | 'updatedAt'>> & {
  id: string
}
