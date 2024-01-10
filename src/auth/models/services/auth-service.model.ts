export interface UserRegisterServiceModel {
  email: string
  password: string
}

export interface UserSigninServiceModel extends UserRegisterServiceModel {}
