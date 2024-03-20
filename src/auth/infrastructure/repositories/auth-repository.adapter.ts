import { QueryTypes, type Sequelize, UniqueConstraintError, ValidationError, Op, QueryError } from 'sequelize'
import { type ProfessorRegistrationRepositoryModel, type GuestRegistrationRepositoryModel } from '../../domain/ports/repository/repository-domain.model'
import { type UserRepositoryPort, type CreateUserPort, type UserSpecificationPort } from '../../domain/ports/repository/repository-domain.port'
import { fetchAccountByUsernameQuery, verifyUserRolQuery } from '@core/domain/models/queries/auth.queries'
import RepositoryValidationErrorPresenter from '@core/application/presenter/repository-validation.presenter'
import InternalServerErrorPresenter from '@core/application/presenter/internal-server-error.presenter'
import { sequelizeInstance } from '@core/shared/configs/sequelize-client.config'
import { type UserEntity } from '@auth/domain/entities/AuthEntity'
import { UserAccountModel, UserHasRoleModel } from '@core/infrastructure/sequelize/models'
import { type UserAccountDB } from '@core/domain/entities/AuthEntity'

class AuthRepositoryAdapter
implements CreateUserPort,
UserRepositoryPort<UserEntity>,
UserSpecificationPort<UserEntity> {
  constructor (
    private readonly db: Sequelize
  ) {}

  async fetch (data: Partial<Pick<UserEntity, keyof UserEntity>>): Promise<UserEntity> {
    try {
      const user: UserEntity[] = await this.db.query(fetchAccountByUsernameQuery(), {
        replacements: {
          username: data.username ?? '',
          userId: data.userId ?? ''
        },
        type: QueryTypes.SELECT
      })

      if (user.length === 0) throw new RepositoryValidationErrorPresenter('Usuario no encontrado')
      return { ...user[0] }
    } catch (error) {
      if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
        throw new RepositoryValidationErrorPresenter(error.message)
      } else {
        throw new InternalServerErrorPresenter('Creacion de cuenta de usuario fallida')
      }
    }
  }

  async update (
    params: Partial<Pick<UserEntity, 'userId' | 'username'>>,
    data: Partial<Pick<UserEntity, keyof UserEntity>>): Promise<void> {
    try {
      await UserAccountModel.update({ ...data }, {
        where: {
          [Op.or]: [
            { username: params.username },
            { id: params.userId }
          ]
        }
      })
    } catch (error) {
      if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
        throw new RepositoryValidationErrorPresenter(error.message)
      } else {
        throw new InternalServerErrorPresenter('Creacion de cuenta de usuario fallida')
      }
    }
  }

  async createProfessor (data: ProfessorRegistrationRepositoryModel): Promise<void | never> {
    try {
      let user: UserAccountDB

      await this.db.transaction(async (t) => {
        user = await UserAccountModel.create({
          username: data.username,
          password: data.passwordHashed,
          personalInfo: {
            firstname: data.firstname,
            lastname: data.lastname,
            personalEmail: data.personalEmail,
            requiresAdmission: false,
            address: '',
            birthdate: '',
            dni: '',
            nationality: '',
            phoneNumber: ''
          },
          expiresIn: data.expiresIn,
          state: true
        }, { transaction: t })

        await UserHasRoleModel.create({
          userId: user?.id,
          rolId: data.rolId
        }, { transaction: t })
      })
    } catch (error) {
      if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
        throw new RepositoryValidationErrorPresenter(error.message)
      } else {
        throw new InternalServerErrorPresenter('Creacion de cuenta de usuario fallida')
      }
    }
  }

  async createGuest (data: GuestRegistrationRepositoryModel): Promise<void | never> {
    try {
      let user: UserAccountDB | null = null

      await this.db.transaction(async (t) => {
        user = await UserAccountModel.create({
          username: data.username,
          password: data.passwordHashed,
          expiresIn: data.expiresIn,
          personalInfo: {
            firstname: data.firstname,
            lastname: data.lastname,
            dni: data.dni,
            phoneNumber: data.phoneNumber,
            address: data.address,
            birthdate: data.birthdate,
            nationality: data.nationality,
            personalEmail: data.personalEmail,
            requiresAdmission: data.requiresAdmission
          },
          state: true
        }, { transaction: t })

        await UserHasRoleModel.create({
          userId: user.id,
          rolId: data.rolId
        }, { transaction: t })
      })
    } catch (error) {
      if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
        throw new RepositoryValidationErrorPresenter(error.message)
      } else {
        throw new InternalServerErrorPresenter('Creacion de cuenta de usuario fallida')
      }
    }
  }

  async isGuestUser (data: Pick<UserEntity, 'userId'>): Promise<boolean> {
    try {
      const result: Array<{ verify: string }> = await this.db.query(verifyUserRolQuery(), {
        replacements: {
          userId: data.userId,
          rol: 'invitado'
        },
        type: QueryTypes.SELECT
      })

      if (result[0].verify === 'true') return true
      else return false
    } catch (error) {
      if (error instanceof QueryError) {
        throw new RepositoryValidationErrorPresenter(error.message)
      } else if (error instanceof RepositoryValidationErrorPresenter) {
        throw new InternalServerErrorPresenter(error.message)
      } else {
        throw new InternalServerErrorPresenter('Rol no pudo ser verificado')
      }
    }
  }

  async upgrade (data: Pick<UserEntity, 'userId' | 'rolInfo'>): Promise<void> {
    try {
      await this.db.transaction(async (t) => {
        await UserHasRoleModel.destroy({ transaction: t, where: { userId: data.userId } })

        await UserHasRoleModel.create({
          rolId: data.rolInfo?.rolId ?? '',
          userId: data.userId
        }, { transaction: t })
      })
    } catch (error) {
      if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
        throw new RepositoryValidationErrorPresenter(error.message)
      } else {
        throw new InternalServerErrorPresenter('Creacion de cuenta de usuario fallida')
      }
    }
  }
}

const authRepositoryAdapter = new AuthRepositoryAdapter(sequelizeInstance)
const createUserRepository: CreateUserPort = authRepositoryAdapter
const userRepository: UserRepositoryPort<UserEntity> = authRepositoryAdapter
const userSpecRepository: UserSpecificationPort<UserEntity> = authRepositoryAdapter

export {
  createUserRepository,
  userRepository,
  userSpecRepository
}
