import { type InsertUserRepoI, type FetchUserByParamsRepoI } from '@core/ports/output/repositories/user-repository-output.port'
import { UserAccountModel } from '../../orm/typeorm/models/UserAccountModel'
import { Like, QueryFailedError } from 'typeorm'
import { type UserListRepoModel, type UserParamsRepoModel, type UserRegisterRepoModel } from '@core/models/repositories/user-repository.model'
import RepositoryValidationErrorPresenter from '@core/adapters/primary/presenters/repository-validation-error.presenter'
import InternalServerErrorPresenter from '@core/adapters/primary/presenters/internal-server-error.presenter'

class UserRepositoryAdapter implements InsertUserRepoI, FetchUserByParamsRepoI {
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
          { username: Like(`%${data.username ?? '-'}%`) },
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
}

const userRepositoryAdapter = new UserRepositoryAdapter()
const insertUserRepo: InsertUserRepoI = userRepositoryAdapter
const fetchUsersByParamsRepo: FetchUserByParamsRepoI = userRepositoryAdapter

export {
  insertUserRepo,
  fetchUsersByParamsRepo
}
