import { type OrganizationalUnitEntity } from '@backoffice/domain/entities/BackOfficeEntity'
import { type OrgUnitRepositoryPort } from '@backoffice/domain/ports/repository/repository-domain.port'
import InternalServerErrorPresenter from '@core/application/presenter/internal-server-error.presenter'
import RepositoryValidationErrorPresenter from '@core/application/presenter/repository-validation.presenter'
import { OrgUnitModel } from '@core/infrastructure/sequelize/models'
import { QueryError, UniqueConstraintError, ValidationError } from 'sequelize'

class OrganizationalUnitRepositoryAdapter
implements OrgUnitRepositoryPort<OrganizationalUnitEntity> {
  async create (data: Pick<OrganizationalUnitEntity, 'courses' | 'unitName' | 'reference'>):
  Promise<Pick<OrganizationalUnitEntity, 'unitId'>> {
    try {
      const newOrg = await OrgUnitModel.create({
        unitName: data.unitName,
        reference: data.reference
      })

      return {
        unitId: newOrg.id
      }
    } catch (error) {
      if (error instanceof QueryError) {
        throw new RepositoryValidationErrorPresenter(error.message)
      } if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
        throw new RepositoryValidationErrorPresenter(error.message)
      } else {
        throw new InternalServerErrorPresenter('Error al registrar unidad organizativa')
      }
    }
  }
}

const organizationalUnitRepositoryAdapter = new OrganizationalUnitRepositoryAdapter()
const orgUnitRepository: OrgUnitRepositoryPort<OrganizationalUnitEntity> = organizationalUnitRepositoryAdapter

export {
  orgUnitRepository
}
