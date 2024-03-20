import CourseRegistrationUseCase from '@backoffice/application/usecases/course-registration.usecase'
import CourseRegistrationDomainService from '@backoffice/domain/services/course-registration.service'
import { courseRepository } from '@backoffice/infrastructure/repositories/course.repository'
import { type ControllerInputPort } from '@core/application/ports/controller-input.port'
import SuccessfulInsertRequestPresenter from '@core/application/presenter/successful-insert-request.presenter'
import { type EmptyResponseModel } from '@core/domain/models/api/controller.model'

function factory (): ControllerInputPort {
  const service = new CourseRegistrationDomainService(
    courseRepository
  )

  const presenter = new SuccessfulInsertRequestPresenter<EmptyResponseModel>()

  const usecase = new CourseRegistrationUseCase(
    service,
    presenter
  )

  return usecase
}

export const courseRegistrationFactory = factory()
