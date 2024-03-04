import { type EmptyResponseModel } from '@core/models/generic/response.model'
import { type OrganizationalUnitIC } from '@org/models/controllers/controller-input.model'
import { type InsertKnowledgeAreaOP } from '@org/ports/organization-output.port'

export interface KnowledgeAreaSrvI {
  knowledgeAreaReg: (request: OrganizationalUnitIC) => Promise<EmptyResponseModel>
}

export class KnowledgeAreaService implements KnowledgeAreaSrvI {
  constructor (
    private readonly repo: InsertKnowledgeAreaOP
  ) {}

  async knowledgeAreaReg (request: OrganizationalUnitIC): Promise<EmptyResponseModel> {
    await this.repo.insertKnowledgeArea({ ...request })
    return {}
  }
}
