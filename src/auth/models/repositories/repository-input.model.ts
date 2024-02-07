import { type UUID } from '@core/models/generic/custom-types.model'
import { type UserLoginIC, type ResetUserPasswordIC, type UniversitaryApplicantRegistrationIC } from '../controllers/controller-input.model'

export type UniversitaryApplicantRegistrationIR = Required<UniversitaryApplicantRegistrationIC> & {
  username: string
  passwordHashed: string
  rolId: UUID
}

export type ResetUserPasswordIR = Omit<ResetUserPasswordIC, 'newPassword'> & {
  passwordHashed: string
}

export type FetchUserAccountIR = Pick<UserLoginIC, 'username'>
