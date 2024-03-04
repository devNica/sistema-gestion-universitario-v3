import SuccessfulInsertRequestPresenter from '@core/adapters/primary/presenters/successful-insert-request.presenter'
import { insertCampusRepo } from '@core/adapters/secondary/repositories/organization-repository.adapter'
import { type EmptyResponseModel } from '@core/models/generic/response.model'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { CampusRegistrationController } from '@org/controllers/campus-registration.controller'
import { CampusRegistrationService } from '@org/services/campus-registration.service'

function factory (): ControllerInputPort {
  const service = new CampusRegistrationService(
    insertCampusRepo
  )

  const presenter = new SuccessfulInsertRequestPresenter<EmptyResponseModel>()

  const controller = new CampusRegistrationController(
    service,
    presenter
  )

  return controller
}

export const campusRegistrationFactory = factory()
