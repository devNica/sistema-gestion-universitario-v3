import GetCoursesByKnowledgeAreaUseCase from '@backoffice/application/usecases/get-course-by-knowledge-area.usecase'
import { type FoundCoursesModel } from '@backoffice/domain/ports/application/application-domain.model'
import GetCoursesByKnowledgeAreaDomainService from '@backoffice/domain/services/get-courses-by-knowledge-area.service'
import { orgUnitRepository } from '@backoffice/infrastructure/repositories/organizational-unit.repository'
import { type ControllerInputPort } from '@core/application/ports/controller-input.port'
import SuccessfulRequestPresenter from '@core/application/presenter/successful-request.presenter'

function factory (): ControllerInputPort {
  const service = new GetCoursesByKnowledgeAreaDomainService(
    orgUnitRepository
  )

  const presenter = new SuccessfulRequestPresenter<FoundCoursesModel[]>()

  const usecase = new GetCoursesByKnowledgeAreaUseCase(
    service,
    presenter
  )

  return usecase
}

export const getCoursesByKnowledgeAreaFactory = factory()
