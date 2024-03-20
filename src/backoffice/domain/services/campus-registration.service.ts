import { type EmptyResponseModel } from '@core/domain/models/api/controller.model'
import { type CampusRegistrationModel } from '../ports/application/application-domain.model'
import { type CampusRegistrationPort } from '../ports/application/application-domain.port'
import { type CampusRepositoryPort } from '../ports/repository/repository-domain.port'
import { type AcademicCampusEntity } from '../entities/BackOfficeEntity'

export default class CampusRegistrationDomainService implements CampusRegistrationPort {
  constructor (
    private readonly repository: CampusRepositoryPort<AcademicCampusEntity>
  ) {}

  async register (data: CampusRegistrationModel): Promise<EmptyResponseModel> {
    await this.repository.create({
      campusName: data.campusName,
      address: data.address,
      email: data.email,
      phones: data.phones
    })
    return {}
  }
}
