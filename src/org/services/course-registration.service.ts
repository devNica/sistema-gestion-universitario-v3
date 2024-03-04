import { type EmptyResponseModel } from '@core/models/generic/response.model'
import { type CourseIC } from '@org/models/controllers/controller-input.model'
import { type InsertCourseOP } from '@org/ports/organization-output.port'

export interface CourseRegistrationSrvI {
  courseReg: (request: CourseIC) => Promise<EmptyResponseModel>
}

export class CourseRegistrationService implements CourseRegistrationSrvI {
  constructor (
    private readonly repo: InsertCourseOP
  ) {}

  async courseReg (request: CourseIC): Promise<EmptyResponseModel> {
    await this.repo.insertCourse({ ...request })
    return {}
  }
}
