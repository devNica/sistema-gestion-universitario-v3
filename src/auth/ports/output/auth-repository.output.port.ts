import { type UserProfileRegistrationIR, type UserRegistrationIR } from '@auth/models/repositories/repository-input.model'
import { type ProfilePersonOR } from '@auth/models/repositories/repository-output.model'

export interface CreateUserAccountOP {
  create: (data: UserRegistrationIR) => Promise<void | never>
}

export interface CreateUserProfileOP {
  createUserProfile: (data: UserProfileRegistrationIR) => Promise<ProfilePersonOR | never>
}
