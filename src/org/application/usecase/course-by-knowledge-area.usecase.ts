import { type UUID } from '@core/models/generic/custom-types.model'
import { type CourseOC } from '@org/domain/models/controllers/controller-output.model'
import { type CourseListIP } from '@org/domain/ports/input/unit-organization.input.port'
import { type FetchCoursetByKnowledgeAreaOP } from '@org/domain/ports/output/organization-output.port'

export class CourseListUseCase implements CourseListIP {
  constructor (
    private readonly repo: FetchCoursetByKnowledgeAreaOP
  ) {}

  async courseByKnowledgeAreaList (areaId: UUID): Promise<CourseOC> {
    return await this.repo.fetchCourseByKnowledgeArea(areaId)
  }
}
