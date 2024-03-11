import { type RefreshTokenIC, type ResetUserPasswordIC, type UniversitaryApplicantRegistrationIC, type UniversityProfessorRegistrationIC, type UpgradeGuestUserAccountToStudentIC, type UserLoginIC } from '@auth/domain/models/controllers/controller-input.model'
import { type RefreshTokenOC, type UniversitaryApplicantRegistrationOC, type UniversityProfessorRegistrationOC, type UserLoginOC } from '@auth/domain/models/controllers/controller-output.model'
import { type EmptyResponseModel } from '@core/models/generic/response.model'

export interface RefreshTokenUsecaseIP {
  refreshToken: (request: RefreshTokenIC) => Promise<RefreshTokenOC>
}

export interface ResetUserAccountPasswordUsecaseIP {
  resetPassword: (request: ResetUserPasswordIC) => Promise<EmptyResponseModel>
}

export interface UniversitaryApplicantRegistrationIP {
  register: (request: UniversitaryApplicantRegistrationIC) => Promise<UniversitaryApplicantRegistrationOC>
}

export interface UniversityProfessorRegistrationUsecaseIP {
  register: (request: UniversityProfessorRegistrationIC) => Promise<UniversityProfessorRegistrationOC>
}

export interface UserLoginUsecaseIP {
  login: (request: UserLoginIC) => Promise<UserLoginOC>
}

export interface UpgradeGuestUserToStudentUsecaseIP {
  upgrade: (request: UpgradeGuestUserAccountToStudentIC) => Promise<EmptyResponseModel>
}
