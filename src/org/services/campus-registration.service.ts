import { type EmptyResponseModel } from '@core/models/generic/response.model'
import { type CampusIC } from '@org/models/controllers/controller-input.model'
import { type InsertCampusOP } from '@org/ports/organization-output.port'

export interface CampusRegistrationServI {
  campusReg: (request: CampusIC) => Promise<EmptyResponseModel>
}

export class CampusRegistrationService implements CampusRegistrationServI {
  constructor (
    private readonly repo: InsertCampusOP
  ) {}

  async campusReg (request: CampusIC): Promise<EmptyResponseModel> {
    await this.repo.insertCampus({ ...request })
    return {}
  }
}
