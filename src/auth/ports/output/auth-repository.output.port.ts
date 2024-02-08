import { type UniversitaryProfessorRegistrationIR, type FetchUserAccountIR, type ResetUserPasswordIR, type UniversitaryApplicantRegistrationIR } from '@auth/models/repositories/repository-input.model'
import { type UserProfileOR, type RolOR, type UserAccountOR } from '@auth/models/repositories/repository-output.model'

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

export interface FetchAccountByUsernameOP {
  fetchAccount: (data: FetchUserAccountIR) => Promise<UserProfileOR | never>
}
