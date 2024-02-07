import { type UserProfileRegistrationIC, type UserRegistrationIC } from '../controllers/controller-input.model'

export type UserRegistrationIR = Pick<UserRegistrationIC, 'email' | 'profileId'> & {
  passwordHashed: string
}

export type UserProfileRegistrationIR = Required<UserProfileRegistrationIC>
