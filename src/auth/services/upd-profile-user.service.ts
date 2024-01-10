import { type UserProfileServiceModel } from '@auth/models/services/auth-service.model'
import { type UpdateUserRepositoryI } from '@core/ports/output/repositories/user-repository-output.port'

export interface UpdProfileUserSrvI {
  UpdProfileUserSrvI: (data: UserProfileServiceModel) => Promise<void>
}

export default class UpdateProfileUserService implements UpdProfileUserSrvI {
  constructor (
    private readonly repository: UpdateUserRepositoryI
  ) { }

  async UpdProfileUserSrvI (data: UserProfileServiceModel): Promise<void> {
    await this.repository.updateUser({
      id: data.id,
      email: data.email,
      phoneNumber: data.phoneNumber,
      fullname: data.fullname,
      updatedAt: new Date().toISOString()
    })
  }
}
