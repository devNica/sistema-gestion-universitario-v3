import { type UUID } from '@core/models/generic/custom-types.model'
import { type CourseOC } from '@org/models/controllers/controller-output.model'
import { type FetchCoursetByKnowledgeAreaOP } from '@org/ports/organization-output.port'

export interface CourseListSrvI {
  courseByKnowledgeAreaList: (areaId: UUID) => Promise<CourseOC>
}

export class CourseListService implements CourseListSrvI {
  constructor (
    private readonly repo: FetchCoursetByKnowledgeAreaOP
  ) {}

  async courseByKnowledgeAreaList (areaId: UUID): Promise<CourseOC> {
    return await this.repo.fetchCourseByKnowledgeArea(areaId)
  }
}
