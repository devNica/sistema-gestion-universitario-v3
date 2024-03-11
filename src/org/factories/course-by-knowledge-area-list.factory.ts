import SuccessFulRequestPresenter from '@core/adapters/primary/presenters/successful-request.presenter'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { CourseListUseCase } from '@org/application/usecase/course-by-knowledge-area.usecase'
import { CourseByKnowledgeAreaListController } from '@org/interface/adapters/primary/controllers/course-by-knowledge-area-list.controller'
import { type CourseOC } from '@org/domain/models/controllers/controller-output.model'
import { fetchCourseByKnowledgeAreaRepo } from '@org/interface/adapters/secondary/organization-repository.adapter'

function factory (): ControllerInputPort {
  const usecase = new CourseListUseCase(
    fetchCourseByKnowledgeAreaRepo
  )

  const presenter = new SuccessFulRequestPresenter<CourseOC>()

  const controller = new CourseByKnowledgeAreaListController(
    usecase,
    presenter
  )

  return controller
}

export const courseByKnowledgeAreaFactory = factory()
