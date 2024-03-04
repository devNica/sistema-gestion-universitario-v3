import SuccessfulInsertRequestPresenter from '@core/adapters/primary/presenters/successful-insert-request.presenter'
import { insertCampusCourseRepo } from '@core/adapters/secondary/repositories/organization-repository.adapter'
import { type EmptyResponseModel } from '@core/models/generic/response.model'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { RegisterAcademicOfferController } from '@org/controllers/register-academic-offer.controller'
import { RegisterAcademicOfferService } from '@org/services/register-academica-offer.service'

function factory (): ControllerInputPort {
  const service = new RegisterAcademicOfferService(
    insertCampusCourseRepo
  )

  const presenter = new SuccessfulInsertRequestPresenter<EmptyResponseModel>()

  const controller = new RegisterAcademicOfferController(
    service,
    presenter
  )

  return controller
}

export const registerAcademicOfferFactory = factory()
