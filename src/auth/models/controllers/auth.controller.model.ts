export interface UserLoginResponseModel {
  id: string
  fullname: string
  email: string
  token: string
}

export interface UpdateProfileControllerModel {
  id: string
  email?: string
  phoneNumber?: string
  fullname?: string
}
