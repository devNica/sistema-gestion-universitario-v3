import { type EmptyResponseModel } from '@core/models/generic/response.model'
import { type OrganizationalUnitIC } from '@org/domain/models/controllers/controller-input.model'
import { type KnowledgeAreaIP } from '@org/domain/ports/input/unit-organization.input.port'
import { type InsertKnowledgeAreaOP } from '@org/domain/ports/output/organization-output.port'

export class KnowledgeAreaUseCase implements KnowledgeAreaIP {
  constructor (
    private readonly repo: InsertKnowledgeAreaOP
  ) {}

  async knowledgeAreaReg (request: OrganizationalUnitIC): Promise<EmptyResponseModel> {
    await this.repo.insertKnowledgeArea({ ...request })
    return {}
  }
}
