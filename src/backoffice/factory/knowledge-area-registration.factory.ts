import KnowledgeAreaRegistrationUseCase from '@backoffice/application/usecases/knowledge-area-registration.usecase'
import KnowledgeAreaRegistrationDomainService from '@backoffice/domain/services/knowledge-registration.service'
import { orgUnitRepository } from '@backoffice/infrastructure/repositories/organizational-unit.repository'
import { type ControllerInputPort } from '@core/application/ports/controller-input.port'
import SuccessfulInsertRequestPresenter from '@core/application/presenter/successful-insert-request.presenter'
import { type EmptyResponseModel } from '@core/domain/models/api/controller.model'

function factory (): ControllerInputPort {
  const service = new KnowledgeAreaRegistrationDomainService(
    orgUnitRepository
  )

  const presenter = new SuccessfulInsertRequestPresenter<EmptyResponseModel>()

  const usecase = new KnowledgeAreaRegistrationUseCase(
    service,
    presenter
  )

  return usecase
}

export const knowledgeAreaRegistrationFactory = factory()
