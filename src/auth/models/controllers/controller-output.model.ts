import { type UserAccountOR, type ProfilePersonOR } from '../repositories/repository-output.model'

export type UserProfileRegistrationOC = Pick<ProfilePersonOR, 'id' | 'phoneNumber'> & {
  fullname: string
}

export type UniversitaryApplicantRegistrationOC = Pick<UserAccountOR, 'username' | 'password'>
