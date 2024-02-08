import { type UserAccountEntity, type ProfileInfoEntity } from '@core/models/entities/auth.entity'

export type UniversitaryApplicantRegistrationIC = Omit<ProfileInfoEntity, 'id'>

export type ResetUserPasswordIC = Pick<UserAccountEntity, 'username'> & {
  newPassword: string
}

export type UserLoginIC = Pick<UserAccountEntity, 'password' | 'username'>

export type UniversityProfessorRegistrationIC = Pick<ProfileInfoEntity, 'firstname' | 'lastname' | 'personalEmail'> &
Pick<UserAccountEntity, 'password'>

export type UpgradeGuestUserAccountToStudentIC = Pick<UserAccountEntity, 'id'>
