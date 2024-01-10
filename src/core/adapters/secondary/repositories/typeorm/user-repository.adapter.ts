import { type InsertUserRepoI, type FetchUserByParamsRepoI, type UpdateUserRepositoryI } from '@core/ports/output/repositories/user-repository-output.port'
import { UserAccountModel } from '../../orm/typeorm/models/UserAccountModel'
import { Like, QueryFailedError } from 'typeorm'
import { type UserUpdateRepoModel, type UserListRepoModel, type UserParamsRepoModel, type UserRegisterRepoModel } from '@core/models/repositories/user-repository.model'
import RepositoryValidationErrorPresenter from '@core/adapters/primary/presenters/repository-validation-error.presenter'
import InternalServerErrorPresenter from '@core/adapters/primary/presenters/internal-server-error.presenter'
import GenericErrorPresenter from '@core/adapters/primary/presenters/generic-error.presenter'

class UserRepositoryAdapter implements InsertUserRepoI, FetchUserByParamsRepoI, UpdateUserRepositoryI {
  async create (data: UserRegisterRepoModel): Promise<void | never> {
    try {
      await UserAccountModel.save({ ...data })
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new RepositoryValidationErrorPresenter(error.message)
      } else {
        throw new InternalServerErrorPresenter('Error desconocido en el repositorio de usuarios')
      }
    }
  }

  async fetchByParams (data: UserParamsRepoModel): Promise<UserListRepoModel[] | never> {
    try {
      const rows = await UserAccountModel.find({
        where: [
          { fullname: Like(`%${data.fullname ?? '-'}%`) },
          { email: Like(`%${data.email ?? '-'}%`) }
        ]
      })

      return rows
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new RepositoryValidationErrorPresenter(error.message)
      } else {
        throw new InternalServerErrorPresenter('Error desconocido en el repositorio de usuarios')
      }
    }
  }

  async updateUser (data: UserUpdateRepoModel): Promise<void> {
    try {
      const user = await UserAccountModel.findOneBy({ id: data.id })
      if (user !== null) {
        user.email = data.email ?? user.email
        user.fullname = data.fullname ?? user.fullname
        user.phoneNumber = data.phoneNumber ?? user.phoneNumber
        await user.save()
      } else throw new GenericErrorPresenter('Usuario no encontrado')
    } catch (error) {
      if (error instanceof QueryFailedError || error instanceof GenericErrorPresenter) {
        throw new RepositoryValidationErrorPresenter(error.message)
      } else {
        throw new InternalServerErrorPresenter('Error desconocido actualizacion de perfil de usuario')
      }
    }
  }
}

const userRepositoryAdapter = new UserRepositoryAdapter()
const insertUserRepo: InsertUserRepoI = userRepositoryAdapter
const fetchUsersByParamsRepo: FetchUserByParamsRepoI = userRepositoryAdapter
const updateUserRepo: UpdateUserRepositoryI = userRepositoryAdapter

export {
  insertUserRepo,
  fetchUsersByParamsRepo,
  updateUserRepo
}
