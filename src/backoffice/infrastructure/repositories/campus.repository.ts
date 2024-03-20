import { type AcademicCampusEntity } from '@backoffice/domain/entities/BackOfficeEntity'
import { type CampusRepositoryPort } from '@backoffice/domain/ports/repository/repository-domain.port'
import InternalServerErrorPresenter from '@core/application/presenter/internal-server-error.presenter'
import RepositoryValidationErrorPresenter from '@core/application/presenter/repository-validation.presenter'
import { CampusModel } from '@core/infrastructure/sequelize/models'
import { QueryError, UniqueConstraintError, ValidationError } from 'sequelize'

export default class CampusRepositoryAdapter
implements CampusRepositoryPort<AcademicCampusEntity> {
  async create (data: Pick<AcademicCampusEntity,
  'campusName' | 'address' | 'email' | 'phones' | 'courses'>):
    Promise<Pick<AcademicCampusEntity, 'campusId'>> {
    try {
      const newCampus = await CampusModel.create({
        address: data.address,
        campusName: data.campusName,
        email: data.email,
        phones: data.phones
      })

      return {
        campusId: newCampus.id
      }
    } catch (error) {
      if (error instanceof QueryError) {
        throw new RepositoryValidationErrorPresenter(error.message)
      } if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
        throw new RepositoryValidationErrorPresenter(error.message)
      } else {
        throw new InternalServerErrorPresenter('Error al registrar recinto academico')
      }
    }
  }
}

const campusRepositoryAdapter = new CampusRepositoryAdapter()
const campusRepository: CampusRepositoryPort<AcademicCampusEntity> = campusRepositoryAdapter

export {
  campusRepository
}
