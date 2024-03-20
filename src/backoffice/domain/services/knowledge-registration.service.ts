import { type EmptyResponseModel } from '@core/domain/models/api/controller.model'
import { type KnowledgeAreaRegistrationModel } from '../ports/application/application-domain.model'
import { type KnowledgeAreaRegistrationPort } from '../ports/application/application-domain.port'
import { type OrgUnitRepositoryPort } from '../ports/repository/repository-domain.port'
import { type OrganizationalUnitEntity } from '../entities/BackOfficeEntity'

export default class KnowledAreageRegistrationDomainService implements KnowledgeAreaRegistrationPort {
  constructor (
    private readonly repository: OrgUnitRepositoryPort<OrganizationalUnitEntity>
  ) {}

  async register (data: KnowledgeAreaRegistrationModel): Promise<EmptyResponseModel> {
    await this.repository.create({
      reference: data.reference,
      unitName: data.unitName
    })

    return {}
  }
}
