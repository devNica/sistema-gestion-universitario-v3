import { type UserUpdateRepoModel, type UserListRepoModel, type UserParamsRepoModel, type UserRegisterRepoModel } from '@core/models/repositories/user-repository.model'

export interface InsertUserRepoI {
  create: (data: UserRegisterRepoModel) => Promise<void | never>
}

export interface FetchUserByParamsRepoI {
  fetchByParams: (data: UserParamsRepoModel) => Promise<UserListRepoModel[] | never>
}

export interface UpdateUserRepositoryI {
  updateUser: (data: UserUpdateRepoModel) => Promise<void | never>
}
