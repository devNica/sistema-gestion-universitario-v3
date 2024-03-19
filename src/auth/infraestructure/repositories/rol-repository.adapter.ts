import { type RolEntity } from '@auth/domain/entities/AuthEntity'
import { type RolRepositoryPort } from '@auth/domain/ports/repository/repository-domain.port'
import InternalServerErrorPresenter from '@core/application/presenter/internal-server-error.presenter'
import RepositoryValidationErrorPresenter from '@core/application/presenter/repository-validation.presenter'
import { type AuthenticationRolModel } from '@core/domain/models/api/auth.model'
import { RolModel } from '@core/infraestructure/sequelize/models'
import { QueryError } from 'sequelize'

class RolRepositoryAdapter implements RolRepositoryPort<RolEntity> {
  async fetch (data: Partial<Pick<RolEntity, keyof RolEntity>>): Promise<RolEntity> {
    try {
      const rol = await RolModel.findOne({ where: { rol: data.rol } })
      if (rol === null) throw new Error('Error al consultar roles')
      return {
        rolId: rol.id,
        rol: rol.rol as AuthenticationRolModel
      }
    } catch (error) {
      if (error instanceof QueryError) {
        throw new RepositoryValidationErrorPresenter(error.message)
      } else {
        throw new InternalServerErrorPresenter('Error al consultar roles')
      }
    }
  }
}

const rolRepositoryAdapter = new RolRepositoryAdapter()
const rolRepository: RolRepositoryPort<RolEntity> = rolRepositoryAdapter

export {
  rolRepository
}
