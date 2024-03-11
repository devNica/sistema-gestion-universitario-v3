import SuccessfulInsertRequestPresenter from '@core/adapters/primary/presenters/successful-insert-request.presenter'
import { type EmptyResponseModel } from '@core/models/generic/response.model'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { RegisterAcademicOfferController } from '@org/interface/adapters/primary/controllers/register-academic-offer.controller'
import { RegisterAcademicOfferUseCase } from '@org/application/usecase/register-academica-offer.usecase'
import { insertCampusCourseRepo } from '@org/interface/adapters/secondary/organization-repository.adapter'

function factory (): ControllerInputPort {
  const usecase = new RegisterAcademicOfferUseCase(
    insertCampusCourseRepo
  )

  const presenter = new SuccessfulInsertRequestPresenter<EmptyResponseModel>()

  const controller = new RegisterAcademicOfferController(
    usecase,
    presenter
  )

  return controller
}

export const registerAcademicOfferFactory = factory()
