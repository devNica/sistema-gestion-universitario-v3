import ServiceValidationErrorPresenter from '@core/application/presenter/service-validation-error.presenter'
import { type OrganizationalUnitEntity } from '../entities/BackOfficeEntity'
import { type FoundCoursesModel } from '../ports/application/application-domain.model'
import { type GetCoursesByKnowledgeAreaPort } from '../ports/application/application-domain.port'
import { type OrgUnitRepositoryPort } from '../ports/repository/repository-domain.port'

export default class GetCoursesByKnowledgeAreaDomainService implements GetCoursesByKnowledgeAreaPort {
  constructor (
    private readonly repository: OrgUnitRepositoryPort<OrganizationalUnitEntity>
  ) {}

  async getCourses (unitId: string): Promise<FoundCoursesModel[]> {
    const result = await this.repository.fetchCourses({
      unitId
    })
    if (result === undefined) { throw new ServiceValidationErrorPresenter('internalServerErrorRequest') }
    return result.courses
  }
}
