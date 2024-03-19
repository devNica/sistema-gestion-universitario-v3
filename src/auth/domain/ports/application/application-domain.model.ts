import { type AuthenticationRolModel } from '@core/domain/models/api/auth.model'

export interface ProfessorRegistrationApplicationModel {
  personalEmail: string
  password: string
  firstname: string
  lastname: string
}

export interface RegisteredAccountApplicationModel {
  password?: string
  username: string
}

export interface GuestRegistrationApplicationModel {
  personalEmail: string
  firstname: string
  lastname: string
  address: string
  dni: string
  phoneNumber: string
  birthdate: string
  nationality: string
  initAccu: number
}

export interface UserLoginApplicationModel {
  username: string
  password: string
}

export interface LoggedUserModel {
  token: string
  firstname: string
  lastname: string
  nameAcronyms: string
}

export interface RefreshTokenModel {
  userId: string
}

export interface NewTokenModel {
  token: string
}

export interface ResetPasswordModel {
  username: string
  newPassword: string
  prevPassword: string
  rol?: AuthenticationRolModel
}

export interface PromoteAccountModel {
  userId: string
}
