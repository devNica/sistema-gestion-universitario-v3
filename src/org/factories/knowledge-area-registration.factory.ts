import SuccessfulInsertRequestPresenter from '@core/adapters/primary/presenters/successful-insert-request.presenter'
import { type EmptyResponseModel } from '@core/models/generic/response.model'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { KnowledgeAreaUseCase } from '@org/application/usecase/knowledge-area-registration.usecase'
import { KnowledgeAreaRegistrationController } from '@org/interface/adapters/primary/controllers/knowledge-area-registration.controller'
import { insertKnowledgeAreaRepo } from '@org/interface/adapters/secondary/organization-repository.adapter'

function factory (): ControllerInputPort {
  const usecase = new KnowledgeAreaUseCase(
    insertKnowledgeAreaRepo
  )

  const presenter = new SuccessfulInsertRequestPresenter<EmptyResponseModel>()

  const controller = new KnowledgeAreaRegistrationController(
    usecase,
    presenter
  )

  return controller
}

export const knowledgeAreaRegFactory = factory()
