import SuccessFulRequestPresenter from '@core/adapters/primary/presenters/successful-request.presenter'
import { fetchCourseByKnowledgeAreaRepo } from '@core/adapters/secondary/repositories/organization-repository.adapter'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { CourseByKnowledgeAreaListController } from '@org/controllers/course-by-knowledge-area-list.controller'
import { type CourseOC } from '@org/models/controllers/controller-output.model'
import { CourseListService } from '@org/services/course-by-knowledge-area.service'

function factory (): ControllerInputPort {
  const service = new CourseListService(
    fetchCourseByKnowledgeAreaRepo
  )

  const presenter = new SuccessFulRequestPresenter<CourseOC>()

  const controller = new CourseByKnowledgeAreaListController(
    service,
    presenter
  )

  return controller
}

export const courseByKnowledgeAreaFactory = factory()
