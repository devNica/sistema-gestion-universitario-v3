import { type UserAccountOR, type UserProfileOR } from '../repositories/repository-output.model'

export type UniversitaryApplicantRegistrationOC = Pick<UserAccountOR, 'username' | 'password'>

export type UserLoginOC = Pick<UserProfileOR, 'firstname' | 'lastname' > & {
  nameAcronyms: string
  token: string
}

export type UniversityProfessorRegistrationOC = Pick<UserProfileOR, 'username'>

export interface RefreshTokenOC {
  token: string
}