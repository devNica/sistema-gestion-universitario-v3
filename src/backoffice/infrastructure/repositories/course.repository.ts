import { type CourseEntity } from '@backoffice/domain/entities/BackOfficeEntity'
import { type CourseRepositoryPort } from '@backoffice/domain/ports/repository/repository-domain.port'
import InternalServerErrorPresenter from '@core/application/presenter/internal-server-error.presenter'
import RepositoryValidationErrorPresenter from '@core/application/presenter/repository-validation.presenter'
import { CourseModel } from '@core/infrastructure/sequelize/models'
import { QueryError, UniqueConstraintError, ValidationError } from 'sequelize'

class CourseRepositoryAdapter implements CourseRepositoryPort<CourseEntity> {
  async create (data: Pick<CourseEntity, 'unitId' | 'reference' | 'courseName' >): Promise<Pick<CourseEntity, 'courseId'>> {
    try {
      const newCourse = await CourseModel.create({
        courseName: data.courseName,
        reference: data.reference,
        unitId: data.unitId
      })

      return {
        courseId: newCourse.id
      }
    } catch (error) {
      if (error instanceof QueryError) {
        throw new RepositoryValidationErrorPresenter(error.message)
      } if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
        throw new RepositoryValidationErrorPresenter(error.message)
      } else {
        throw new InternalServerErrorPresenter('Error al registrar curso')
      }
    }
  }
}

const courseRepositoryAdapter = new CourseRepositoryAdapter()
const courseRepository: CourseRepositoryPort<CourseEntity> = courseRepositoryAdapter

export {
  courseRepository
}
