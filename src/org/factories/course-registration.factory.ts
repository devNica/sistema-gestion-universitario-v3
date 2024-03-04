import SuccessfulInsertRequestPresenter from '@core/adapters/primary/presenters/successful-insert-request.presenter'
import { insertCourseRepo } from '@core/adapters/secondary/repositories/organization-repository.adapter'
import { type EmptyResponseModel } from '@core/models/generic/response.model'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { CourseRegistrationController } from '@org/controllers/course-registrarion.controller'
import { CourseRegistrationService } from '@org/services/course-registration.service'

function factory (): ControllerInputPort {
  const service = new CourseRegistrationService(
    insertCourseRepo
  )

  const presenter = new SuccessfulInsertRequestPresenter<EmptyResponseModel>()

  const controller = new CourseRegistrationController(
    service,
    presenter
  )

  return controller
}

export const courseRegistrationFactory = factory()
