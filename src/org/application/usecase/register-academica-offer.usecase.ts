import { type EmptyResponseModel } from '@core/models/generic/response.model'
import { type AcademicOfferIC } from '@org/domain/models/controllers/controller-input.model'
import { type RegisterAcademicOfferIP } from '@org/domain/ports/input/unit-organization.input.port'
import { type InsertCampusCoursesOP } from '@org/domain/ports/output/organization-output.port'

export class RegisterAcademicOfferUseCase implements RegisterAcademicOfferIP {
  constructor (
    private readonly repo: InsertCampusCoursesOP
  ) {}

  async registerAcademicOffer (request: AcademicOfferIC): Promise<EmptyResponseModel> {
    await this.repo.insertCampusCourses({ ...request })
    return {}
  }
}
