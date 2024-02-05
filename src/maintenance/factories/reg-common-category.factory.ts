import { RegisterCommonCategoryController } from '@maintenance/controllers/reg-common-category.controller'
import RegisterCommonCategoryService from '@maintenance/services/reg-common-category.service'
import { type EmptyResponseModel } from '@auth/models/controllers/generic-controller.model'
import SuccessfulInsertRequestPresenter from '@core/adapters/primary/presenters/successful-insert-request.presenter'
import { insertCommonCategoryRepo } from '@core/adapters/secondary/repositories/typeorm/category-repository.adapter'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'

function factory (): ControllerInputPort {
  const service = new RegisterCommonCategoryService(
    insertCommonCategoryRepo
  )

  const presenter = new SuccessfulInsertRequestPresenter<EmptyResponseModel>()

  const controller = new RegisterCommonCategoryController(
    service,
    presenter
  )

  return controller
}

export const registerCommonCategoryFactory = factory()
