import { type UserProfileRegistrationIC } from '@auth/models/controllers/controller-input.model'
import { type UserProfileRegistrationOC } from '@auth/models/controllers/controller-output.model'
import { type CreateUserProfileOP } from '@auth/ports/output/auth-repository.output.port'

export interface UserProfileRegistrationSrvI {
  profileRegister: (request: UserProfileRegistrationIC) => Promise<UserProfileRegistrationOC>
}

export class UserProfileRegistrationService implements UserProfileRegistrationSrvI {
  constructor (
    private readonly port: CreateUserProfileOP
  ) {}

  async profileRegister (request: UserProfileRegistrationIC): Promise<UserProfileRegistrationOC> {
    const profile = await this.port.createUserProfile({ ...request })

    return {
      id: profile.id,
      phoneNumber: profile.phoneNumber,
      fullname: `${profile.firstname} ${profile.lastname}`
    }
  }
}
