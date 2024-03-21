import LinkCoursesToCampusUseCase from '@backoffice/application/usecases/link-courses-to-campus.usecase'
import LinkCoursesToCampusDomainService from '@backoffice/domain/services/link-courses-to-campus.service'
import { campusRepository } from '@backoffice/infrastructure/repositories/campus.repository'
import { type ControllerInputPort } from '@core/application/ports/controller-input.port'
import SuccessfulInsertRequestPresenter from '@core/application/presenter/successful-insert-request.presenter'
import { type EmptyResponseModel } from '@core/domain/models/api/controller.model'

function factory (): ControllerInputPort {
  const service = new LinkCoursesToCampusDomainService(
    campusRepository
  )

  const presenter = new SuccessfulInsertRequestPresenter<EmptyResponseModel>()

  const usecase = new LinkCoursesToCampusUseCase(
    service,
    presenter
  )

  return usecase
}

export const linkCoursesToCampusFactory = factory()
