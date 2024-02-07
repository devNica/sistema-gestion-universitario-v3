import { type UUID } from '@core/models/generic/custom-types.model'
import { type UniversitaryApplicantRegistrationIC, type UserProfileRegistrationIC, type UserRegistrationIC } from '../controllers/controller-input.model'

export type UserRegistrationIR = Pick<UserRegistrationIC, 'username' | 'profileId'> & {
  passwordHashed: string
}

export type UserProfileRegistrationIR = Required<UserProfileRegistrationIC>

export type UniversitaryApplicantRegistrationIR = Required<UniversitaryApplicantRegistrationIC> & {
  username: string
  passwordHashed: string
  rolId: UUID
}
