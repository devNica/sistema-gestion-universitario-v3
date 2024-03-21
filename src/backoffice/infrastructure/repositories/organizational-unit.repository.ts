import { type OrganizationalUnitEntity } from '@backoffice/domain/entities/BackOfficeEntity'
import { type OrgUnitRepositoryPort } from '@backoffice/domain/ports/repository/repository-domain.port'
import InternalServerErrorPresenter from '@core/application/presenter/internal-server-error.presenter'
import RepositoryValidationErrorPresenter from '@core/application/presenter/repository-validation.presenter'
import { fetchCoursesByOrganizationIdQuery } from '@core/domain/models/queries/backoffice.queries'
import { OrgUnitModel } from '@core/infrastructure/sequelize/models'
import { sequelizeInstance } from '@core/shared/configs/sequelize-client.config'
import { QueryError, QueryTypes, type Sequelize, UniqueConstraintError, ValidationError } from 'sequelize'

class OrganizationalUnitRepositoryAdapter
implements OrgUnitRepositoryPort<OrganizationalUnitEntity> {
  constructor (
    private readonly db: Sequelize
  ) {}

  async create (data: Pick<OrganizationalUnitEntity, 'unitName' | 'reference'>):
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

  async fetchCourses (data: Pick<OrganizationalUnitEntity, 'unitId'>):
  Promise<Pick<OrganizationalUnitEntity, 'courses'> | never> {
    try {
      const result = await this.db.query(fetchCoursesByOrganizationIdQuery(), {
        replacements: {
          unitId: data.unitId
        },
        type: QueryTypes.SELECT
      })
      return result[0] as Pick<OrganizationalUnitEntity, 'courses'>
    } catch (error) {
      if (error instanceof QueryError) {
        throw new RepositoryValidationErrorPresenter(error.message)
      } else {
        throw new InternalServerErrorPresenter('Error al consultar cursos por unidad organizativa')
      }
    }
  }
}

const organizationalUnitRepositoryAdapter = new OrganizationalUnitRepositoryAdapter(sequelizeInstance)
const orgUnitRepository: OrgUnitRepositoryPort<OrganizationalUnitEntity> = organizationalUnitRepositoryAdapter

export {
  orgUnitRepository
}
