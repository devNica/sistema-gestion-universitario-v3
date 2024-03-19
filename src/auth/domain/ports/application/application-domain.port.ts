import { type EmptyResponseModel } from '@core/domain/models/api/controller.model'
import {
  type ProfessorRegistrationApplicationModel,
  type GuestRegistrationApplicationModel,
  type RegisteredAccountApplicationModel,
  type UserLoginApplicationModel,
  type LoggedUserModel,
  type RefreshTokenModel,
  type NewTokenModel,
  type ResetPasswordModel,
  type PromoteAccountModel
} from './application-domain.model'

export interface GuestUserRegistrationPort {
  register: (data: GuestRegistrationApplicationModel) => Promise<RegisteredAccountApplicationModel>
}

export interface ProfesorUserRegistrationPort {
  register: (data: ProfessorRegistrationApplicationModel) => Promise<RegisteredAccountApplicationModel>
}

export interface UserLoginPort {
  login: (data: UserLoginApplicationModel) => Promise<LoggedUserModel>
}

export interface RefreshTokenPort {
  refreshToken: (data: RefreshTokenModel) => Promise<NewTokenModel>
}

export interface ResetPasswordPort {
  resetPassword: (data: ResetPasswordModel) => Promise<EmptyResponseModel>
}

export interface PromoteAccountPort {
  promote: (data: PromoteAccountModel) => Promise<EmptyResponseModel>
}

export interface LoginPort {
  login: () => Promise<void>
}
