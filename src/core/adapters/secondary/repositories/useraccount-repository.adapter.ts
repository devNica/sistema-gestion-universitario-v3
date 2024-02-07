import { type UserRegistrationIR } from '@auth/models/repositories/repository-input.model'
import { type CreateUserProfileOP, type CreateUserAccountOP } from '@auth/ports/output/auth-repository.output.port'
import { ProfileInfoModel, UserAccountModel } from '../orm/sequelize/models'
import { QueryError } from 'sequelize'
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
      if (error instanceof QueryError) {
        if (error.message.includes('llave duplicada viola restricción de unicidad')) {
          throw new RepositoryValidationErrorPresenter('Perfil de usuario duplicado')
        }
        throw new RepositoryValidationErrorPresenter(error.message)
      } else {
        throw new InternalServerErrorPresenter('Error desconocido en el repositorio de usuarios')
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
      if (error instanceof QueryError) {
        if (error.message.includes('llave duplicada viola restricción de unicidad')) {
          throw new RepositoryValidationErrorPresenter('Cuenta de usuario duplicada')
        }
        throw new RepositoryValidationErrorPresenter(error.message)
      } else {
        throw new InternalServerErrorPresenter('Error desconocido en el repositorio de usuarios')
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
