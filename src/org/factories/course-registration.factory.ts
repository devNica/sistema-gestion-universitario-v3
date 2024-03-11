import SuccessfulInsertRequestPresenter from '@core/adapters/primary/presenters/successful-insert-request.presenter'
import { type EmptyResponseModel } from '@core/models/generic/response.model'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { CourseRegistrationUseCase } from '@org/application/usecase/course-registration.usecase'
import { CourseRegistrationController } from '@org/interface/adapters/primary/controllers/course-registrarion.controller'
import { insertCourseRepo } from '@org/interface/adapters/secondary/organization-repository.adapter'

function factory (): ControllerInputPort {
  const usecase = new CourseRegistrationUseCase(
    insertCourseRepo
  )

  const presenter = new SuccessfulInsertRequestPresenter<EmptyResponseModel>()

  const controller = new CourseRegistrationController(
    usecase,
    presenter
  )

  return controller
}

export const courseRegistrationFactory = factory()
