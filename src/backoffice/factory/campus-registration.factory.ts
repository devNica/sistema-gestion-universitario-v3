import CampusRegistrationUseCase from '@backoffice/application/usecases/campus-registration.usecase'
import CampusRegistrationDomainService from '@backoffice/domain/services/campus-registration.service'
import { campusRepository } from '@backoffice/infrastructure/repositories/campus.repository'
import { type ControllerInputPort } from '@core/application/ports/controller-input.port'
import SuccessfulInsertRequestPresenter from '@core/application/presenter/successful-insert-request.presenter'
import { type EmptyResponseModel } from '@core/domain/models/api/controller.model'

function factory (): ControllerInputPort {
  const service = new CampusRegistrationDomainService(
    campusRepository
  )

  const presenter = new SuccessfulInsertRequestPresenter<EmptyResponseModel>()

  const usecase = new CampusRegistrationUseCase(
    service,
    presenter
  )

  return usecase
}

export const campusRegistrationFactory = factory()
