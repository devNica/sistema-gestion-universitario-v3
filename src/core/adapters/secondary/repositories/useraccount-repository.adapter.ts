import { type UserRegistrationIR } from '@auth/models/repositories/repository-input.model'
import { type CreateUserProfileOP, type CreateUserAccountOP } from '@auth/ports/output/auth-repository.output.port'
import { ProfileInfoModel, UserAccountModel } from '../orm/sequelize/models'
import { UniqueConstraintError } from 'sequelize'
import RepositoryValidationErrorPresenter from '@core/adapters/primary/presenters/repository-validation-error.presenter'
import InternalServerErrorPresenter from '@core/adapters/primary/presenters/internal-server-error.presenter'
import { type UserProfileRegistrationIC } from '@auth/models/controllers/controller-input.model'
import { type ProfilePersonOR } from '@auth/models/repositories/repository-output.model'

class UserAccountRepositoryAdapter implements CreateUserAccountOP, CreateUserProfileOP {
  async createUserProfile (data: Required<UserProfileRegistrationIC>): Promise<ProfilePersonOR | never> {
    try {
      const newProfile = await ProfileInfoModel.create({ ...data })
      return newProfile
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new RepositoryValidationErrorPresenter(error.message)
      } else {
        throw new InternalServerErrorPresenter('Creacion de perfil de usaurio fallida')
      }
    }
  }

  async create (data: UserRegistrationIR): Promise<void | never> {
    try {
      await UserAccountModel.create({
        email: data.email,
        password: data.passwordHashed,
        profileId: data.profileId
      })
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new RepositoryValidationErrorPresenter(error.message)
      } else {
        throw new InternalServerErrorPresenter('Creacion de cuenta de usuario fallida')
      }
    }
  }
}

const userAccountRepoAdapter = new UserAccountRepositoryAdapter()

const createUserAccountRepo: CreateUserAccountOP = userAccountRepoAdapter
const createUserProfileRepo: CreateUserProfileOP = userAccountRepoAdapter

export {
  createUserAccountRepo,
  createUserProfileRepo
}
