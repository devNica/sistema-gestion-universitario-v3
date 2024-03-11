import { type UUID } from '@core/models/generic/custom-types.model'
import { type UniversitaryProfessorRegistrationIR, type FetchUserAccountIR, type ResetUserPasswordIR, type UniversitaryApplicantRegistrationIR, type PromoteGuestUserAccountToStudentIR, type VerifyUserRoleIR } from '../../models/repositories/repository-input.model'
import { type UserProfileOR, type RolOR, type UserAccountOR } from '../../models/repositories/repository-output.model'

export interface RegisterInitAccuOP {
  registerInitAccu: (initAccu: number, applicantId: UUID) => Promise<void>
}

export interface CreateGuestUserOP {
  createGuestUser: (data: UniversitaryApplicantRegistrationIR) => Promise<UserAccountOR | never>
}

export interface CreateProfessorUserOP {
  createProfessorUser: (data: UniversitaryProfessorRegistrationIR) => Promise<UserAccountOR | never>
}

export interface FetchRolByNameOP {
  fetchRol: (rolName: string) => Promise<RolOR | never>
}

export interface UpdateUserAccountPasswordOP {
  updatePassword: (data: ResetUserPasswordIR) => Promise<void>
}

export interface FetchUserAccountByParamsOP {
  fetchAccount: (data: FetchUserAccountIR) => Promise<UserProfileOR | never>
}

export interface PromoteUserAccountOP {
  promoteUser: (data: PromoteGuestUserAccountToStudentIR) => Promise<void | never>
}

export interface VerifyUserRoleOP {
  verifyUserRole: (data: VerifyUserRoleIR) => Promise<boolean>
}