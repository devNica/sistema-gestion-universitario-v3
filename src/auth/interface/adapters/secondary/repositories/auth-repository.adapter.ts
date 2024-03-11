import { type UniversitaryProfessorRegistrationIR, type UniversitaryApplicantRegistrationIR, type ResetUserPasswordIR, type FetchUserAccountIR, type VerifyUserRoleIR, type PromoteGuestUserAccountToStudentIR } from '@auth/domain/models/repositories/repository-input.model'
import { type UserAccountOR, type RolOR, type UserProfileOR } from '@auth/domain/models/repositories/repository-output.model'
import { type CreateGuestUserOP, type CreateProfessorUserOP, type FetchRolByNameOP, type UpdateUserAccountPasswordOP, type FetchUserAccountByParamsOP, type PromoteUserAccountOP, type VerifyUserRoleOP, type RegisterInitAccuOP } from '@auth/domain/ports/output/auth-repository.output.port'
import InternalServerErrorPresenter from '@core/adapters/primary/presenters/internal-server-error.presenter'
import RepositoryValidationErrorPresenter from '@core/adapters/primary/presenters/repository-validation-error.presenter'
import { ProfileInfoModel, UserAccountModel, UserHasRoleModel, RolModel, AdmissionModel } from '@core/adapters/secondary/orm/sequelize/models'
import { fetchAccountByUsernameQuery, verifyUserRolQuery } from '@core/adapters/secondary/repositories/queries/auth.query'
import { type UserAccountEntity } from '@core/models/entities/auth.entity'
import { type UUID } from '@core/models/generic/custom-types.model'
import { sequelizeInstance } from '@frameworks/sequelize/database-squelize-conn'
import { QueryError, QueryTypes, type Sequelize, UniqueConstraintError, ValidationError } from 'sequelize'

class AuthRepositoryAdapter implements
CreateGuestUserOP,
CreateProfessorUserOP,
FetchRolByNameOP,
UpdateUserAccountPasswordOP,
FetchUserAccountByParamsOP,
PromoteUserAccountOP,
VerifyUserRoleOP,
RegisterInitAccuOP {
  constructor (
    private readonly db: Sequelize
  ) { }

  async createProfessorUser (data: UniversitaryProfessorRegistrationIR): Promise<UserAccountOR | never> {
    try {
      let user: UserAccountEntity | null = null

      await this.db.transaction(async (t) => {
        const profile = await ProfileInfoModel.create({
          firstname: data.firstname,
          lastname: data.lastname,
          personalEmail: data.personalEmail,
          requiresAdmission: false
        }, { transaction: t })

        user = await UserAccountModel.create({
          username: data.username,
          password: data.passwordHashed,
          profileId: profile.id,
          expiresIn: data.expiresIn,
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

  async createGuestUser (data: UniversitaryApplicantRegistrationIR): Promise<UserAccountOR | never> {
    try {
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
          personalEmail: data.personalEmail,
          requiresAdmission: data.requiresAdmission
        }, { transaction: t })

        user = await UserAccountModel.create({
          username: data.username,
          password: data.passwordHashed,
          expiresIn: data.expiresIn,
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
      console.log(error)
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
      user.expiresIn = data.expiresIn
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
          username: data.username ?? '',
          userId: data.userId ?? ''
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
        throw new InternalServerErrorPresenter('No se pudo consultar la cuenta de usuario')
      }
    }
  }

  async verifyUserRole (data: VerifyUserRoleIR): Promise<boolean | never> {
    try {
      const result: Array<{ verify: string }> = await this.db.query(verifyUserRolQuery(), {
        replacements: {
          userId: data.id,
          rol: data.rol
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

  async promoteUser (data: PromoteGuestUserAccountToStudentIR): Promise<void> {
    try {
      const userRol = await UserHasRoleModel.findOne({ where: { userId: data.id } })
      if (userRol === null) throw new RepositoryValidationErrorPresenter('Usuario no encontrado')

      await userRol.destroy()

      await UserHasRoleModel.create({
        userId: data.id,
        rolId: data.rolId
      })
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

  async registerInitAccu (initAccu: number, applicantId: UUID): Promise<void> {
    try {
      await AdmissionModel.create({
        initAccu,
        applicantId
      })
    } catch (error) {
      console.error(error)
      if (error instanceof QueryError) {
        throw new RepositoryValidationErrorPresenter(error.message)
      } else {
        throw new InternalServerErrorPresenter('Error al registrar acumulado inicial del aspirante')
      }
    }
  }
}

const authRepositoryAdapter = new AuthRepositoryAdapter(sequelizeInstance)
const createGuestUserRepo: CreateGuestUserOP = authRepositoryAdapter
const createProfessorUserRepo: CreateProfessorUserOP = authRepositoryAdapter
const fetchRolByNameRepo: FetchRolByNameOP = authRepositoryAdapter
const updateUserAccountPasswordRepo: UpdateUserAccountPasswordOP = authRepositoryAdapter
const fetchUserAccountByParamsRepo: FetchUserAccountByParamsOP = authRepositoryAdapter
const verifyUserRoleRepo: VerifyUserRoleOP = authRepositoryAdapter
const promoteUserAccountRepo: PromoteUserAccountOP = authRepositoryAdapter
const registerInitAccuRepo: RegisterInitAccuOP = authRepositoryAdapter

export {
  createGuestUserRepo,
  createProfessorUserRepo,
  fetchRolByNameRepo,
  updateUserAccountPasswordRepo,
  fetchUserAccountByParamsRepo,
  verifyUserRoleRepo,
  promoteUserAccountRepo,
  registerInitAccuRepo
}
