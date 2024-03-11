import SuccessfulInsertRequestPresenter from '@core/adapters/primary/presenters/successful-insert-request.presenter'
import { type EmptyResponseModel } from '@core/models/generic/response.model'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { CampusRegistrationUseCase } from '@org/application/usecase/campus-registration.usecase'
import { CampusRegistrationController } from '@org/interface/adapters/primary/controllers/campus-registration.controller'
import { insertCampusRepo } from '@org/interface/adapters/secondary/organization-repository.adapter'

function factory (): ControllerInputPort {
  const usecase = new CampusRegistrationUseCase(
    insertCampusRepo
  )

  const presenter = new SuccessfulInsertRequestPresenter<EmptyResponseModel>()

  const controller = new CampusRegistrationController(
    usecase,
    presenter
  )

  return controller
}

export const campusRegistrationFactory = factory()
