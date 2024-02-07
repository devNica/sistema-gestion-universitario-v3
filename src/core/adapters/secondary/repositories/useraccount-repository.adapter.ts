import { type FetchUserAccountIR, type ResetUserPasswordIR, type UniversitaryApplicantRegistrationIR } from '@auth/models/repositories/repository-input.model'
import { type FetchRolByNameOP, type CreateUserAccountOP, type UpdateUserAccountPasswordOP, type FetchAccountByUsernameOP } from '@auth/ports/output/auth-repository.output.port'
import { type Sequelize, UniqueConstraintError, QueryError, ValidationError, QueryTypes } from 'sequelize'
import RepositoryValidationErrorPresenter from '@core/adapters/primary/presenters/repository-validation-error.presenter'
import InternalServerErrorPresenter from '@core/adapters/primary/presenters/internal-server-error.presenter'
import { type UserProfileOR, type RolOR, type UserAccountOR } from '@auth/models/repositories/repository-output.model'
import { sequelizeInstance } from '@frameworks/sequelize/database-squelize-conn'
import { ProfileInfoModel, RolModel, UserAccountModel, UserHasRoleModel } from '../orm/sequelize/models'
import { type UserAccountEntity } from '@core/models/entities/auth.entity'
import { fetchAccountByUsernameQuery } from './queries/auth.query'

class UserAccountRepositoryAdapter implements CreateUserAccountOP, FetchRolByNameOP, UpdateUserAccountPasswordOP, FetchAccountByUsernameOP {
  constructor (
    private readonly db: Sequelize
  ) { }

  async create (data: UniversitaryApplicantRegistrationIR): Promise<UserAccountOR | never> {
    try {
      console.log(data)
      let user: UserAccountEntity | null = null

      await this.db.transaction(async (t) => {
        const profile = await ProfileInfoModel.create({
          firstname: data.firstname,
          lastname: data.lastname,
          dni: data.dni,
          phoneNumber: data.phoneNumber,
          address: data.address,
          birthdate: data.birthdate,
          nationality: data.nationality,
          personalEmail: data.personalEmail
        }, { transaction: t })

        user = await UserAccountModel.create({
          username: data.username,
          password: data.passwordHashed,
          profileId: profile.id,
          state: true
        }, { transaction: t })

        await UserHasRoleModel.create({
          userId: user.id,
          rolId: data.rolId
        }, { transaction: t })
      })

      if (user === null) {
        throw new Error('Creacion de cuenta de usuario fallida')
      }

      return user
    } catch (error) {
      if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
        throw new RepositoryValidationErrorPresenter(error.message)
      } else {
        throw new InternalServerErrorPresenter('Creacion de cuenta de usuario fallida')
      }
    }
  }

  async fetchRol (rolName: string): Promise<RolOR | never> {
    try {
      const rol = await RolModel.findOne({ where: { rol: rolName } })
      if (rol === null) throw new Error('Error al consultar roles')
      return rol
    } catch (error) {
      if (error instanceof QueryError) {
        throw new RepositoryValidationErrorPresenter(error.message)
      } else {
        throw new InternalServerErrorPresenter('Error al consultar roles')
      }
    }
  }

  async updatePassword (data: ResetUserPasswordIR): Promise<void> {
    try {
      const user = await UserAccountModel.findOne({ where: { username: data.username } })
      if (user === null) throw new RepositoryValidationErrorPresenter('Usuario no encontrado')
      user.password = data.passwordHashed
      await user.save()
    } catch (error) {
      if (error instanceof QueryError) {
        throw new RepositoryValidationErrorPresenter(error.message)
      } else if (error instanceof RepositoryValidationErrorPresenter) {
        throw new InternalServerErrorPresenter(error.message)
      } else {
        throw new InternalServerErrorPresenter('Contraseña no pudo ser actualizada')
      }
    }
  }

  async fetchAccount (data: FetchUserAccountIR): Promise<UserProfileOR | never> {
    try {
      const user: UserProfileOR[] = await this.db.query(fetchAccountByUsernameQuery(), {
        replacements: {
          username: data.username
        },
        type: QueryTypes.SELECT
      })

      if (user.length === 0) throw new RepositoryValidationErrorPresenter('Usuario no encontrado')
      return { ...user[0] }
    } catch (error) {
      if (error instanceof QueryError) {
        throw new RepositoryValidationErrorPresenter(error.message)
      } else if (error instanceof RepositoryValidationErrorPresenter) {
        throw new InternalServerErrorPresenter(error.message)
      } else {
        throw new InternalServerErrorPresenter('Contraseña no pudo ser actualizada')
      }
    }
  }
}

const userAccountRepoAdapter = new UserAccountRepositoryAdapter(sequelizeInstance)
const createUserAccountRepo: CreateUserAccountOP = userAccountRepoAdapter
const fetchRolByNameRepo: FetchRolByNameOP = userAccountRepoAdapter
const updateUserAccountPasswordRepo: UpdateUserAccountPasswordOP = userAccountRepoAdapter
const fetchAccountByUsernameRepo: FetchAccountByUsernameOP = userAccountRepoAdapter

export {
  createUserAccountRepo,
  fetchRolByNameRepo,
  updateUserAccountPasswordRepo,
  fetchAccountByUsernameRepo
}
