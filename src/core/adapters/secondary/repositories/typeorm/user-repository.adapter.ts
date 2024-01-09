import { type InsertUserRepoI, type FetchUserByParamsRepoI } from '@core/ports/output/repositories/user-repository-output.port'
import { UserAccountModel } from '../../orm/typeorm/models/UserAccountModel'
import { Like } from 'typeorm'
import { type UserListRepoModel, type UserParamsRepoModel, type UserRegisterRepoModel } from '@core/models/repositories/user-repository.model'

class UserRepositoryAdapter implements InsertUserRepoI, FetchUserByParamsRepoI {
  async create (data: UserRegisterRepoModel): Promise<void | never> {
    try {
      await UserAccountModel.save({ ...data })
    } catch (error) {
      throw new Error(String(error))
    }
  }

  async fetchByParams (data: UserParamsRepoModel): Promise<UserListRepoModel[] | never> {
    try {
      const rows = await UserAccountModel.find({
        where: [
          { id: Like(`%${data.id ?? '-'}%`) },
          { username: Like(`%${data.username ?? '-'}%`) },
          { email: Like(`%${data.email ?? '-'}%`) }
        ]
      })

      return rows
    } catch (error) {
      throw new Error(String(error))
    }
  }
}

const userRepositoryAdapter = new UserRepositoryAdapter()
const insertUserRepo: InsertUserRepoI = userRepositoryAdapter

export {
  insertUserRepo
}
