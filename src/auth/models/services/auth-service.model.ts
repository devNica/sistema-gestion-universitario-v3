import { type UpdateProfileControllerModel } from '../controllers/auth.controller.model'

export interface UserRegisterServiceModel {
  email: string
  password: string
}

export interface UserSigninServiceModel extends UserRegisterServiceModel {}

export interface UserProfileServiceModel extends UpdateProfileControllerModel {}
