import { type UserAccountEntity, type ProfileInfoEntity } from '@core/models/entities/auth.entity'
import { type UUID } from '@core/models/generic/custom-types.model'

export type UniversitaryApplicantRegistrationIC = Omit<ProfileInfoEntity, 'id'>

export type ResetUserPasswordIC = Pick<UserAccountEntity, 'username'> & {
  rol?: string
  prevPassword?: string
  newPassword: string
}

export type UserLoginIC = Pick<UserAccountEntity, 'password' | 'username'>

export type UniversityProfessorRegistrationIC = Pick<ProfileInfoEntity, 'firstname' | 'lastname' | 'personalEmail'> &
Pick<UserAccountEntity, 'password'>

export type UpgradeGuestUserAccountToStudentIC = Pick<UserAccountEntity, 'id'>

export type ResetPasswordIC = Pick<UserAccountEntity, 'username' | 'password'> & {
  newPassword: string
}

export interface RefreshTokenIC {
  userId: UUID
}
