import { type UniversitaryApplicantRegistrationIR } from '@auth/models/repositories/repository-input.model'
import { type RolOR, type UserAccountOR } from '@auth/models/repositories/repository-output.model'

export interface CreateUserAccountOP {
  create: (data: UniversitaryApplicantRegistrationIR) => Promise<UserAccountOR | never>
}

export interface FetchRolByNameOP {
  fetchRol: (rolName: string) => Promise<RolOR | never>
}
