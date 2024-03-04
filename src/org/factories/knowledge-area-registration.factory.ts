import SuccessfulInsertRequestPresenter from '@core/adapters/primary/presenters/successful-insert-request.presenter'
import { insertKnowledgeAreaRepo } from '@core/adapters/secondary/repositories/organization-repository.adapter'
import { type EmptyResponseModel } from '@core/models/generic/response.model'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { KnowledgeAreaRegistrationController } from '@org/controllers/knowledge-area-registration.controller'
import { KnowledgeAreaService } from '@org/services/knowledge-area-registration.service'

function factory (): ControllerInputPort {
  const service = new KnowledgeAreaService(
    insertKnowledgeAreaRepo
  )

  const presenter = new SuccessfulInsertRequestPresenter<EmptyResponseModel>()

  const controller = new KnowledgeAreaRegistrationController(
    service,
    presenter
  )

  return controller
}

export const knowledgeAreaRegFactory = factory()
