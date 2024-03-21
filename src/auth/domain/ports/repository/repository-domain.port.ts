import { type ProfessorRegistrationRepositoryModel, type GuestRegistrationRepositoryModel } from './repository-domain.model'
import { type RolEntity, type UserEntity } from '@auth/domain/entities/AuthEntity'

export interface CreateUserPort {
  createProfessor: (data: ProfessorRegistrationRepositoryModel) => Promise<void | never>
  createGuest: (data: GuestRegistrationRepositoryModel) => Promise<void | never>
}

export interface RolRepositoryPort<T extends RolEntity> {
  fetch: (data: Partial<Pick<T, keyof T>>) => Promise<RolEntity | never>
}

export interface UserRepositoryPort<T extends UserEntity> {
  fetch: (data: Partial<Pick<T, keyof T>>) => Promise<UserEntity | never>
  updatePassword: (params: Partial<Pick<T, 'username' | 'userId'>>, data: Partial<Pick<T, 'passwordHashed' | 'expiresIn'>>) => Promise<void>
  upgrade: (data: Pick<T, 'userId' | 'rolInfo'>) => Promise<void>
}

export interface UserSpecificationPort<T extends UserEntity> {
  isGuestUser: (data: Pick<T, 'userId'>) => Promise<boolean>
}
