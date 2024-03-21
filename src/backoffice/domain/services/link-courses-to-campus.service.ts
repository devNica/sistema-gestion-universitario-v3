import { type EmptyResponseModel } from '@core/domain/models/api/controller.model'
import { type LinkCoursesToCampusModel } from '../ports/application/application-domain.model'
import { type LinkCoursesToCampusPort } from '../ports/application/application-domain.port'
import { type CampusRepositoryPort } from '../ports/repository/repository-domain.port'
import { type AcademicCampusEntity } from '../entities/BackOfficeEntity'

export default class LinkCoursesToCampusDomainService implements LinkCoursesToCampusPort {
  constructor (
    private readonly repository: CampusRepositoryPort<AcademicCampusEntity>
  ) {}

  async linkUp (data: LinkCoursesToCampusModel): Promise<EmptyResponseModel> {
    await this.repository.joinCourses({
      campusId: data.campusId,
      linkCourses: data.courses
    })

    return {}
  }
}
