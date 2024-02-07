import { type FetchUserAccountIR, type ResetUserPasswordIR, type UniversitaryApplicantRegistrationIR } from '@auth/models/repositories/repository-input.model'
import { type UserProfileOR, type RolOR, type UserAccountOR } from '@auth/models/repositories/repository-output.model'

export interface CreateUserAccountOP {
  create: (data: UniversitaryApplicantRegistrationIR) => Promise<UserAccountOR | never>
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
