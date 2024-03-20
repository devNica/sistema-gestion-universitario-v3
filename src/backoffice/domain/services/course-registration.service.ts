import { type EmptyResponseModel } from '@core/domain/models/api/controller.model'
import { type CourseRegistrationModel } from '../ports/application/application-domain.model'
import { type CourseRegistrationPort } from '../ports/application/application-domain.port'
import { type CourseRepositoryPort } from '../ports/repository/repository-domain.port'
import { type CourseEntity } from '../entities/BackOfficeEntity'

export default class CourseRegistrationDomainService implements CourseRegistrationPort {
  constructor (
    private readonly repository: CourseRepositoryPort<CourseEntity>
  ) {}

  async register (data: CourseRegistrationModel): Promise<EmptyResponseModel> {
    await this.repository.create({
      courseName: data.courseName,
      reference: data.reference,
      unitId: data.unitId
    })

    return {}
  }
}
