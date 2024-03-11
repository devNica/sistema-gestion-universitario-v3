import { type EmptyResponseModel } from '@core/models/generic/response.model'
import { type CampusIC } from '@org/domain/models/controllers/controller-input.model'
import { type CampusRegistrationIP } from '@org/domain/ports/input/unit-organization.input.port'
import { type InsertCampusOP } from '@org/domain/ports/output/organization-output.port'

export class CampusRegistrationUseCase implements CampusRegistrationIP {
  constructor (
    private readonly repo: InsertCampusOP
  ) {}

  async campusReg (request: CampusIC): Promise<EmptyResponseModel> {
    await this.repo.insertCampus({ ...request })
    return {}
  }
}
