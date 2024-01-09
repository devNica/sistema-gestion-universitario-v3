import { type UserRegisterServiceModel } from '@auth/models/services/auth-service.model'
import { type InsertUserRepoI } from '@core/ports/output/repositories/user-repository-output.port'

export interface RegisterCommonUserSrvI {
  createCommonUser: (data: UserRegisterServiceModel) => Promise<void>
}

export default class RegisterCommonUserService implements RegisterCommonUserSrvI {
  constructor (
    private readonly repository: InsertUserRepoI
  ) { }

  async createCommonUser (data: UserRegisterServiceModel): Promise<void> {
    await this.repository.create({
      email: data.email,
      password: data.password,
      isRoot: false,
      createdAt: new Date().toISOString()
    })
  }
}
