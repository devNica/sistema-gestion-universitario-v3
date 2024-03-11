import { type UUID } from '@core/models/generic/custom-types.model'
import { type UserLoginIC, type ResetUserPasswordIC, type UniversitaryApplicantRegistrationIC, type UniversityProfessorRegistrationIC, type UpgradeGuestUserAccountToStudentIC } from '../controllers/controller-input.model'
import { type RolEntity, type UserAccountEntity } from '@core/models/entities/auth.entity'

export type UniversitaryApplicantRegistrationIR = Omit<UniversitaryApplicantRegistrationIC, 'initAccu'> & {
  username: string
  passwordHashed: string
  rolId: UUID
  expiresIn: number
}

export type ResetUserPasswordIR = Omit<ResetUserPasswordIC, 'newPassword'> & {
  passwordHashed: string
  expiresIn: number
}

export type FetchUserAccountIR = Partial<Pick<UserLoginIC, 'username'>> & {
  userId?: UUID | string
}

export type UniversitaryProfessorRegistrationIR = Omit<UniversityProfessorRegistrationIC, 'password'> & {
  passwordHashed: string
  username: string
  rolId: UUID
  expiresIn: number
}

export type PromoteGuestUserAccountToStudentIR = Required<UpgradeGuestUserAccountToStudentIC> & {
  rolId: UUID
}

export type VerifyUserRoleIR = Pick<RolEntity, 'rol'> & Pick<UserAccountEntity, 'id'>