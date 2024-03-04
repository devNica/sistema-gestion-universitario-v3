import { type EmptyResponseModel } from '@core/models/generic/response.model'
import { type AcademicOfferIC } from '@org/models/controllers/controller-input.model'
import { type InsertCampusCoursesOP } from '@org/ports/organization-output.port'

export interface RegisterAcademicOfferSrvI {
  registerAcademicOffer: (request: AcademicOfferIC) => Promise<EmptyResponseModel>
}

export class RegisterAcademicOfferService implements RegisterAcademicOfferSrvI {
  constructor (
    private readonly repo: InsertCampusCoursesOP
  ) {}

  async registerAcademicOffer (request: AcademicOfferIC): Promise<EmptyResponseModel> {
    console.log('que obtengo de', request)
    await this.repo.insertCampusCourses({ ...request })
    return {}
  }
}
