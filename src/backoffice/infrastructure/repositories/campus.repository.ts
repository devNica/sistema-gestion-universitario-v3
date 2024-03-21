import { type AcademicCampusEntity } from '@backoffice/domain/entities/BackOfficeEntity'
import { type CampusRepositoryPort } from '@backoffice/domain/ports/repository/repository-domain.port'
import InternalServerErrorPresenter from '@core/application/presenter/internal-server-error.presenter'
import RepositoryValidationErrorPresenter from '@core/application/presenter/repository-validation.presenter'
import { fetchCoursesByCampusIdQuery } from '@core/domain/models/queries/backoffice.queries'
import { CampusHasCourseModel, CampusModel } from '@core/infrastructure/sequelize/models'
import { sequelizeInstance } from '@core/shared/configs/sequelize-client.config'
import { QueryError, QueryTypes, type Sequelize, UniqueConstraintError, ValidationError } from 'sequelize'

export default class CampusRepositoryAdapter
implements CampusRepositoryPort<AcademicCampusEntity> {
  constructor (
    private readonly db: Sequelize
  ) {}

  async joinCourses (
    data: Pick<AcademicCampusEntity, 'campusId' | 'linkCourses'>): Promise<void | never> {
    try {
      await Promise.all(data.linkCourses.map(async (course) => {
        await CampusHasCourseModel.create({
          campusId: data.campusId,
          courseId: course.courseId
        })
      }))
    } catch (error) {

    }
  }

  async create (data: Pick<AcademicCampusEntity,
  'campusName' | 'address' | 'email' | 'phones' >):
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

  async fetchCourses (data: Partial<Pick<AcademicCampusEntity, 'campusId'>>): Promise<Pick<AcademicCampusEntity, 'courses'> | never> {
    try {
      const result: Array<Pick<AcademicCampusEntity, 'courses'>> = await this.db.query(fetchCoursesByCampusIdQuery(), {
        replacements: {
          campusId: data.campusId
        },
        type: QueryTypes.SELECT
      })
      return result[0]
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

const campusRepositoryAdapter = new CampusRepositoryAdapter(sequelizeInstance)
const campusRepository: CampusRepositoryPort<AcademicCampusEntity> = campusRepositoryAdapter

export {
  campusRepository
}
