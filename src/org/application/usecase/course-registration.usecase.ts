import { type EmptyResponseModel } from '@core/models/generic/response.model'
import { type CourseIC } from '@org/domain/models/controllers/controller-input.model'
import { type CourseRegistrationIP } from '@org/domain/ports/input/unit-organization.input.port'
import { type InsertCourseOP } from '@org/domain/ports/output/organization-output.port'

export class CourseRegistrationUseCase implements CourseRegistrationIP {
  constructor (
    private readonly repo: InsertCourseOP
  ) {}

  async courseReg (request: CourseIC): Promise<EmptyResponseModel> {
    await this.repo.insertCourse({ ...request })
    return {}
  }
}
